# todos

## React 只是
- 组件化
- 响应式
- 数据驱动（绑定）
- hooks
  useState(懒执行)  , useEffect
- jsx
- fragment  组件
- 组件通信
  - 父子组件通信 
    props 向父组件申请修改状态
    子组件时不可以直接修改父组件的数据状态的，只能通过自定义事件通知父组件，父组件修改后，子组件
    自动更新。
  - 组件树 组件就是一个这样

## 开发流程和思路
- 组建思想
- 规划一下组件树 (项目的目录结构)
  有利于vibe coding 
- 父子组件通信
  - todos json数组 
  数据状态由父组件管理(持有和修改)，子组件们共享统一(props
  提出修改
  )的数据状态。
  数据和界面统一的，不能出问题。

## 前端本地存储
- 浏览器 有区间 存内容
  - 浏览器缓存静态资源，
  - localStorage key:value 配置、关键数据  5M 左右
    - setItem(key, 字符串 JSON.stringify(obj))
    - getItem(key)
  - 前端也有类Mysql 数据库  存更多数据
  IndexDB

## useEffect
- 生命周期