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




