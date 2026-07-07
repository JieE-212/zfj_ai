import { ChatOpenAI } from '@langchain/openai'
import 'dotenv/config';
const model = new ChatOpenAI({
    modelName: process.env.DEEPSEEK_MODEL,
    apiKey: process.env.DEEPSEEK_API_KEY,
    configuration: {
        baseURL: process.env.DEEPSEEK_BASE_URL,
    }
});
//client.chat.completions.create
const response = 
    await model.invoke('棍王杯台球比赛应该设置什么奖励?');
console.log(response);