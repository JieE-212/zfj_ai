import { ChatOpenAI } from '@langchain/openai';
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from '@langchain/core/messages';
import chalk from 'chalk';
import { config as loadEnv } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  executeCommandTool,
  listDirectoryTool,
  readFileTool,
  writeFileTool,
} from './all-tools.mjs';

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), '..');

// 无论从哪个终端目录启动，都固定在 hello-langchain 中工作并读取这里的 .env。
process.chdir(projectRoot);
loadEnv({ path: path.join(projectRoot, '.env') });

const model = new ChatOpenAI({
  modelName: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  apiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
  },
});

const tools = [
  executeCommandTool,
  readFileTool,
  writeFileTool,
  listDirectoryTool,
];
const modelWithTools = model.bindTools(tools);

const todoAppTask = `
在当前 hello-langchain 工作目录中创建并完成一个 React TodoList 应用。

严格按下面顺序执行：
1. 先使用 list_directory 检查当前目录。
2. 如果 react-todo-app/package.json 不存在，执行：
   - command: pnpm create vite@latest react-todo-app --template react-ts --no-interactive
   - workingDirectory: .
   如果项目已经存在，不要重新创建或覆盖脚手架配置。
3. 读取 react-todo-app/src/App.tsx、react-todo-app/src/App.css 和 react-todo-app/src/index.css。
4. 写入完整实现，所有 filePath 必须以 react-todo-app/ 开头。TodoList 必须包含：
   - 添加、删除、标记完成
   - 全部、进行中、已完成三种筛选
   - 总数、待完成数和已完成数统计
   - localStorage 数据持久化
   - 蓝紫渐变背景、卡片阴影、圆角和悬停效果
   - 添加及删除任务的 CSS 过渡动画
5. 在 react-todo-app 中依次执行 pnpm install 和 pnpm run build。构建失败时读取错误并修复，直到构建成功。
6. 构建成功后，用 background=true 在 react-todo-app 中执行 pnpm run dev -- --host 127.0.0.1。
7. 最后列出 react-todo-app/src，确认写入的文件，并简要报告结果。

不要在写完代码前启动开发服务器。不要把 Vite 默认欢迎页当成已完成结果。
`;

async function runAgentWithTools(query, maxIterations = 30) {
  const messages = [
    new SystemMessage(`你是一个编程 Agent，必须使用工具实际完成任务，不能只给出操作建议。
当前工作目录：${projectRoot}

可用工具：
- read_file：读取文件
- write_file：写入完整文件内容
- list_directory：列出目录
- execute_command：执行命令

execute_command 的参数规则：
- 目录参数名只能是 workingDirectory，不是 directoryPath，也不是 cwd。
- workingDirectory 会自动切换目录；command 中不要再使用 cd。
- 示例：{ "command": "pnpm run build", "workingDirectory": "react-todo-app" }
- pnpm run dev 等长期运行命令必须增加 { "background": true }。

路径规则：
- 所有路径都相对于当前 hello-langchain 工作目录。
- 修改子项目文件时必须写完整相对路径，例如 react-todo-app/src/App.tsx。
- 每次写入后都要构建或重新读取验证，不要根据工具调用意图宣称成功。
`),
    new HumanMessage(query),
  ];

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    console.log(chalk.bgGreen(`正在等待第 ${iteration + 1} 次 AI 思考...`));
    const response = await modelWithTools.invoke(messages);
    messages.push(response);

    if (!response.tool_calls?.length) {
      console.log(`\nAI 最终回复：\n${response.content}\n`);
      return response.content;
    }

    for (const toolCall of response.tool_calls) {
      const selectedTool = tools.find((candidate) => candidate.name === toolCall.name);
      let toolResult;

      if (!selectedTool) {
        toolResult = `工具调用失败：不存在工具 ${toolCall.name}，请改用已注册工具。`;
      } else {
        try {
          toolResult = await selectedTool.invoke(toolCall.args);
        } catch (error) {
          // 把参数校验或执行错误交还给模型，使它可以修正后重试。
          toolResult = `工具调用失败：${error.message}。请检查参数名和路径后重试。`;
        }
      }

      messages.push(new ToolMessage({
        content: String(toolResult),
        tool_call_id: toolCall.id,
      }));
    }
  }

  throw new Error(`达到最大迭代次数 ${maxIterations}，任务仍未完成`);
}

const isMainModule = process.argv[1]
  && path.resolve(process.argv[1]) === currentFile;

if (isMainModule) {
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('缺少 DEEPSEEK_API_KEY，请在 hello-langchain/.env 中配置。');
    process.exitCode = 1;
  } else {
    try {
      await runAgentWithTools(todoAppTask);
    } catch (error) {
      console.error(`\n执行失败：${error.message}`);
      process.exitCode = 1;
    }
  }
}

export { runAgentWithTools, todoAppTask };
