# hash模式和history模式

Vue中的router有两种模式：hash模式（默认）、history模式（需配置mode: 'history'）

## hash

hash的url带#，不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

路由的哈希模式其实是利用了`window.onhashchange`事件，也就是说，url中的哈希值（#后面的值）如果有变化，就会自动调用hashchange的监听事件，在hashchange的监听事件内可以得到改变后的url，这样能够找到对应页面进行加载

```js
window.addEventListener('hashchange', () => {
   // 把改变后的url地址栏的url赋值给data的响应式数据current，调用router-view去加载对应的页面
   this.data.current = window.location.hash.substr(1)
})
```



## history

HTML5 History Interface 中新增的两个API:` pushState()` 和 `replaceState()` 方法（需要特定浏览器支持），用来完成 URL 跳转而无须重新加载页面，不过这种模式还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，就需要前端自己配置404页面。

```js
const router = new VueRouter({
	mode: "history",
	routes: [
		{ path: "*",component:NotFoundComponent }
	]
})
```

`pushState() `和` replaceState() `可以**将url替换并且不刷新页面**，http并没有去请求服务器该路径下的资源，一旦刷新就会暴露这个实际不存在的资源，显示404（因为浏览器一旦刷新，就是去真正请求服务器资源）

那么如何去解决history模式下刷新报404的弊端呢，这就需要服务器端做点手脚，将不存在的路径请求重定向到入口文件（index.html），前后端联手，齐心协力做好“挂羊头卖狗肉”的完美特效

**pushState方法、方法，只能导致history对象发生变化，从而改变当前地址栏的 URL，但浏览器不会向后端发送请求，也不会触发popstate事件的执行**

**popstate事件的执行是在点击浏览器的前进后退按钮的时候，才会被触发**

```js
window.addEventListener('popstate', () => {
  this.data.current = window.location.pathname
})
```

### 补充知识

#### pushState() 方法

`pushState()` 方法用于向浏览器的会话历史栈中添加一个新的状态。它的语法如下：

```javascript
history.pushState(stateObject, title, url);
```

- `stateObject`: 一个包含状态信息的 JavaScript 对象，可以是任意类型的数据。这个对象会和新的历史记录条目一起存储。
- `title`: 当前页面的标题。现在大多数浏览器忽略这个参数。
- `url`: 新历史记录条目的 URL。

示例：

```js
codevar state = { page: 1 };

// 添加新的历史记录条目
history.pushState(state, "Page 1", "/page1");
```

#### popstate 事件

当用户点击浏览器的前进或后退按钮时，或者通过 JavaScript 调用 `history.back()`、`history.forward()`、`history.go()` 方法时，会触发 `popstate` 事件。可以通过监听该事件来捕获状态的变化。

```js
codewindow.addEventListener('popstate', function(event) {
    console.log('State changed:', event.state);
});
```

### replaceState() 方法

`replaceState()` 方法是 HTML5 中 History API 的一部分，与 `pushState()` 方法类似，用于在浏览器的会话历史中添加一个新的状态。与 `pushState()` 不同，`replaceState()` 不会添加新的历史记录条目，而是用新的状态替换当前的历史记录条目。

`replaceState()` 方法的语法如下：

```js
history.replaceState(stateObject, title, url);
```

- `stateObject`: 一个包含状态信息的 JavaScript 对象，可以是任意类型的数据。这个对象会与当前历史记录条目一起存储。
- `title`: 当前页面的标题。大多数浏览器忽略这个参数。
- `url`: 新历史记录条目的 URL。

#### 注意事项

1. `stateObject` 是一个可以包含任意数据的对象，但它必须是可序列化的，因为它会随着历史记录存储在用户代理中。
2. `title` 参数在大多数浏览器中被忽略，因此可以传入一个空字符串。
3. 虽然可以通过 `pushState()` 改变 URL，但它并不会触发页面的加载或发送 HTTP 请求。因此，通常需要结合 `popstate` 事件以及其他手段，比如监听 URL 变化，来执行相应的操作。

总体而言，`pushState()` 和相关的 API 提供了一种在不刷新整个页面的情况下，通过 JavaScript 动态修改浏览器地址栏和历史记录的机制。这对于构建单页应用 (SPA) 或实现更流畅的用户体验非常有用

## 区别

|          | hash                       | history                                |
| -------- | -------------------------- | -------------------------------------- |
| url显示  | 带#                        | 无#                                    |
| 回车刷新 | 可以加载到hash值对应的页面 | 可能会出现404（需要后端配置url重定向） |
| 支持版本 | 支持低版本浏览器和IE浏览器 | 用了HTML5的API，可能不兼容低版本浏览器 |

