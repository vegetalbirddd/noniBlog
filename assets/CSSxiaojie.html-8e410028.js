import{_ as l,r as n,o as s,c as o,d as t,e as i,a as r,b as a}from"./app-048330ee.js";const d={},g=t("h3",{id:"隐藏元素的几种方法",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#隐藏元素的几种方法","aria-hidden":"true"},"#"),i(" 隐藏元素的几种方法")],-1),y={href:"https://juejin.cn/post/6844904202867572749",target:"_blank",rel:"noopener noreferrer"},h=a('<table><thead><tr><th style="text-align:left;"></th><th style="text-align:left;"><strong>display: none</strong></th><th style="text-align:left;"><strong>visibility: hidden</strong></th><th style="text-align:left;"><strong>opacity: 0</strong></th></tr></thead><tbody><tr><td style="text-align:left;">是否占有空间</td><td style="text-align:left;">×</td><td style="text-align:left;">√</td><td style="text-align:left;">√</td></tr><tr><td style="text-align:left;">是否可以进行DOM事件监听</td><td style="text-align:left;">×</td><td style="text-align:left;">×</td><td style="text-align:left;">√</td></tr><tr><td style="text-align:left;">是否可以点击</td><td style="text-align:left;">×</td><td style="text-align:left;">×</td><td style="text-align:left;">√</td></tr><tr><td style="text-align:left;">是否可以被子元素继承</td><td style="text-align:left;">×</td><td style="text-align:left;">√</td><td style="text-align:left;">√</td></tr><tr><td style="text-align:left;">子元素能否通过改变属性值来改变继承自父亲的隐藏状态</td><td style="text-align:left;">×</td><td style="text-align:left;">√</td><td style="text-align:left;">×</td></tr></tbody></table><h4 id="_1-display-none" tabindex="-1"><a class="header-anchor" href="#_1-display-none" aria-hidden="true">#</a> 1.display: none</h4><ul><li><strong>DOM 结构</strong>：浏览器不会渲染 display 属性为 none 的元素，会让元素完全从渲染树中消失，渲染的时候不占据任何空间；</li><li><strong>事件监听</strong>：无法进行 DOM 事件监听，不能点击；</li><li><strong>性能</strong>：修改元素会造成文档回流（reflow 与 repaint）,读屏器不会读取display: none元素内容，性能消耗较大；</li><li><strong>继承</strong>：是非继承属性，由于元素从渲染树消失，造成子孙节点消失，即使修改子孙节点属性子孙节点也无法显示，毕竟子类也不会被渲染；</li><li><strong>场景</strong>：显示出原来这里不存在的结构；</li><li><strong>transition</strong>：transition 不支持 display。</li></ul><h4 id="_2-visibility-hidden" tabindex="-1"><a class="header-anchor" href="#_2-visibility-hidden" aria-hidden="true">#</a> 2.visibility: hidden</h4><ul><li><strong>DOM 结构</strong>：不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见；</li><li><strong>事件监听</strong>：无法进行 DOM 事件监听，不能点击；</li><li><strong>性能</strong>：修改元素只会造成本元素的重绘（repaint），是重回操作，比回流操作性能高一些，性能消耗较少；读屏器读取visibility: hidden元素内容；</li><li><strong>继承</strong>：是继承属性，子孙节点消失是由于继承了visibility: hidden，子元素可以通过设置 visibility: visible 来取消隐藏；</li><li><strong>场景</strong>：显示不会导致页面结构发生变动，不会撑开；</li><li><strong>transition</strong>：transition 支持 visibility，visibility 会立即显示，隐藏时会延时。</li></ul><h4 id="_3-opacity-0" tabindex="-1"><a class="header-anchor" href="#_3-opacity-0" aria-hidden="true">#</a> 3.opacity: 0</h4><ul><li><strong>DOM 结构</strong>：透明度为 100%，不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见；</li><li><strong>事件监听</strong>：可以进行 DOM 事件监听，可以点击；</li><li><strong>性能</strong>：提升为合成层，是重建图层，不和动画属性一起则不会产生repaint（不脱离文档流，不会触发重绘），性能消耗较少；</li><li><strong>继承</strong>：会被子元素继承，且子元素并不能通过 opacity: 1 来取消隐藏；</li><li><strong>场景</strong>：可以跟transition搭配；</li><li><strong>transition</strong>：transition 支持 opacity，opacity 可以延时显示和隐藏。</li></ul><p><em>打个比方</em>： <strong>display: none</strong>： 从这个世界消失了, 不存在了； <strong>opacity: 0</strong>： 视觉上隐身了, 看不见, 可以触摸得到； <strong>visibility: hidden</strong>： 视觉和物理上都隐身了, 看不见也摸不到, 但是存在的；</p><p>==附加题：CSS 隐藏页面上的一个元素有哪几种方法？==</p><ol><li>display:none，visibility:hiden，opacity:0 这三种；</li><li>设置 fixed 并设置足够大负距离的 left top 使其“隐藏”；</li><li>用层叠关系 z-index 把元素叠在最底下使其“隐藏”；</li><li>用 text-indent:-9999px 使其文字隐藏。</li></ol>',10);function c(f,x){const e=n("ExternalLinkIcon");return s(),o("div",null,[g,t("p",null,[t("em",null,[t("a",y,[i("掘金_opacity: 0、visibility: hidden、display: none 优劣和适用场景，以及隐藏元素的几种方法"),r(e)])])]),h])}const _=l(d,[["render",c],["__file","CSSxiaojie.html.vue"]]);export{_ as default};
