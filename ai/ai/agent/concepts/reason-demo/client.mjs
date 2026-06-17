
import { OpenAI } from 'openai'
import dotenv from 'dotenv'

dotenv.config()

// llm client 对象
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_BASE_URL,
})

// export const a = 2
// export const b = 3// 直接导出
// 默认导出 只能有一个
export default client