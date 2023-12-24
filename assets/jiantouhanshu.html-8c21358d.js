import{_ as n,o as s,c as a,b as t}from"./app-c2658f0f.js";const p={},e=t(`<h1 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h1><h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2><p>在定义上很简洁，无需function关键字。<code>(函数参数) =&gt; {函数体}</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 没有参数</span>
<span class="token keyword">let</span> <span class="token function-variable function">fun1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 只有一个参数，可以省去参数括号</span>
<span class="token keyword">let</span> <span class="token function-variable function">fun2</span> <span class="token operator">=</span> <span class="token parameter">name</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> !</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 有多个参数，逗号分隔</span>
<span class="token keyword">let</span> <span class="token function-variable function">fun3</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">val1<span class="token punctuation">,</span> val2<span class="token punctuation">,</span> val3</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>val1<span class="token punctuation">,</span> val2<span class="token punctuation">,</span> val3<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//简单返回某个变量或者返回一个简单的JS表达式，可以省去函数体的大括号{ }</span>
<span class="token keyword">let</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num1<span class="token punctuation">,</span> num2</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> num1 <span class="token operator">+</span> num2<span class="token punctuation">;</span>

<span class="token comment">//只返回一个对象，要用小括号包裹要返回的对象</span>
<span class="token keyword">let</span> <span class="token function-variable function">getTempItem</span> <span class="token operator">=</span> <span class="token parameter">id</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> id<span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Temp&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//只有一条语句并且不需要返回值,加void关键字</span>
<span class="token keyword">let</span> <span class="token function-variable function">fun</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span> <span class="token function">doesNotReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="和普通函数的区别" tabindex="-1"><a class="header-anchor" href="#和普通函数的区别" aria-hidden="true">#</a> 和普通函数的区别</h2><ul><li>箭头函数写法上更简洁</li><li>箭头函数没有自己的this，没有prototype(原型)</li><li>箭头函数的this指向在定义时继承外层第一个普通函数的this，并且不会改变（call | apply | bind也无法改变）</li><li>无法作为构造函数使用，因为其没有自己的this，无法改变this的指向</li><li>箭头函数没有自己的<code>arguments</code>对象，在箭头函数中访问<code>arguments</code>实际上获得的是外层局部（函数）执行环境中的值。</li><li>箭头函数不能用作Generator函数，不能使用yield关键字</li></ul><h2 id="箭头函数的this指向" tabindex="-1"><a class="header-anchor" href="#箭头函数的this指向" aria-hidden="true">#</a> 箭头函数的this指向</h2><p>借用Babel理解</p><p>ES6：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token parameter">obj</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">getArrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> obj<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Babel转译后：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getArrow</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">getArrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_this <span class="token operator">===</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出，箭头函数实际上是继承了自己上一层作用域的this（父级作用域的上下文）</p>`,13),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","jiantouhanshu.html.vue"]]);export{r as default};
