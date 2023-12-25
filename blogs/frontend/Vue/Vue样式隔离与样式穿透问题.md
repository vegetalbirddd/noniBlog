---
title: Vue样式隔离与样式穿透
date: 2023-8-10
tags:
 - 前端
 - Vue
 - Vue知识小点
categories:
 - Vue
---

# Vue样式隔离与样式穿透

### 1. Scoped CSS的原理

#### 1.1 区别

无设置`Scoped`与设置`Scoped`的区别

**无设置`Scoped`**

```html
<div class="login">登录</div>
<style>
.login {
  width: 100px;
  height: 100px
}
</style>
```

当未设置Scoped时，打包后的结果跟原来的代码一样，没有区别。

**设置`Scoped`**

```html
<div class="login">登录</div>
<style scoped>
.login {
  width: 100px;
  height: 100px
}
</style>
```

打包之后的结果是跟原来的代码就有所区别了。如下：

```html
<div data-v-257dda99b class="login">登录</div>
<style scoped>
.login[data-v-257dda99b] {
  width: 100px;
  height: 100px
}
</style>
```

通过上面的例子，可以发现多了一个属性，也就是说加了scoped，该组件中的所有dom都会添加一个独一无二的属性，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom，可以使得组件之间的样式不互相污染。

#### 1.2 原理

Vue的作用域样式 Scoped CSS 的实现思路如下：

1. 为每个组件实例生成一个能唯一标识组件实例的标识符；
2. 给组件模板中的每一个标签对应的Dom元素添加一个标签属性，格式为 `data-v-实例标识`，示例：`<div data-v-e0f690c0="" >`；
3. 给组件的作用域样式 `<style scoped>` 的**每一个选择器的最后一个选择器单元**增加一个属性选择器 `原选择器[data-v-实例标识]` ，示例：假设原选择器为 `.cls #id > div`，则更改后的选择器为 `.cls #id > div[data-v-e0f690c0]`；

#### 1.3 特点

1. 将组件的样式的作用范围限制在了组件内部，包含子组件的根标签，但不包含子组件的除根标签之外的其它标签；所以组件的css选择器也不能选择到子组件及后代组件的中的元素（子组件的根元素除外）；

> 因为它给选择器的最后一个选择器单元增加了属性选择器 `[data-v-实例标识]` ，而该属性选择器只能选中当前组件模板中的标签；而对于子组件，只有根元素 即有 能代表子组件的标签属性 `data-v-子实例标识`，又有能代表当前组件（父组件）的 签属性 `data-v-父实例标识`，子组件的其它非根元素，仅有能代表子组件的标签属性 `data-v-子实例标识`；

2. 使用 `scoped` 特性时，样式中的所有选择器都会自动添加一个 `[data-v-<组件实例的唯一标识>]` 属性，以实现样式的作用域隔离。

### 2. >>>、/deep/、::v-deep深度选择器的原理

####  2.1 例子

假设我们在自己的组件中引入了一个子组件，并且希望在我的组件中修改子组件中的样式，由于我们用了 `scoped`，直接修改是不生效的。这时去掉 `scoped` 就可以生效，但是这样失去了样式隔离。既想要有样式隔离，又想要修改子组件中的样式，这时候就需要用到深度选择器。



以下是一个例子：

```html
<template>
    <div class="child">
        <h1>我是子组件</h1>
        <div class="dyx">
            <p>我是子组件的段落</p>
        </div>
    </div>
</template>

<style scoped>
    .child .dyx p {
        background-color: blue;
    }
</style>
```

这时候我们就会发现没有效果。但是如果我们使用`>>>`、`/deep/`、`::v-deep`三个深度选择器其中一个就能实现了。看代码:

```html
<template>
  <div class="parent" id="app">
    <h1>我是父组件</h1>
    <div class="gby">
      <p>我是一个段落</p>
    </div>

    <child></child>
  </div>
</template>

<style scoped>
  .parent {
    background-color: green;
  }

  .gby p {
    background-color: red;
  }
  // 把子组件的背景变成红色，原组件不变
  ::v-deep .child .dyx p {
    background-color: red;
  }
</style>
```

#### 2.2 原理

如果你希望 scoped 样式中的一个选择器能够选择到子组 或 后代组件中的元素，我们可以使用 `深度作用选择器`，它有三种写法：

- `>>>`，示例： `.gby div >>> #dyx p``
- ``/deep/`，示例： `.gby div /deep/ #dyx p` 或 `.gby div/deep/ #dyx p`
- `::v-deep，示例： ``.gby div::v-deep #dyx p` 或` .gby div::v-deep #dyx p`

它的原理与 Scoped CSS 的原理基本一样，只是第3步有些不同（前2步一样），具体如下：

1. 为每个组件实例（注意：是组件的实例，不是组件类）生成一个能唯一标识组件的标识符;
2. 给组件模板中的每一个标签对应的Dom元素（组件标签对应的Dom元素是该组件的根元素）添加一个标签属性，格式为 `data-v-实例标识`，示例：`<div data-v-e0f690c0="" >`；
3. 给组件的作用域样式 `<style scoped>` 的**每一个深度作用选择器前面的一个选择器单元**增加一个属性选择器`[data-v-实例标识]` ，示例：假设原选择器为 `.cls #id >>> div`，则更改后的选择器为 `.cls #id[data-v-e0f690c0] div`；

因为Vue不会为深度作用选择器后面的选择器单元增加 属性选择器`[data-v-实例标识]`，所以，后面的选择器单元能够选择到子组件及后代组件中的元素