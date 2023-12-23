---
title: vue中key的作用
date: 2023-10-26
tags:
 - 前端
 - Vue
 - Vue知识小点
categories:
 - Vue
---

# vue中key的作用

key是每一个vnode的唯一标识符。有两个作用：

作用一：它可以用来优化vue的虚拟DOM算法，通过对比新旧虚拟DOM，key如果相同，则复用旧的真实DOM；若不同，则创建新的DOM。它能够减少DOM的操作，加快页面的渲染速度。

作用二：key能够在同一个组件里渲染不同的数据源，例如在v-for中，如果不使用key，vue会使用一种尽最大限度减少动态元素的算法，对动态元素来进行再利用。使用key将会基于key的变化来重新排列元素顺序，并会移除key不存在的元素。