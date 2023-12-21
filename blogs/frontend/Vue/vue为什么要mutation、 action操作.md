---
title: vue为什么要mutation、 action操作
date: 2023-10-26
tags:
 - 前端
 - Vue
 - Vue知识小点
categories:
 - Vue
---

## vue为什么要mutation、 action操作

mutation、action用来对store内的数据进行操作、

mutation能够进行同步操作，能够直接修改state状态；aciton能够进行异步操作，可以在aciton中进行请求等操作，它用来提交mutation。