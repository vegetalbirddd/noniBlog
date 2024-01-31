import{_ as e,o as a,c as i,b as r}from"./app-c444b2aa.js";const t={},d=r('<h2 id="简单了解javascript" tabindex="-1"><a class="header-anchor" href="#简单了解javascript" aria-hidden="true">#</a> 简单了解JavaScript</h2><h3 id="javascript实现" tabindex="-1"><a class="header-anchor" href="#javascript实现" aria-hidden="true">#</a> JavaScript实现</h3><p>完整的JavaScript包含：核心（ECMAScript ）+文档对象模型（DOM）+浏览器对象模型（BOM）</p><p><strong>JavaScript = ECMAScript + DOM + BOM</strong></p><h3 id="ecmascript" tabindex="-1"><a class="header-anchor" href="#ecmascript" aria-hidden="true">#</a> ECMAScript</h3><p>ECMAScript 是一个语言标准，对实现这个规范描述的所有方面的一门语言的称呼。JavaScript 实现了ECMAScript，而Adobe ActionScript同样也实现了 ECMAScript 。</p><p>不涉及浏览器的话，ECMAScript 在基本的层面，描述这门语言如下部分：</p><ul><li>语法</li><li>类型</li><li>语句</li><li>关键字</li><li>保留字</li><li>操作符</li><li>全局对象</li></ul><p>Web浏览器是 ECMAScript 实现可能存在的一种宿主环境（host environment）。宿主环境提供 ECMAScript 的基准实现和与环境自身交互必需的<strong>拓展</strong>。其他宿主环境还有服务器端JavaScript平台Node.js和即将被淘汰的Adobe Flash。</p><blockquote><p>拓展（比如DOM）使用 ECMAScript 核心类型和语法，提供特定于环境的额外功能。</p></blockquote><h3 id="dom" tabindex="-1"><a class="header-anchor" href="#dom" aria-hidden="true">#</a> DOM</h3><p>文档对象模型（DOM，Document Object Model）是一个应用编程接口（API），用于在HTML中使用拓展的XML。DOM将整个页面抽象为一组分层节点。</p><p>DOM通过创建表示文档的树使开发者能够控制网页内容和结构，使用DOM API可以进行删除、添加、替换、修改节点。</p><h4 id="为什么dom是必需的" tabindex="-1"><a class="header-anchor" href="#为什么dom是必需的" aria-hidden="true">#</a> 为什么DOM是必需的</h4><p>为了保持Web跨平台的本性，让Web不发生分裂，因此万维网联盟（W3C，World Wide Web Consortium）指定DOM标准，让开发者写一个HTML页面就可以在任何浏览器中运行。</p><h4 id="dom级别" tabindex="-1"><a class="header-anchor" href="#dom级别" aria-hidden="true">#</a> DOM级别</h4><h5 id="dom-level-1" tabindex="-1"><a class="header-anchor" href="#dom-level-1" aria-hidden="true">#</a> DOM Level 1</h5><p>由DOM核心（DOM Core）和DOM HTML组成。</p><p>DOM核心规定的是如何映射基于XML的文档结构，以便简化对文档中任意部分的访问和操作。</p><p>DOM HTML模块则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法。</p><h5 id="dom-level-2" tabindex="-1"><a class="header-anchor" href="#dom-level-2" aria-hidden="true">#</a> DOM Level 2</h5><p>新增模块：</p><ul><li>DOM视图：描述追踪文档不同视图（如应用CSS样式前后的文档）的接口</li><li>DOM时间：描述时间及时间处理的接口</li><li>DOM样式：描述处理元素CSS样式的接口</li><li>DOM遍历和范围：描述遍历和操作DOM树的接口</li></ul><h5 id="dom-level-3" tabindex="-1"><a class="header-anchor" href="#dom-level-3" aria-hidden="true">#</a> DOM Level 3</h5><p>进一步扩展了DOM，增加以统一的方式加载和保存、验证文档的方法。DOM Core经过扩展支持了所有XML 1.0的特性</p><blockquote><p>DOM0级可以看作是最初支持的DHTML。</p></blockquote>',26),c=[d];function l(o,h){return a(),i("div",null,c)}const n=e(t,[["render",l],["__file","1-1.html.vue"]]);export{n as default};
