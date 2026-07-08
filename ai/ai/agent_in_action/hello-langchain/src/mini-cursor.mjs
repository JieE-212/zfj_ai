// 手写mini-cursor
// 使用vite 基于react 创建todolist 项目  编程Agent 自动化
import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  HumanMessage,
  SystemMessage,
  ToolMessage
} from '@langchain/core/messages';
import {
  executeCommandTool,
  readFileTool,
  writeFileTool,
  listDirectoryTool
} from './all-tools.mjs'
