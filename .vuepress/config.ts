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
    series: {
      "/blogs/notes/": [
        {
          text: "《JavaScript高级程序设计》(4版)",
          children: [
            { text: "第1章 什么是JavaScript", link: '/blogs/notes/hbs/1-1.html' },
            { text: "第2章 HTML中的JavaScript", link: '/blogs/notes/hbs/2-1.html' },
            { text: "第3章 语言基础", link: '/blogs/notes/hbs/3-1.html' },
            { text: "第4章 变量、作用域与内存", link: '/blogs/notes/hbs/4-1.html' },
            ],
        },
        {
          text: "手写系列",
          children: [
            { text: "手写JavaScriptAPI", link: '/blogs/notes/jsCode/手写api.html' },
          ],
        },
      ],
      "/blogs/interview/": [
        {
          text: "JavaScript底层基础",
          children: [
            { text: "JavaScript底层基础", link: '/blogs/interview/js底层基础/js-note.html' },
            ],
        },
      ]
    },
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      {
        text: "文章", link: "/categories/",
        children: [
          { text: "HTML", link: '/categories/HTML/1/' },
          { text: "css", link: '/categories/CSS/1/' },
          { text: "JavaScript", link: '/categories/JavaScript/1/' },
          { text: "ES6", link: '/categories/ES6/1/' },
          { text: "Vue", link: '/categories/Vue/1/' },
          { text: "计算机网络", link: '/categories/jisuanjiwangluo/1/' },
          { text: "浏览器", link: '/categories/liulanqi/1/' },
          { text: "算法笔记", link: '/categories/suanfa/1/' },
          { text: "工程化", link: '/categories/gongchenghua/1/' },
        ]
      },
      { text: "学习笔记", link: "/blogs/notes/介绍.html" },
      { text: "面试准备", link: "/blogs/interview/介绍.html" },
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
