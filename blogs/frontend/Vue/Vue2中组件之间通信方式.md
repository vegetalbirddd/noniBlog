---
title: Vue2中组件之间通信方式
date: 2023-10-16
tags:
 - 前端
 - Vue
categories:
 - Vue
---

1、prop 父传子

2、使用$refs方法，让父组件获取实例

3、使用$emit 触发事件，子组件传递参数给父组件

4、使用 Vuex 的 store 来获取数据

5、ventbus  传递方通过$emit触发事件，接收数据通过$on

6、$parent和$children访问组件的父组件和子组件