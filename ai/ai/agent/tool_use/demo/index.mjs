import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()
// 缸中大脑
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
})
// tools 配置
// JSON schema
// 将函数降维为语言
// 新旧范式的融合
const tools = [

]
// 传统软件世界
function get_closing_price(name) {
  if (name === '青岛啤酒') {
    return '67.92'
  } else if (name === '贵州茅台') {
    return '1488.21'
  } else {
    return '未找到该股票'
  }
}