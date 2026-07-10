// 这个脚本只演示用子进程创建 Vite 脚手架。
// 它不会自动把 Vite 欢迎页改成 TodoList；完整任务请运行 pnpm run agent。
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), '..');
const appPackageJson = path.join(projectRoot, 'react-todo-app', 'package.json');

if (fs.existsSync(appPackageJson)) {
  console.log('react-todo-app 已存在，跳过脚手架创建。');
  console.log('如需让编程 Agent 完成 TodoList，请运行：pnpm run agent');
  process.exit(0);
}

const command = 'pnpm create vite@latest react-todo-app --template react-ts --no-interactive';
console.log(`工作目录：${projectRoot}`);
console.log(`执行命令：${command}`);

const child = spawn(command, {
  cwd: projectRoot,
  shell: true,
  stdio: 'inherit',
  windowsHide: true,
});

child.once('error', (error) => {
  console.error(`创建脚手架失败：${error.message}`);
  process.exitCode = 1;
});

child.once('close', (code) => {
  if (code === 0) {
    console.log('Vite 脚手架创建完成。继续运行 pnpm run agent 才会生成 TodoList 功能。');
  } else {
    console.error(`创建脚手架失败，退出码：${code}`);
    process.exitCode = code || 1;
  }
});
