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