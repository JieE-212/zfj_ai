// 常量一开始就要赋值
const item = 1
let a // undefined
const key = 'abc123'
// 简单数据类型
key = 'ABC123' // Assignment to constant variable
let points = 50
points = 51
// let 不只是值可以改变，类型也可以改变
// 不要这么干
points = "52" // 不好的
let winner = false
winner = '戴'
// 复杂数据类型 对象
// 值可以变，但是类型不能变
const person = {
  name: '李宇刚',
  age: 18
}
person.age++
console.log(person)
person = '111' // Assignment to constant variable