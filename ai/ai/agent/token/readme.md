# token

## 怎么学习llm ？
### 先搞懂AI是什么
- 吴恩达 
  AI or Everyone
  Generative for Everyone
  AI Prompting For Everyone
- karpathy
  tesla 总监   OpenAI gpt3的作者
  3 小时 大模型入门课程视频
  讲透大模型原理
  [深入chatgpt这样的模型](https://www.bilibili.com/video/BV16cNEeXEer/?spm_id_from=333.337.search-card.all.click&vd_source=19dea2d6e1dfcae122ca9315d761ad9e)

Transformer架构(google)、Attention机制(注意力机制)、微调(fine-tuning)... 
理论高级篇

## 动手用起来
把日常重复性工作交给AI 
- cc，codex
- notebookllm  google出品的RAG
  google 账号 
  梯子
  超级学习AI 工具 
- Obsidian 第二大脑 

## 做个人作品
- vibe coding 一个完整的项目
网站、小程序、客户管理工具 
Agent 开发

## 关注
微信关注公众号
- 晓辉博士  专业深度
- 42章经
- 宝玉AI  Prompt Engineering
- 歸藏  AI 产品

## 分词 Tokenization
- llm 计价和工作的最小单位
1 个英文字符 大约 0.3 个token
1 个中文字符 大约 0.6 个token
百万token 几人民币
- 为什么必须分词？
输入的是Prompt文本
根据上个词，预测下一个词
词之间的语义相关性 计算
数学？
神经网络只能处理数字（向量、矩阵），看不懂中文、英文等字符（主要是由计算机的底层运行机制和模型训练的效率决定的）
必须把文字转为一串数字离散符号ID，token。

## token demo
- js-tiktoken
  文本编码为token
  解码token为文本
