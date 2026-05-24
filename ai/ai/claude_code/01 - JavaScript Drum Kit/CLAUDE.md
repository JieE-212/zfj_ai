# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供在本仓库中进行代码工作的指导。

## 项目概述

这是一个原生 JavaScript 架子鼓项目 —— 一个简单的纯前端项目，没有构建系统、包管理器或测试。它通常用作学习练习（例如 JavaScript30）。有两个 HTML 入口文件：

- **`index-START.html`** —— 入门模板，带有一个空的 `<script>` 标签，用于实现架子鼓功能。
- **`index-FINISHED.html`** —— 完整的参考实现，包含可运行的 JavaScript 代码。

## 运行项目

直接在浏览器中打开任意一个 HTML 文件：

```powershell
start index-FINISHED.html
```

或者在需要时通过简单的 HTTP 服务器运行（例如为了支持模块或避免 CORS 问题）：

```powershell
python -m http.server 8000
# 然后打开 http://localhost:8000/index-FINISHED.html
```

## 架构

- **`style.css`** —— 定义 `.key` 样式和用于视觉反馈过渡效果的 `.playing` 类。
- **`sounds/`** —— 包含映射到键盘按键的 `.wav` 音频文件。
- **数据绑定** —— 每个鼓键及其对应的 `<audio>` 元素共享一个 `data-key` 属性，其值为键盘按键的 `keyCode`。

### 按键映射

| 按键 | 音效 |
|-----|-------|
| A | 拍手 (clap) |
| S | 踩镲 (hihat) |
| D | 底鼓 (kick) |
| F | 开镲 (openhat) |
| G | 轰鸣 (boom) |
| H | 叮叮镲 (ride) |
| J | 军鼓 (snare) |
| K | 筒鼓 (tom) |
| L | 叮 (tink) |

### 逻辑工作原理（`index-FINISHED.html`）

1. 在 `window` 上监听 `keydown` 事件。
2. 通过 `data-key` 选择器查找与 `e.keyCode` 匹配的 `<audio>` 和 `.key` 元素。
3. 如果找到，将 `audio.currentTime` 重置为 `0`，调用 `audio.play()`，并为按键添加 `playing` 类以触发 CSS 过渡效果。
4. 在每个 `.key` 上监听 `transitionend` 事件，在变换结束后移除 `playing` 类。
