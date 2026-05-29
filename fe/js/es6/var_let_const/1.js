// 局部作用域 global scope
var height = 200
function setWidth() {
  // 函数局部作用域变量
  var width = 100
  console.log(width, height)
}
setWidth()
// console.log(width)
var age = 100
if (age > 12) {
  // 块级作用域
  // es6 常量  不可以改变的
  const dog = age * 7
  let x = 111
  console.log(dog)
  dog++
}
// console.log(dog)
console.log(x)
