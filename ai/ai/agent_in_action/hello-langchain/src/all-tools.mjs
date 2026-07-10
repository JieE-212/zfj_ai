import { tool } from '@langchain/core/tools';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';

const MAX_CAPTURED_OUTPUT = 20_000;

function getWorkspaceRoot() {
  return path.resolve(process.cwd());
}

function resolveWorkspacePath(inputPath = '.') {
  const workspaceRoot = getWorkspaceRoot();
  const resolvedPath = path.resolve(workspaceRoot, inputPath);
  const relativePath = path.relative(workspaceRoot, resolvedPath);
  const isOutsideWorkspace = relativePath === '..'
    || relativePath.startsWith(`..${path.sep}`)
    || path.isAbsolute(relativePath);

  if (isOutsideWorkspace) {
    throw new Error(`路径必须位于当前工作目录内：${workspaceRoot}`);
  }

  return resolvedPath;
}

function displayPath(resolvedPath) {
  return path.relative(getWorkspaceRoot(), resolvedPath) || '.';
}

// 读取工作区内的 UTF-8 文本文件。
const readFileTool = tool(
  async ({ filePath }) => {
    try {
      const resolvedPath = resolveWorkspacePath(filePath);
      const content = await fs.readFile(resolvedPath, 'utf-8');
      console.log(`[工具调用] read_file(${displayPath(resolvedPath)})：成功读取 ${content.length} 个字符`);
      return content;
    } catch (error) {
      return `读取文件失败：${error.message}`;
    }
  },
  {
    name: 'read_file',
    description: '读取当前工作目录内的 UTF-8 文本文件。filePath 可使用相对路径，例如 react-todo-app/src/App.tsx。',
    schema: z.object({
      filePath: z.string().min(1).describe('工作区内的文件路径'),
    }),
  },
);

// 写入工作区内的 UTF-8 文本文件，并按需创建父目录。
const writeFileTool = tool(
  async ({ filePath, content }) => {
    try {
      const resolvedPath = resolveWorkspacePath(filePath);
      await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
      await fs.writeFile(resolvedPath, content, 'utf-8');
      console.log(`[工具调用] write_file(${displayPath(resolvedPath)})：成功写入 ${content.length} 个字符`);
      return `成功写入 ${displayPath(resolvedPath)}`;
    } catch (error) {
      return `写入文件失败：${error.message}`;
    }
  },
  {
    name: 'write_file',
    description: '向当前工作目录内的指定路径写入 UTF-8 内容，并自动创建父目录。',
    schema: z.object({
      filePath: z.string().min(1).describe('工作区内的文件路径'),
      content: z.string().describe('要写入的完整文件内容'),
    }),
  },
);

// 列出工作区内的目录内容。
const listDirectoryTool = tool(
  async ({ directoryPath = '.' }) => {
    try {
      const resolvedPath = resolveWorkspacePath(directoryPath);
      const entries = await fs.readdir(resolvedPath, { withFileTypes: true });
      const listing = entries
        .sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'))
        .map((entry) => `${entry.isDirectory() ? '[目录]' : '[文件]'} ${entry.name}`)
        .join('\n');

      console.log(`[工具调用] list_directory(${displayPath(resolvedPath)})：成功列出 ${entries.length} 项`);
      return `目录 ${displayPath(resolvedPath)} 的内容：\n${listing || '(空目录)'}`;
    } catch (error) {
      return `列出目录失败：${error.message}`;
    }
  },
  {
    name: 'list_directory',
    description: '列出当前工作目录内指定目录的文件和文件夹。',
    schema: z.object({
      directoryPath: z.string().optional().describe('工作区内的目录路径，默认是当前工作目录'),
    }),
  },
);

// 执行命令。前台命令会把输出返回给 Agent；开发服务器可使用 background=true。
const executeCommandTool = tool(
  async ({ command, workingDirectory = '.', background = false }) => {
    let cwd;
    try {
      cwd = resolveWorkspacePath(workingDirectory);
    } catch (error) {
      return `命令执行失败：${error.message}`;
    }

    console.log(`[工具调用] execute_command(${command})\n工作目录：${cwd}${background ? '\n运行方式：后台' : ''}`);

    return new Promise((resolve) => {
      let settled = false;
      let output = '';
      const child = spawn(command, {
        cwd,
        shell: true,
        windowsHide: true,
        detached: background,
        stdio: background ? 'ignore' : ['ignore', 'pipe', 'pipe'],
      });

      const finish = (message) => {
        if (!settled) {
          settled = true;
          resolve(message);
        }
      };

      if (background) {
        child.once('spawn', () => {
          child.unref();
          finish(`命令已在后台启动：${command}\n工作目录：${displayPath(cwd)}\n进程 ID：${child.pid}`);
        });
        child.once('error', (error) => {
          finish(`后台命令启动失败：${error.message}`);
        });
        return;
      }

      const collectOutput = (chunk, target) => {
        const text = chunk.toString();
        target.write(text);
        if (output.length < MAX_CAPTURED_OUTPUT) {
          output += text.slice(0, MAX_CAPTURED_OUTPUT - output.length);
        }
      };

      child.stdout.on('data', (chunk) => collectOutput(chunk, process.stdout));
      child.stderr.on('data', (chunk) => collectOutput(chunk, process.stderr));
      child.once('error', (error) => {
        finish(`命令执行失败：${error.message}`);
      });
      child.once('close', (code) => {
        const outputBlock = output.trim() ? `\n输出：\n${output.trim()}` : '';
        if (code === 0) {
          finish(`命令执行成功：${command}\n工作目录：${displayPath(cwd)}${outputBlock}`);
        } else {
          finish(`命令执行失败，退出码：${code}\n命令：${command}\n工作目录：${displayPath(cwd)}${outputBlock}`);
        }
      });
    });
  },
  {
    name: 'execute_command',
    description: '在工作区内的指定目录执行完整的 shell 命令。启动长期运行的开发服务器时必须设置 background=true。',
    schema: z.object({
      command: z.string().min(1).describe('要执行的完整命令'),
      workingDirectory: z.string().optional().describe('工作区内的工作目录，默认是当前工作目录'),
      background: z.boolean().optional().describe('长期运行的命令是否在后台启动，默认 false'),
    }),
  },
);

export {
  executeCommandTool,
  listDirectoryTool,
  readFileTool,
  writeFileTool,
};
