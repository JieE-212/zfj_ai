<script setup>

import { ref } from 'vue'

const count = ref(0)//变量 -》 数据（数据绑定）
//-》数据状态（响应式） -》 页面状态 （反应）
// refimpl响应式对象，值是count.value
// count.value 改变的时候，页面上绑定了count 的地方会局部热更新 
// console.log(count,count.value)

//composition api 组合响应式API 相关逻辑组合在一起
const question = ref('将一个中国龙的故事')
const content = ref('')
const stream = ref(true)

const update = async() => {
  if(!question.value) return
  content.value = '思考中'//页面状态 开始llm 接口调用
  const endpoint = 'https://api.deepseek.com/chat/completions'; 
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}` };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'deepseek-v4-flash',
      messages: [
        { role: 'user', content: question.value }
      ],
      stream: stream.value
    })
  });
  if(stream.value) {
    content.value = ''
    // 大文件上传 慢慢流向 权限 + 形式

    //llm 服务器 ReadableStream  对象 数据流
    //stream 对象 水流 服务器端流向浏览器
    // response.body 服务器端响应体 二进制流
    console.log(response.body)
    // await 等到token流完为止
    //水管子，嘬一口 返回 读取器对象
    const reader = response.body?.getReader();
    console.log(reader);
    // 二进制流服务 解码器
    const decoder = new TextDecoder();//二进制流服务
    let done = false;//是否读取完成
    let buffer = '';//缓存区

    // 读取数据
    while(!done) {
      const { value, done } = await reader.read();

      //除了把本轮的value处理之外 之前会有东西要一起处理
      // 所以要缓存起来
      //chunk 一小块数据 json格式
      // delta 偏移量 一小块一小块 的增量
      //解析json字符串 choices[0].delta.content

      const chunkValue = buffer + decoder.decode(value);
      buffer = ''
      //json 字符串 多行数据
      // data：数据来了
      // 一次发送一行，也可能发送多行
      const lines = chunkValue.split('\n').filter((line) => line.startsWith('data:'))

    }
  }else{
    const data = await response.json();
    content.value = data.choices[0].message.content;
  }
}



</script>

<template>
  <div class="container">
    <div>
      <label>输入：</label><input class="input" v-model="question" />
      <button @click="update">提交</button>
    </div>
    <div class="output">
      <div><label>Streaming</label><input type="checkbox" v-model="stream"/></div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>
<style>
.container {
  /* 文档流 是页面布局的基础
  从上到下 从左到右， 流式布局
  每个盒子在文档流中有自己的位置和大小
  开启新的格式化上下文 */
  display: flex;
  flex-direction: column;
  align-items: start;  
  justify-content: start;
  height: 100vh;
  font-size: 0.85rem; /* 移动端适配，等比例 16px等比例 */
}
.input {
  margin-top: 10px;
  min-height: 300px;
  width: 100%;
  height: 100%;
  text-align: left;
}
button {
  padding: 0 10px;
  margin-left: 6px;
}
</style>