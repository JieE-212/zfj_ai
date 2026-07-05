# MCP 

Context Engineering ,非常火的MCP (Model Context Protocol) 协议

http 协议, Protocol 

MCP 是 Anthropic 公司 2024年 11月25日 推出的 AI界通用的USB-C 接口协议 。 电脑端会安装llm 客户端
MCP client(Cursor, Trae, Claude Code, Codex)，对接Claude OpenAI 等各大模型。
各类网盘服务、远程服务、邮件服务、本地文件等MCP Server
有了MCP，不用为不同模型写对接代码，能轻松把各类数据工具标准化接入大模型上下文。

三部分 
- MCP Server
  服务端 提供了大模型想用的各种上下文 
  定义好server 如何和client 交互(通信)
  将上下文服务提供给llm
- MCP Host 宿主
  Claude Code 等 AI Agent
- MCP client 客户端 
  配置一堆的MCP client
  插件一样 古茗、高德地图、Gmail  

会prompt 方式 于host 交互 ，通过推理，不是预训练的知识能回答的，去看下host 里面有哪些client ，可以为我们的任务提供上下文。为Context Engineering 提供标准化的通信底座，彻底终结过往RAG、函数调用零散适配的乱象。
有了MCP，就好像USB-C 数据线接口，能实现任意MCP 服务端和客户端的自由互联。
依托这一套统一标准，大模型可调用的上下文来源得到极大扩充（chatbot）。各类外部数据与工具的接入调用变得高效便捷。

## 案例
- npm i -g @modelcontextprotocol/server-filesystem 
MCP 官方文件体系统服务端，安装完了，本地server / 远程server  ，用于通过MCP 协议安全读写本地指定目录文件，为AI模型提供合规的本地访问能力。