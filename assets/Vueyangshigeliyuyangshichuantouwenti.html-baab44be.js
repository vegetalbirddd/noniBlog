import{_ as n,o as s,c as a,b as t}from"./app-4921d00f.js";const p={},e=t(`<h1 id="vue样式隔离与样式穿透" tabindex="-1"><a class="header-anchor" href="#vue样式隔离与样式穿透" aria-hidden="true">#</a> Vue样式隔离与样式穿透</h1><h3 id="_1-scoped-css的原理" tabindex="-1"><a class="header-anchor" href="#_1-scoped-css的原理" aria-hidden="true">#</a> 1. Scoped CSS的原理</h3><h4 id="_1-1-区别" tabindex="-1"><a class="header-anchor" href="#_1-1-区别" aria-hidden="true">#</a> 1.1 区别</h4><p>无设置<code>Scoped</code>与设置<code>Scoped</code>的区别</p><p><strong>无设置<code>Scoped</code></strong></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>login<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>登录<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.login</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当未设置Scoped时，打包后的结果跟原来的代码一样，没有区别。</p><p><strong>设置<code>Scoped</code></strong></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>login<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>登录<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.login</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打包之后的结果是跟原来的代码就有所区别了。如下：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">data-v-257dda99b</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>login<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>登录<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.login[data-v-257dda99b]</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的例子，可以发现多了一个属性，也就是说加了scoped，该组件中的所有dom都会添加一个独一无二的属性，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom，可以使得组件之间的样式不互相污染。</p><h4 id="_1-2-原理" tabindex="-1"><a class="header-anchor" href="#_1-2-原理" aria-hidden="true">#</a> 1.2 原理</h4><p>Vue的作用域样式 Scoped CSS 的实现思路如下：</p><ol><li>为每个组件实例生成一个能唯一标识组件实例的标识符；</li><li>给组件模板中的每一个标签对应的Dom元素添加一个标签属性，格式为 <code>data-v-实例标识</code>，示例：<code>&lt;div data-v-e0f690c0=&quot;&quot; &gt;</code>；</li><li>给组件的作用域样式 <code>&lt;style scoped&gt;</code> 的<strong>每一个选择器的最后一个选择器单元</strong>增加一个属性选择器 <code>原选择器[data-v-实例标识]</code> ，示例：假设原选择器为 <code>.cls #id &gt; div</code>，则更改后的选择器为 <code>.cls #id &gt; div[data-v-e0f690c0]</code>；</li></ol><h4 id="_1-3-特点" tabindex="-1"><a class="header-anchor" href="#_1-3-特点" aria-hidden="true">#</a> 1.3 特点</h4><ol><li>将组件的样式的作用范围限制在了组件内部，包含子组件的根标签，但不包含子组件的除根标签之外的其它标签；所以组件的css选择器也不能选择到子组件及后代组件的中的元素（子组件的根元素除外）；</li></ol><blockquote><p>因为它给选择器的最后一个选择器单元增加了属性选择器 <code>[data-v-实例标识]</code> ，而该属性选择器只能选中当前组件模板中的标签；而对于子组件，只有根元素 即有 能代表子组件的标签属性 <code>data-v-子实例标识</code>，又有能代表当前组件（父组件）的 签属性 <code>data-v-父实例标识</code>，子组件的其它非根元素，仅有能代表子组件的标签属性 <code>data-v-子实例标识</code>；</p></blockquote><ol start="2"><li>使用 <code>scoped</code> 特性时，样式中的所有选择器都会自动添加一个 <code>[data-v-&lt;组件实例的唯一标识&gt;]</code> 属性，以实现样式的作用域隔离。</li></ol><h3 id="_2-、-deep-、-v-deep深度选择器的原理" tabindex="-1"><a class="header-anchor" href="#_2-、-deep-、-v-deep深度选择器的原理" aria-hidden="true">#</a> 2. &gt;&gt;&gt;、/deep/、::v-deep深度选择器的原理</h3><h4 id="_2-1-例子" tabindex="-1"><a class="header-anchor" href="#_2-1-例子" aria-hidden="true">#</a> 2.1 例子</h4><p>假设我们在自己的组件中引入了一个子组件，并且希望在我的组件中修改子组件中的样式，由于我们用了 <code>scoped</code>，直接修改是不生效的。这时去掉 <code>scoped</code> 就可以生效，但是这样失去了样式隔离。既想要有样式隔离，又想要修改子组件中的样式，这时候就需要用到深度选择器。</p><p>以下是一个例子：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>child<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>我是子组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dyx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>我是子组件的段落<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.child .dyx p</span> <span class="token punctuation">{</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我们就会发现没有效果。但是如果我们使用<code>&gt;&gt;&gt;</code>、<code>/deep/</code>、<code>::v-deep</code>三个深度选择器其中一个就能实现了。看代码:</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>我是父组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>gby<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>我是一个段落<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.parent</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.gby p</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">// 把子组件的背景变成红色，原组件不变
  ::v-deep .child .dyx p</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-原理" tabindex="-1"><a class="header-anchor" href="#_2-2-原理" aria-hidden="true">#</a> 2.2 原理</h4><p>如果你希望 scoped 样式中的一个选择器能够选择到子组 或 后代组件中的元素，我们可以使用 <code>深度作用选择器</code>，它有三种写法：</p><ul><li><code>&gt;&gt;&gt;</code>，示例： \`.gby div &gt;&gt;&gt; #dyx p\`\`</li><li>\`\`/deep/<code>，示例： </code>.gby div /deep/ #dyx p<code>或</code>.gby div/deep/ #dyx p\`</li><li><code>::v-deep，示例： \`\`.gby div::v-deep #dyx p</code> 或<code> .gby div::v-deep #dyx p</code></li></ul><p>它的原理与 Scoped CSS 的原理基本一样，只是第3步有些不同（前2步一样），具体如下：</p><ol><li>为每个组件实例（注意：是组件的实例，不是组件类）生成一个能唯一标识组件的标识符;</li><li>给组件模板中的每一个标签对应的Dom元素（组件标签对应的Dom元素是该组件的根元素）添加一个标签属性，格式为 <code>data-v-实例标识</code>，示例：<code>&lt;div data-v-e0f690c0=&quot;&quot; &gt;</code>；</li><li>给组件的作用域样式 <code>&lt;style scoped&gt;</code> 的<strong>每一个深度作用选择器前面的一个选择器单元</strong>增加一个属性选择器<code>[data-v-实例标识]</code> ，示例：假设原选择器为 <code>.cls #id &gt;&gt;&gt; div</code>，则更改后的选择器为 <code>.cls #id[data-v-e0f690c0] div</code>；</li></ol><p>因为Vue不会为深度作用选择器后面的选择器单元增加 属性选择器<code>[data-v-实例标识]</code>，所以，后面的选择器单元能够选择到子组件及后代组件中的元素</p>`,32),c=[e];function o(l,i){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","Vueyangshigeliyuyangshichuantouwenti.html.vue"]]);export{d as default};