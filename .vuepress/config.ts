import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "noni's blog",
  description: "一个博客，主要分享前端知识~😊",
  base: '/noniBlog/',
  head: [
    ['link', { rel: 'icon', href: './favicon.ico' }]
  ],
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "noni",
    authorAvatar: "/head.png",
    docsBranch: "main",
    docsDir: "blogs",
    lastUpdatedText: "最近更新",
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      {
        text: "分类", link: "/categories/",
        children: [
          { text: "HTML", link: '/categories/HTML/1/' },
          { text: "css", link: '/categories/CSS/1/' },
          { text: "JavaScript", link: '/categories/JavaScript/1/' },
          { text: "ES6", link: '/categories/ES6/1/' },
          { text: "Vue", link: '/categories/Vue/1/' },
          { text: "计算机网络", link: '/categories/jisuanjiwangluo/1/' },
        ]
      },
      { text: "标签", link: "/tags/qianduan/1/", icon: "Tag" },
      { text: '时间轴', link: '/timeline', icon: 'Time' },
      { text: '留言板', link: '/docs/message-board', icon: 'Chat' }
    ],
    commentConfig: {
      type: 'giscus',
      options: {
        repo: 'vegetalbirddd/noniBlog',
        repoId: 'R_kgDOK6fArw',
        category: 'Show and tell',
        categoryId: 'DIC_kwDOK6fAr84Cb18g',
        mapping: 'title',
        strict: '0',
        lang: 'zh-CN',
        crossorigin: 'anonymous'
      }
    }
  }),
});
