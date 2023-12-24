---
title: 事件循环Event Loop
date: 2023-12-23
tags:
 - 前端
 - JavaScript
categories:
 - JavaScript
---

# 事件循环Event Loop

## 是什么

**事件循环其实就是JS的运行机制。** JS是单线程的，从上到下逐行执行，若遇到报错就会停止执行下面的代码，在执行过程中，JS先执行同步任务，再执行异步任务。

## 事件循环的过程

- 首先将同步任务放入**任务队列**中依次执行（队列先进先出），异步任务会根据是微任务还是宏任务分别放到**微任务队列和宏任务队列**里。
- 如果任务队列为空，即同步任务执行完了，那么就开始执行异步任务。异步任务中，**先查看微任务队列**，把微任务放入任务队列并执行。
- 微任务执行完后**再查看宏任务队列**（这时候DOM也渲染好了）。当执行完一个宏任务的时候，需要**再查看微任务队列有没有新产生的微任务**，如果有，那么需要先把新产生的微任务执行完后才可以执行下一个宏任务。然后如此循环，这个过程称为事件循环。

## 微任务和宏任务

### 什么事件属于什么任务

微任务：Promise、async/await

宏任务：setTimeout、setInterval、Ajax、DOM事件

### 两者区别

- 微任务在DOM渲染前触发，宏任务在DOM渲染后触发（DOM还没渲染当然无法执行DOM事件啦）
- 微任务由ES6语法规定
- 宏任务由浏览器规定

## 举代码例子

```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
```

结果：

script start

async2 end

Promise

script end

async1 end

promise1

promise2

setTimeout