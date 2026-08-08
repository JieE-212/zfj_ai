// web worker 独立子线程计算，
// 不可以做DOM相关的操作 api   自己的api
// console.log('worker online');
// self 关键字
self.onmessage = (e) => {
  const { num } = e.data;
  console.log('Worker 收到主线程任务，参数为：', e.data);
  let sum = 0;
  for (let i = 0; i < 500000000; i++) {
    sum += num * i;
  }
  self.postMessage({
    result: sum
  })
}
