import { OpenAI } from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
})
// 死循环（最大尝试次数），超预算（maxToken），sameStop（相同几次停下来）
const limit = {
  maxRound: 5,
  maxToken: 2000,
  sameStop: 2
}
