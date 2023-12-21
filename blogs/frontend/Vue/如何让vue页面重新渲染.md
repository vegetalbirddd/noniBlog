---
title: 如何让vue页面重新渲染
date: 2023-10-26
tags:
 - 前端
 - Vue
 - Vue知识小点
categories:
 - Vue
---

# 如何让vue页面重新渲染

1、watch事件监听 通过改变被监听的数据，触发监听事件，从而更新页面视图

2、computed计算属性 通过改变数据依赖，执行计算属性来更新相应视图

3、v-if条件渲染

4、调用this.$forceUpdate() 方法来强制重新渲染组件