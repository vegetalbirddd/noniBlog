import{_ as e,o,c as i,b as d}from"./app-dba3578e.js";const r={},a=d('<h1 id="输入url后发生了什么" tabindex="-1"><a class="header-anchor" href="#输入url后发生了什么" aria-hidden="true">#</a> 输入URL后发生了什么</h1><h2 id="输入url后渲染过程" tabindex="-1"><a class="header-anchor" href="#输入url后渲染过程" aria-hidden="true">#</a> 输入URL后渲染过程</h2><ul><li>输入URL之后，浏览器<strong>解析URL</strong>，确定了Web服务器和文件资源，<strong>生成HTTP请求</strong>。</li><li>还需要得到服务器域名对应的IP地址，所以需要发送<strong>DNS请求</strong>，通过DNS服务器拿到<strong>IP地址</strong>（<strong>DNS解析</strong>）。</li><li>拿到IP后，进行<strong>TCP连接建立HTTP请求</strong></li><li>经过层层传递后，服务端拿到了HTTP请求，把<strong>响应数据传给浏览器</strong></li><li>浏览器拿到HTTP响应数据后进行渲染。</li></ul><h2 id="渲染过程" tabindex="-1"><a class="header-anchor" href="#渲染过程" aria-hidden="true">#</a> 渲染过程</h2><ul><li>通过HTML解析器解析出<strong>DOM树</strong>，CSS解析器解析出<strong>CSS对象模型</strong></li><li>结合DOM和CSS，计算出DOM树每个节点的具体样式，<strong>生成渲染树</strong></li><li>根据渲染树布局和绘制，触发<strong>回流重绘</strong></li><li>构建图层树，显示页面</li></ul><h2 id="tcp-建立连接——三次握手" tabindex="-1"><a class="header-anchor" href="#tcp-建立连接——三次握手" aria-hidden="true">#</a> TCP 建立连接——三次握手</h2><ul><li>第一次握手：客户端发送SYN的数据包给服务端</li><li>第二次握手：服务端接受SYN后把ACK和SYN数据包发送给客户端</li><li>第三次握手：客户端接收到数据后发送ACK数据给服务端</li></ul><p>三次握手能保证双方具有接收和发送的能力</p><h2 id="断开连接过程——tcp四次挥手" tabindex="-1"><a class="header-anchor" href="#断开连接过程——tcp四次挥手" aria-hidden="true">#</a> 断开连接过程——TCP四次挥手</h2><ul><li>客户端打算关闭连接，此时会发送一个 TCP 首部 <code>FIN</code> 标志位被置为 <code>1</code> 的报文，也即 <code>FIN</code> 报文，之后客户端进入 <code>FIN_WAIT_1</code> 状态。</li><li>服务端收到该报文后，就向客户端发送 <code>ACK</code> 应答报文，接着服务端进入 <code>CLOSE_WAIT</code> 状态。</li><li>客户端收到服务端的 <code>ACK</code> 应答报文后，之后进入 <code>FIN_WAIT_2</code> 状态。</li><li>等待服务端处理完数据后，也向客户端发送 <code>FIN</code> 报文，之后服务端进入 <code>LAST_ACK</code> 状态。</li><li>客户端收到服务端的 <code>FIN</code> 报文后，回一个 <code>ACK</code> 应答报文，之后进入 <code>TIME_WAIT</code> 状态</li><li>服务端收到了 <code>ACK</code> 应答报文后，就进入了 <code>CLOSE</code> 状态，至此服务端已经完成连接的关闭。</li><li>客户端在经过 <code>2MSL</code> 一段时间后，自动进入 <code>CLOSE</code> 状态，至此客户端也完成连接的关闭。</li></ul><h2 id="dns解析的过程使用的传输层的什么协议" tabindex="-1"><a class="header-anchor" href="#dns解析的过程使用的传输层的什么协议" aria-hidden="true">#</a> DNS解析的过程使用的传输层的什么协议</h2><p>UDP协议</p><h2 id="数据包扒皮过程" tabindex="-1"><a class="header-anchor" href="#数据包扒皮过程" aria-hidden="true">#</a> 数据包扒皮过程</h2><p>发送端-&gt;HTTP数据-&gt;TCP头部-&gt;IP头部-&gt;以太网头部-&gt;IP头部-&gt;TCP头部-&gt;HTTP数据-&gt;接收端</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><p>https://xiaolincoding.com/network</p>',16),c=[a];function t(l,n){return o(),i("div",null,c)}const s=e(r,[["render",t],["__file","shuruURLhoufashengliaoshime.html.vue"]]);export{s as default};