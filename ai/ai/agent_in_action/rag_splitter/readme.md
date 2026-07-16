# Document 切割

- 知识库 放的知识
  知识的来源很多， 一个word 文档， 一个pdf 文件， 一个bilibili 视频，一个url ， 一个挺靠谱的twitter
  各种格式的文件 -> 向量化前的Documents? loader 
  不能直接创建Document 对象
  怎么处理一下？
  Document？ langchain 提供的标准格式的文档 pageContent, metadata

## loader
知识库 -> 向量数据库
各种知识文件，后缀，不同的文件也有不同的loader
输入是文件 输出是Documents
两件事情要做
1. 选择相应的loader  180多种 
2. 分块  文件太大， 要检索的是一定大小具有一定语义的chunk 
来自社区 @langchain/community 主要由社区维护，我们都可以写loader
langchain @langchain/core 官方维护的 