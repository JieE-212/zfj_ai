// symbol 唯一的标志符，用函数创建，简单数据类型
// 轻松表达独一无二
console.log(Symbol('张老板') === Symbol('张老板'))// false
console.log(typeof Symbol('张老板'))// symbol
console.log(Symbol())// 绝对为1，可以传递一个标签label
let obj = {
  [Symbol()]: 'value',
  prop: "2"
}
