<script setup>
// 一次性的 -> 流式    前端 -> bff -> llm 请求
// 简洁
fetch('/api/stream?prompt=你好')
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
</script>

<template>
  <div class="container">
    <div>
      <label>输入：</label>
      <!-- vue 数据双向绑定 -->
       <!-- 属性绑定 :value 绑定到input的value属性上 -->
      <input type="text" class="input" v-model="question">
      <button @click="update">提交</button>
    </div>
    <div class="output">
      <div>
        <label>Streaming</label>
        <input type="checkbox" v-model="stream" />
        <div v-if="stream">
          <label>Streaming</label>
        </div>
        <div>
          {{content}}
        </div>
      </div>
    </div>
  </div>
</template>

