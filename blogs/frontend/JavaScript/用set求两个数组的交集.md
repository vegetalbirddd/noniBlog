---
title: 用set求两个数组的交集
date: 2023-10-26
tags:
 - 前端
 - JavaScript
 - 手写JS系列
categories:
 - JavaScript
---

## 用set求两个数组的交集

```js
function  intersection(arr1, arr2) { 
  const set1 = new set(arr1);const result = [];
  for(let i = 0;i < arr2.length;i++) {
  if(set1.has(arr2[i])) {
  	result.push(arr2[i])
  	}
  }
  return result;
 } 
```

```js
function  intersection(arr1, arr2) { 
  const set1 = new set(arr1);
  const set2 = new set(arr2);
  return newSet = new set([...set1].fileter(item => {
      set2.has(item)
  }))
 } 
```