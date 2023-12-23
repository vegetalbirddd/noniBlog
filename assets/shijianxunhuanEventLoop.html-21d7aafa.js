import{_ as n,o as s,c as a,b as t}from"./app-2f0df8c0.js";const p={},e=t(`<h1 id="事件循环event-loop" tabindex="-1"><a class="header-anchor" href="#事件循环event-loop" aria-hidden="true">#</a> 事件循环Event Loop</h1><h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2><p>**事件循环其实就是JS的运行机制。**JS是单线程的，从上到下逐行执行，若遇到报错就会停止执行下面的代码，在执行过程中，JS先执行同步任务，再执行异步任务。</p><h2 id="事件循环的过程" tabindex="-1"><a class="header-anchor" href="#事件循环的过程" aria-hidden="true">#</a> 事件循环的过程</h2><ul><li>首先将同步任务放入<strong>任务队列</strong>中依次执行（队列先进先出），异步任务会根据是微任务还是宏任务分别放到<strong>微任务队列和宏任务队列</strong>里。</li><li>如果任务队列为空，即同步任务执行完了，那么就开始执行异步任务。异步任务中，<strong>先查看微任务队列</strong>，把微任务放入任务队列并执行。</li><li>微任务执行完后<strong>再查看宏任务队列</strong>（这时候DOM也渲染好了）。当执行完一个宏任务的时候，需要<strong>再查看微任务队列有没有新产生的微任务</strong>，如果有，那么需要先把新产生的微任务执行完后才可以执行下一个宏任务。然后如此循环，这个过程称为事件循环。</li></ul><h2 id="微任务和宏任务" tabindex="-1"><a class="header-anchor" href="#微任务和宏任务" aria-hidden="true">#</a> 微任务和宏任务</h2><h3 id="什么事件属于什么任务" tabindex="-1"><a class="header-anchor" href="#什么事件属于什么任务" aria-hidden="true">#</a> 什么事件属于什么任务</h3><p>微任务：Promise、async/await</p><p>宏任务：setTimeout、setInterval、Ajax、DOM事件</p><h3 id="两者区别" tabindex="-1"><a class="header-anchor" href="#两者区别" aria-hidden="true">#</a> 两者区别</h3><ul><li>微任务在DOM渲染前触发，宏任务在DOM渲染后触发（DOM还没渲染当然无法执行DOM事件啦）</li><li>微任务由ES6语法规定</li><li>宏任务由浏览器规定</li></ul><h2 id="举代码例子" tabindex="-1"><a class="header-anchor" href="#举代码例子" aria-hidden="true">#</a> 举代码例子</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;script start&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async1 end&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async2 end&#39;</span><span class="token punctuation">)</span> 
<span class="token punctuation">}</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setTimeout&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Promise&#39;</span><span class="token punctuation">)</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise1&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise2&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;script end&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果： script start async2 end Promise script end async1 end promise1 promise2 setTimeout</p>`,14),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","shijianxunhuanEventLoop.html.vue"]]);export{r as default};
