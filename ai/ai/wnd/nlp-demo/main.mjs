// 主程序文件
// 多个默认的输出a, b...{对象 key: value} 解构语法
// import client, { a, b } from './client.mjs'

// console.log(client)
// console.log(a)
// console.log(b)
// let {name, city} = {"name": "姚明", "city": "北京"}
// let obj = {"name": "詹姆斯", "city": "洛杉矶"}
// let name1 = obj.name
// let name = obj.name
// let city = obj.city
// es6 让js 成为大型企业开发语言
// 解构赋值 从对象中提取属性值 变成变量，代码优雅简洁，性能好
// let { name, city } = obj
// console.log(name, city)
// name 与 obj.name 性能差异
// 数组的结构赋值，按顺序解构，rest 操作符 余下的全部解构
// let [coach, ...players] = ['范甘迪', '姚明', '麦迪', '穆托姆博', '弗朗西斯']
// console.log(coach, players)
// let [hrCoach, ...hrplayers] = ['杰克逊', '科比', '詹姆斯', '加索尔']
// let allplayers = [...players, ...hrplayers]// spread 操作符 展开运算符
// console.log(allplayers)

// 入口文件简洁
import { getCompletion } from './completion.mjs'
async function main() {
  const prompt = '用一句话解释什么是模块化编程'
  const response = await getCompletion(prompt)
  console.log(response)
}
main()
