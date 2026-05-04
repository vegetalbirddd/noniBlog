---
title: JS基础
date: 2026-4-30
---

# JS基础

  

## 原型与原型链

  

### QA

#### 什么是原型

JavaScript 中的原型本质是一个对象，用于实现属性和方法的共享。每个函数都有一个 prototype 属性，指向一个用于共享成员的原型对象；当通过构造函数创建实例时，实例内部原型__proto__会指向这个 prototype。

  

当访问对象属性时，如果对象本身不存在该属性，就会沿着内部原型逐级向上查找，这个查找路径就构成了原型链，直到找到该属性或到达 null 为止。所有对象最终都会指向 Object.prototype，其原型为 null。

  

本质上，这是一种基于对象之间委托关系的继承机制。

  

#### prototype 和 constructor 的关系是什么

constructor是prototype上的一个属性，指向它对应的构造函数。

  

实例访问到的construtor是通过原型链从prototype上获取的。

  

#### Object和Function的鸡和蛋问题

JavaScript引擎在初始化内置对象的时候，人为建立的互相引用的原型关系。

  

#### 原型对象的属性或方法可以修改吗

可以改，但是改动后影响了所有实例，如果有引入的三方库内部引用了原型上的属性或方法，这样就可能会导致报错。

  

#### new一个对象的时候做了什么

1、创建一个空对象

  

2、把新对象的内部原型指向构造函数的prototype

  

3、把构造函数的this绑定到新对象上

  

4、构造函数如果返回值是对象，那就直接返回对象，否则就返回创建的新对象

  

### 手写

``` js

// 手写new

function myNew(constructor, ...args) {

// 1️⃣创建一个新对象指向原型

let obj = Object.create(constructor.prototype);

// 2️⃣将构造函数里的this指向obj,并把参数传进去。要把构造函数里的所有this.xxx = ...都挂到obj上；而这个result是顺手接住了构造函数constructor里面的返回值

let result = constructor.apply(obj, args);

// 3️⃣为了复刻new的规则：构造函数如果只要显式返回一个对象，就返回对象；如果不是直接要返回对象，那就返回构造好的对象

return result instanceof Object ? result : obj;

}

```

  

``` js

// 手写instanceof

function myInstanceof (obj, type) {

if (obj === null || typeof obj !== "object" && typeof obj !== "function") {

return false;

}

let proto = Object.getPrototypeOf(obj)

const prototype = type.prototype;

while (proto) {

if (proto === prototype) {

return true;

} else {

proto = Object.getPrototypeOf(proto);

}

}

return false;

}

```


## JS引擎工作过程

一些相关的概念

| 概念            | 相关知识点                                                               |
| ------------- | ------------------------------------------------------------------- |
| 作用域           | 定义变量的区域，规定了如何查找变量。分词法作用域和动态作用域。词法作用域基于函数创建的位置，动态作用域基于调用的位置。         |
| var/let/const | 变量用哪里的作用域：全局作用域、块级作用域；词法环境、变量环境对它们不同的行为                             |
| 执行上下文EC       | 代码运行的环境，包含this指向、词法环境、变量环境                                          |
| 变量对象VO/AO/GO  | 环境里装着什么变量                                                           |
| 作用域链          | 作用域链本质上就是通过词法环境（Lexical Environment）中的 Outer 引用不断向外层词法环境查找所形成的链式结构。 |
| this          | 函数里的this指谁                                                          |
| ECStack       | 执行栈，先进后出，先推全局执行上下文，对函数执行上下文入栈后执行完出栈                                 |
| 箭头函数          | 让this像变量一样继承                                                        |
| 参数传递          | 值怎么进AO                                                              |
| 闭包            | 函数即使在外部作用域执行，但是还是能访问定义时的作用域里的变量                                     |
### 编译过程
JS引擎会对源码进行**词法分析**，把源码转换成**token**，然后再进行**语法分析**转换成**AST**，基于AST编译成**可执行代码**。

### 执行上下文创建
在代码执行之前，JS引擎会先创建执行上下文，完成**运行环境**的初始化。在执行上下文里**包含**this指向、词法环境、变量环境。

对var声明的对象创建绑定，并初始化为undefined；对let和const声明的变量，会在词法环境里创建绑定但不进行初始化，所以变量处于TDZ暂时性死区；而函数声明则在在创建阶段就绑定并初始化为函数对象。

词法环境通过对外层的引用形成作用域链，方便后续变量查找。

> 执行上下文创建阶段本质是在 Environment Record 中完成变量与函数的绑定初始化，而 var、let/const、function 的区别仅在于初始化时机不同。

### 执行过程
执行阶段是按照顺序执行已生成的可执行代码。程序开始时，全局执行上下文首先入栈作为默认执行环境；遇到变量赋值时，对变量进行实际赋值操作；遇到函数调用时创建新的执行上下文并入栈，同时变量访问通过词法环境的 Outer 引用形成的作用域链逐级查找。

### 闭包理解
#### ① 正常情况下（无闭包）

```js
function A() {  
  let x = 10;  
}  
A();
```

👉 执行完：

- A 的执行上下文销毁
- x 无引用
- 🧹 GC 回收

---

#### ② 闭包情况下

```js
function A() {  
  let x = 10;  

  return function B() {  
    console.log(x);  
  };  
}  
  
const fn = A();
```

---

##### 🔥 关键点发生了什么？

##### 1. B 被返回并“存活”

fn → B函数

---

##### 2. B 还引用 x

B → Lexical Environment(A) → x

---

##### 3. 导致结果：

👉 即使 A 执行完：

- A 的作用域不能销毁
- x 仍被引用
- ❌ GC 无法回收

### 闭包和作用域
``` js
function A() {
  let x = 10;

  return function B() {
    console.log(x);
  };
}

const fn = A();
fn();
```
在A的作用域里创建了变量x，然后在作用域里return 函数B，后续fn变量拿到了这个return出去的B并执行，而B会记住创建它的作用域A，因此就可以使用作用域A中的x变量。其实这也是闭包的本质。


## 异步相关知识



### 为什么要有异步

因为JS是单线程执行模型，但是还有一些请求、定时器的任务，如果都是同步执行会阻塞。

### 核心运行机制——事件循环

定义：是JS运行时的任务调度机制。

JavaScript 是单线程的，事件循环用于协调同步任务和异步任务的执行。同步代码会先进入调用栈执行，异步任务（如定时器、网络请求）会交给宿主环境处理，完成后将回调放入任务队列。

任务队列分为宏任务和微任务，事件循环在每一轮中会先清空所有微任务，然后再执行一个宏任务，之后再继续处理微任务，如此循环。
### 微任务在 AI 流式渲染中的影响

> 1. 执行同步代码（主线程）
> 2. 执行当前宏任务队列中的一个任务
> 3. 清空所有微任务队列
> 4. 进行一次 UI 渲染（浏览器）
> 5. 进入下一轮循环

> `requestAnimationFrame` 既不是宏任务，也不是微任务，它属于浏览器的渲染调度机制，在下一次重绘之前执行。

####  1. 用宏任务让出渲染机会

``` js
setTimeout(() => {  render(chunk);}, 0);
```

👉 让浏览器：

- 有机会渲染
- 保持流畅

---

####  2. 使用 requestAnimationFrame（推荐）

``` js
requestAnimationFrame(() => {  render(chunk);});
```

👉 优点：

- 在渲染前执行
- 更平滑

---

#### 3. 分批处理（节流）

``` js
buffer.push(chunk);
if (!scheduled) { 
   scheduled = true;  
   requestAnimationFrame(() => {    
	  flush(buffer);
	  scheduled = false;  
  });
}
```

`requestAnimationFrame` 更适合流式渲染，因为它在浏览器下一次重绘前执行，与屏幕刷新节奏同步，能够保证更新时机正确且避免不必要的重排和卡顿，而 `setTimeout` 无法感知渲染时机，容易造成掉帧或过度渲染。

### promise
#### 解决了回调地狱
(想先执行一个函数再执行下一个函数，所以要回调)
```js
// 回调地狱
getA(a => {
  getB(b => {
    getC(c => {
      console.log(c)
    })
  })
})

// promise
getA()
  .then(getB)
  .then(getC)
  .then(console.log)
  .catch(console.error)
```

#### 核心机制
##### 1️⃣ 状态机

```
pending  ↓fulfilled → value  ↓rejected → reason
```

---

##### 2️⃣ then 的本质

```
promise.then(onSuccess, onFail)
```

做了三件事：

- 注册回调
- 等状态变化
- 放入微任务执行

---

##### 3️⃣ 链式调用

```
p.then(a).then(b)
```

本质：

- **每个 then 返回一个新的 Promise**
- 上一个结果传给下一个


#### 手写
```js
promise.all = function (promises) {
	return new Promise((resolve, reject) => {
		let count = 0;
		const result = [];
		
		if(promises.length === 0) return resolve([]);
		
		promises.forEach((p, i) => {
			Promise.resolve(p).then(res => {
				result[i] = res;
				count++
				if (count === promises.length) {
					return resolve(result)
				}
			}, reject)
		})
	})
}
```


## proxy

### 什么是proxy（proxy的核心作用）
Proxy 是 ES6 提供的一种元编程能力，用于创建对象的代理，可以拦截并自定义对象的基本操作，比如属性访问、赋值、删除等。与 Object.defineProperty 不同，Proxy 是对对象整体行为的拦截，而不是单个属性的劫持，因此可以更完整地控制对象行为，常用于实现响应式系统、权限控制等场景。

### Proxy 和 Object.defineProperty 的区别是什么？为什么 Vue3 要用 Proxy？
Proxy 是对对象整体行为的拦截，而 Object.defineProperty 是对单个属性的劫持。在能力上，defineProperty 只能劫持已有属性，无法监听新增和删除属性，同时在数组场景下也存在局限，需要通过重写数组方法来实现响应式。而 Proxy 可以从对象层面统一拦截包括属性读取、赋值、删除以及数组变化等操作。此外，defineProperty 需要递归遍历对象进行劫持，而 Proxy 支持按需代理，性能更优。因此 Vue3 使用 Proxy 来实现更完整和高效的响应式系统。

### 为什么 Proxy 必须要配合 Reflect 使用？不用 Reflect 会有什么问题？
reflect封装了对对象的一些基本操作方法，他能够标准化“对象操作API”，和proxy配合后是为了保证拦截后的默认行为可以正常执行。
Proxy 和 Reflect 成对出现，是因为 Proxy 负责拦截操作，而 Reflect 负责以标准语义执行默认行为；如果不使用 Reflect，容易破坏 JavaScript 内部语义（如 this 绑定、返回值规范、原型链行为等）。

### 为什么proxy不能polyfill
因为proxy拦截的是js引擎内部的基本语义操作，而polyfill是在语言的API层进行操作。

## Module模块
### 模块解决什么问题
js全局变量污染；代码耦合严重；难以复用
本质上是：用作用域隔离 + 显式导出，解决全局污染问题

### 堆栈、深浅拷贝、V8垃圾回收
#### 堆栈的关系

- **栈**：存储简单数据类型（基本数据类型）和函数调用上下文，按值访问。
- **堆**：存储引用类型的对象或数组，栈中存储的是对堆内存的引用。
```js
let a = 10; // a 存储在栈中，值是 10
let b = { name: "Noni" }; // b 存储在栈中，值存储在堆内存中，栈中存储的是对象的引用地址

b.name = "Alice"; // 修改堆中对象的值
```
#### 深浅拷贝

浅拷贝：拷贝的对象会把被拷贝对象的地址一起拷贝过来，修改一个对象会影响另一个对象
深拷贝：会开辟一个新内存来存储新的对象，修改新对象不影响旧对象

#### V8 垃圾回收
https://www.cnblogs.com/songyao666/p/17476864.html
标记清除：标记可达对象，然后清除不可达对象。缺点会有内存碎片化（对象在内存中的分布不连续），所以可以引入标记整理，把剩下的活跃对象移动到一起，以减少内存碎片。
引用计数：变量值被赋值引用值+1，变量值被覆盖引用值-1，如果引用值为0就被清除。缺点是不能解决循环引用无法回收的问题、计数器占位大的问题。

## 链式调用
基本概念：可以在同一个对象上调用多个 方法，每个方法调用都会返回对象。通常链式调用的实现依赖于每个方法返回 **当前对象** 或 **当前对象的一个副本**，以支持后续方法的调用。
### 手写
```js
function Person(name) {
  this.name = name;
  this.age = 0;
}

// 设置 name 的方法
Person.prototype.setName = function(name) {
  this.name = name;
  return this;  // 返回当前对象，支持链式调用
};

// 设置 age 的方法
Person.prototype.setAge = function(age) {
  this.age = age;
  return this;  // 返回当前对象，支持链式调用
};

// 打印信息的方法
Person.prototype.printInfo = function() {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
  return this;  // 返回当前对象，支持链式调用
};

// 使用链式调用
const person = new Person("John");

person
  .setName("Alice")
  .setAge(25)
  .printInfo();  // 输出: Name: Alice, Age: 25
```