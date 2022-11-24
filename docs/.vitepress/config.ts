import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  base: '/website/',
  title: 'letjs',
  titleTemplate: '前端工程化',
  description: 'Let.js官方文档',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  outDir: '../public',
  themeConfig: {
    // 默认主题配置
    siteTitle: ' ',
    logo: '/logo.png',
    nav: [
      {
        text: '主页',
        link: '/',
      },
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: '相关链接',
        items:[
          { text: '白皮书', link: 'https://github.com/let-js/docs/blob/master/letjs-whitepaper.md' },
          { text: '相关示例', link: 'https://github.com/let-js/examples'}
        ]
      }
    ],
    lastUpdatedText: 'Updated Date'
  }
})