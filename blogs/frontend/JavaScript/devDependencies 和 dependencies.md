---
title: devDependencies 和 dependencies理解
date: 2023-12-14
tags:
 - 前端
 - JavaScript
categories:
 - JavaScript
---

# devDependencies 和 dependencies

​		一般我们把项目代码拉下来的时候，需要执行`npm install`来安装依赖，这个指令将会默认安装了`dependencies` 字段和 `devDependencies` 字段中的所有模块，通常我们会认为`dependencies`放置的是**运行项目时**所需要的依赖包，`devDependencies`放置的是**开发项目时**所使用的依赖包。

​		

## dependencies

​		假设我们现在在项目中需要引入一个包名为A的组件库，那么我们便可以执行`npm install A`指令，那么该组件库依赖包的`dependencies`会被下载，而`devDependencies`不会被下载。

​		由此我们可以知道，当一个依赖需要被`src`源码使用时，会被放到 `dependencies`中，在进行 `npm install 包名`的时候会自动把 `dependencies` 安装上。



## devDependencies

​		当在开发一个项目时，需要使用webpack、babel等，这些依赖只需要在该项目开发的过程或测试过程中使用，那么就写在`devDependencies`。即当一个依赖包在仅开发时候的使用，不需要被引入到`src`中，那么就放到`devDependencies`里。简而言之，就是某些依赖不需要被打包进项目中，就放在`devDependencies` 里。 

​		如果该项目被发布到npm的时候，其他人引入了该项目时，不会安装`devDependencies`上的依赖。



## 区别

### 什么时候需要明显区分？

​		开发的项目要发布npm包提供给外部、其他业务项目使用的，需要非常注意依赖的安装地方，因为搞不好很容易在业务使用中会出现bug。

### 为什么要明显区分？

​		比如说我们现在要开发一个自研依赖包，使用这个自研依赖包的时候我们还需要引用到别的依赖，引用的依赖分为两个情况，一个是**运行自研依赖包所必备的依赖**,在`dependencies`中写入，另一个是**开发的时候使用的依赖**，在`devDependencies`中写入。假设我们开发的自研依赖包是基于vue 的3.1.2的版本开发的，我们就把这个vue 3.1.2放在`devDependencies`里，当我们在开发这个自研依赖包的时候就可以使用vue 3.1.2来进行依赖包的开发，这样当我们在业务项目不是使用vue 3.1.2的情况下，也能成功引入自研依赖包来使用；如果自研依赖包把vue 3.2.1的引入放在`dependencies`里了，那么可能会出错，因为业务项目可能使用的是别的版本的vue ，这样就导致下载依赖的时候下了两个版本的Vue，可能会引起冲突。

​		