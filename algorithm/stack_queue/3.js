// js 没有 class ，约定大写构造函数
function Greeting(name) {
  console.log(this)
  this.name = name
}
Greeting.prototype.say = function () {
  console.log(`我叫${this.name}，很高兴认识你！`)
}
Greeting.prototype.work = function () {
  console.log(`我叫${this.name}，我正在工作`)
}
const zfj = new Greeting('zfj')
console.log(zfj.name)
zfj.say()
zfj.work()
