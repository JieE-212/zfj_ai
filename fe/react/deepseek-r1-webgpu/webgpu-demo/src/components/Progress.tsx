// 函数接受参数， 复用组件的时候，进度、文件、大小不一样
// 组件的属性 html 属性的方式传过来的 props
const Progress = ({ text, percentage, total }) => {
  console.log(text, percentage, total);
  // es6+ 编程风格
  percentage ??= 0;
  console.log(percentage);
  return (
    <div>
      <p>{text}</p>
      <p>{percentage}%</p>
      <p>{total}</p>
    </div>
  )
}