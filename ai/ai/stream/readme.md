# 流式输出 streamable

一次性返回的，等待，等很久
  - 复杂的计算，推理生成，耗时颇久，让人等得不耐烦
  - 如何优化？一个一个token推理生成，实时地展示
  - 不用一次性都给
  - api，计算机网络协议层去理解
  - chatbot 客户端 不断地拼接token，流式输出就成了
  - 水流，llm 服务端和chatbot 客户端两端接管子
  - 生成的token就像水流一样不断流向客户端
llm chatbot 像打字机一样流式输出，体验很好。
前端工程师来说有点复杂，AI产品的第一个关键用户体验

## 耗时
主要是推理所花费的时间(transform)和问题复杂度(难度和长度)

## 约定
- 服务端器约定 stream: true token生成就输出
- 客户端 发送 stream:true  表示流式输出

## 使用流式(streaming) 传输减少等待时间
用户体验的打造，前端的责任，必考内容，AI产品的核心体验

 - vite 前端项目中集中生成 deepseek apikey
   - vite会帮我们读取.env.local
   - vite 是脚手架，node是后端

   ## VUE 基础
   - .vue 后缀
     文件，也叫组件(component)
     facebook 网页由一万多个组件组成
     组件就是组成网页的最小单位，想象成乐高积木
     方便封装、复用、维护
  ## 封装 三部分
  - template 模板 html是静态的，模板是动态的
    一段html，可以绑定数据，可以响应式更新
  - script  js 逻辑
    引入 vue/react {{}}.vue ref / reactive
    count   setup 是vue3 新增的语法糖，支持宏函数
    把script 全局的数据可以直接被template 模板使用
  - style 样式 css

  - 表单元素
      显示值
      用户又要修改value
      dom 编程不要，
      count {{count}}单向数据流绑定
      保证数据和界面状态的一致性
      数据驱动 data driven 
      表单元素是个例外，用户的输入，需要传回给数据
      双向数据流， v-model