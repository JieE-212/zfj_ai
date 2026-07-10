import 'dotenv/config';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import chalk from 'chalk';
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from '@langchain/core/messages';

const model = new ChatOpenAI({
  modelName: 'deepseek-v4-pro',
  apiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: 'https://api.deepseek.com/v1',
  },
});

const mcpClient = new MultiServerMCPClient({
  mcpServers: {
    // 高德地图 MCP（HTTP 远程）
    'amap-maps': {
      url: 'https://mcp.amap.com/mcp?key=55531fa8014ce85910ceee67c66294f7',
    },
    // 本地自定义 MCP Server（stdio）
    'my-mcp-server': {
      command: 'node',
      args: ['src/my-mcp-server.mjs'],
      cwd: 'c:/Users/ZFJJi/Desktop/workspace/zfj_ai/ai/ai/agent_in_action/mcp-demo',
    },
    // Chrome DevTools MCP（操控浏览器：打开页面、点击元素、截图等）
    'chrome-devtools': {
      command: 'npx',
      args: ['-y', 'chrome-devtools-mcp@latest'],
    },
    // File System MCP（读写本地文件）
    'filesystem': {
      command: 'npx',
      args: [
        '-y',
        '@modelcontextprotocol/server-filesystem',
        'c:/Users/ZFJJi/Desktop/workspace/zfj_ai',
      ],
    },
  },
});

const tools = await mcpClient.getTools();
console.log(chalk.green(`已加载 ${tools.length} 个工具`));
console.log(chalk.blue(tools.map(t => t.name).join(', ')));

const modelWithTools = model.bindTools(tools);

async function runAgentWithTools(query, maxIterations = 30) {
  const messages = [
    new SystemMessage('你是一个助手，请使用工具来回答用户的问题。'),
    new HumanMessage(query),
  ];
  for (let i = 0; i < maxIterations; i++) {
    console.log(chalk.bgGreen(`正在等待AI思考, 第${i + 1}轮....`));
    const response = await modelWithTools.invoke(messages);
    messages.push(response);

    if (!response.tool_calls || response.tool_calls.length === 0) {
      console.log(chalk.red(`AI回答： ${response.content}`));
      return response.content;
    }

    console.log(chalk.bgBlue(`工具调用：${response.tool_calls.map(t => t.name).join(', ')}`));

    for (const toolCall of response.tool_calls) {
      const foundTool = tools.find(t => t.name === toolCall.name);
      if (foundTool) {
        try {
          const toolResult = await foundTool.invoke(toolCall.args);
          let contentStr;
          if (typeof toolResult === 'string') {
            contentStr = toolResult;
          } else if (toolResult && typeof toolResult === 'object') {
            contentStr = JSON.stringify(toolResult);
          } else {
            contentStr = String(toolResult);
          }
          messages.push(new ToolMessage({
            content: contentStr,
            tool_call_id: toolCall.id,
          }));
        } catch (err) {
          console.log(chalk.yellow(`工具 ${toolCall.name} 调用失败：${err.message}`));
          messages.push(new ToolMessage({
            content: `工具调用失败：${err.message}，请尝试其他方式`,
            tool_call_id: toolCall.id,
          }));
        }
      }
    }
  }

  return messages[messages.length - 1].content;
}

await runAgentWithTools(`北京南站附近的酒店，最近的 3 个酒店，拿到酒店图片，打开浏览器，展示每个酒店的图片，
           每个 tab 一个 url 展示`);

await mcpClient.close();
