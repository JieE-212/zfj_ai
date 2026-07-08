import { tool } from '@langchain/core/tools';
import fs from 'node:fs/promises';
// 判断路径的合法性 路径的拼接 ...
import path from 'node:path'; // node 内置的 path 模块
import { spawn } from 'node:child_process';
import z from 'zod';

// I/O 工具
// 读文件
const readFileTool = tool(
  async ({ filePath }) => {   // 功能函数
    const content = await fs.readFile(filePath, 'utf-8');
    // 时刻反馈Agent 执行消息
    // Agent 任务可能很复杂,很耗时，需要给用户反馈 用户可能
    // 太久没有看到反馈， 退出
    console.log(`[工具调用] read_file(${filePath})
        成功读取 ${content.length} 字节`)
    return content;
  },
  {
    name: 'read_file',
    description: `用此工具来读取文件内容，当用户要求读取文件、
        查看代码、分析文件内容时，调用此工具。输入文件路径（
        可以是相对路径或绝对路径）`,
    schema: z.object({
      filePath: z.string().describe('要读取的文件路径')
    })
  }
)

// 写文件
const writeFileTool = tool(
  async ({ filePath, content }) => {

  }
)