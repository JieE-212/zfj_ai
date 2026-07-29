# 向量数据库
- loader and splitter 
- 内存向量数据库 

## Milvus 
文档向量化放到向量数据库， 每次查询根据向量化的query 去数据库做相似度匹配，查出相关文档放到prompt里给大模型， 大模型来生成回答。

- 从内存到向量数据库
Milvus 是一款开源的向量数据库， 专为处理海量的高维向量数据而设计。
AI Agent产品都会使用Milvus 这样的vector store 

像web应用会把数据存在mysql 里面， Sqlite， psql， 基于对数据的增删改查实现各种业务功能。CRUD。    (mysql 中大型， Sqlite 文本小型， psql)
根据id 或者关键词（like）去关联查询一些列表的数据
Agent会把知识、记忆 放在Milvus 数据库中，对知识、记忆语义检索、增删改等各种功能。

## AI 日记本 diary 
- 日记的增删改查CRUD MYSQL 非AI功能   结构化数据
  是什么
- 最近心情比较好的日记 
  同时，将entity 向量化存储到milvus 中   AI功能
  像什么

MYSQL 传统功能     Milvus AI功能  两者不冲突，不是割裂的

## zilliz 
基于milvus 的全托管向量数据库服务。
