// 实例化mcp server 
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// 本地通信 
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema  //提供真实执行的工具
} from
  '@modelcontextprotocol/sdk/server/schema.js';
import fs from 'fs/promises';

const server = new Server(
  { name: 'simple-read-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } },
)

// 处理agent 请求 事件
// ListToolsRequestSchema mcp 事件之一  列出所有工具
server.setRequestHandler(ListToolsRequestSchema, async () => ({

}))
async function main() {
  // 连接本地transport 打通连接隧道
  const transport = new StdioServerTransport();
  await server.connect(transport);
}