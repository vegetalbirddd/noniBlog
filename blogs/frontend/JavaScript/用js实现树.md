---
title: 用js实现树
date: 2023-10-16
tags:
 - 前端
 - JavaScript
 - 手写JS系列
categories:
 - JavaScript
---


## 树用js如何实现？

```js
class TreeNode
{
    constructor(val)
    {
        this.val = val;
        this.left = null;
        this.right = null;
    }
} // 创建树的根节点
let root = new TreeNode(1); // 添加子节点
root.left = new TreeNode(2);
root.right = new TreeNode(3); // 添加子节点的子节点
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
```