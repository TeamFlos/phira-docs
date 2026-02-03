import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: { 
    plugins: [
      MermaidPlugin(),
      groupIconVitePlugin({ 
        customIcon: {
          github: localIconLoader(import.meta.url, '../src/public/svg/github.svg'),
        },
      })
    ],
    optimizeDeps: {
      exclude: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
        'vitepress', 
        '@nolebase/ui', 
      ],
      include: ['mermaid'],
    },
    ssr: { 
      noExternal: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        "@nolebase/ui-asciinema", 
        '@nolebase/ui', 
        'mermaid', 
      ], 
    }, 
  }, 
  title: "Phira",
  description: "Phigros 二创社区",
  lang: "zh-CN",
  srcDir: './src',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {// https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    logo: "/favicon.png",
    editLink: {
      pattern: 'https://github.com/OrbiterStellarTrek/Phira-Doc/edit/main/src/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一个',
      next: '下一个'
    },
    externalLinkIcon: true,
    outline: {
      level: [2,4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },
    returnToTopLabel:'返回顶部',
    sidebarMenuLabel:'目录',

    nav: [
      { text: '简介', link: '/README' },
      { text: '总览', link: '/SUMMARY' }
    ],

    sidebar: [
      {
        text: '简介',
        link: '/README'
      },
      {
        text: '资源包',
        link: '/respack/'
      },
      {
        text: '基础帮助文档',
        link: '/help/'
      },
      {
        text: '谱面标准',
        link: '/chart-standard/',
        items: [
          { text: '谱面信息', link: '/chart-standard/chartinfo' },
          {
            text: '谱面文件格式',
            link: '/chart-standard/chart-format/',
            collapsed: true,
            items: [
              {
                text: 'RPE',
                link: '/chart-standard/chart-format/rpe/',
                collapsed: true,
                items: [
                  { text: '谱面根目录', link: '/chart-standard/chart-format/rpe/root' },
                  { text: '判定线', link: '/chart-standard/chart-format/rpe/judgeLine' },
                  { text: 'beat', link: '/chart-standard/chart-format/rpe/beat' },
                  { text: '音符', link: '/chart-standard/chart-format/rpe/note' },
                  { text: '普通事件', link: '/chart-standard/chart-format/rpe/event' },
                  { text: '特殊事件', link: '/chart-standard/chart-format/rpe/extendEvent' },
                  { text: '扩展特性', link: '/chart-standard/chart-format/rpe/extend' },
                  { text: 'Controls', link: '/chart-standard/chart-format/rpe/controls' },
                ]
              },
              {
                text: 'PE',
                link: '/chart-standard/chart-format/pe/',
                collapsed: true,
                items: [
                  { text: '基本信息', link: '/chart-standard/chart-format/pe/basic' },
                  { text: '事件', link: '/chart-standard/chart-format/pe/event' },
                  { text: '音符', link: '/chart-standard/chart-format/pe/note' },
                ]
              },
              {
                text: 'Official',
                link: '/chart-standard/chart-format/phi/',
                collapsed: true,
                items: [
                  { text: '谱面根目录', link: '/chart-standard/chart-format/phi/root' },
                  { text: '音符', link: '/chart-standard/chart-format/phi/note' },
                  { text: '事件', link: '/chart-standard/chart-format/phi/event' },
                  { text: '判定线', link: '/chart-standard/chart-format/phi/judgeLine' },
                ]
              }
            ]
          },
          { text: '音乐文件格式', link: '/chart-standard/music' },
          {
            text: '扩展特性',
            link: '/chart-standard/extra/',
            collapsed: true,
            items: [
              {
                text: '特效',
                link: '/chart-standard/extra/effect/',
                collapsed: true,
                items: [
                  {
                    text: '内置着色器',
                    link: '/chart-standard/extra/effect/builtin/',
                    collapsed: true,
                    items: [
                      { text: 'chromatic', link: '/chart-standard/extra/effect/builtin/chromatic' },
                      { text: 'circleBlur', link: '/chart-standard/extra/effect/builtin/circleBlur' },
                      { text: 'fisheye', link: '/chart-standard/extra/effect/builtin/fisheye' },
                      { text: 'glitch', link: '/chart-standard/extra/effect/builtin/glitch' },
                      { text: 'grayscale', link: '/chart-standard/extra/effect/builtin/grayscale' },
                      { text: 'noise', link: '/chart-standard/extra/effect/builtin/noise' },
                      { text: 'pixel', link: '/chart-standard/extra/effect/builtin/pixel' },
                      { text: 'radialBlur', link: '/chart-standard/extra/effect/builtin/radialBlur' },
                      { text: 'shockwave', link: '/chart-standard/extra/effect/builtin/shockwave' },
                      { text: 'vignette', link: '/chart-standard/extra/effect/builtin/vignette' },
                    ]
                  },
                  { text: '自行编写着色器', link: '/chart-standard/extra/effect/custom-shader' },
                ]
              },
              { text: '视频背景', link: '/chart-standard/extra/video/' },
            ]
          },
          { text: '解锁动画', link: '/chart-standard/unlock_video/' },
        ]
      },
      {
        text: '活动指南',
        link: '/event/'
      },
      {
        text: 'UML文档',
        link: '/uml/README',
        collapsed: true,
        items: [
          {
            text: '语法',
            link: '/uml/syntax/README',
            collapsed: true,
            items: [
              { text: '坐标', link: '/uml/syntax/coordinate' },
              { text: '数据类型', link: '/uml/syntax/type' },
              { text: '表达式', link: '/uml/syntax/expression' },
              { text: '变量', link: '/uml/syntax/variable' },
              {
                text: '元素',
                link: '/uml/syntax/element',
                collapsed: true,
                items: [
                  { text: '段落元素 p', link: '/uml/syntax/elements/p' },
                  { text: '图片元素 img', link: '/uml/syntax/elements/img' },
                  { text: '谱面合集元素 col', link: '/uml/syntax/elements/col' },
                  { text: '按钮元素 btn', link: '/uml/syntax/elements/btn' },
                ]
              },
              { text: '注释', link: '/uml/syntax/comment' },
              { text: '注释表达式', link: '/uml/syntax/comment_expression' },
            ]
          },
          { text: '如何调试', link: '/uml/debugging' },
          {
            text: '样例 UML',
            link: '/uml/examples/README',
            collapsed: true,
            items: [
              { text: '模板活动', link: '/uml/examples/template_event' },
              { text: '2024 圣诞夜惊魂', link: '/uml/examples/xmas-2024' },
            ]
          },
          {
            text: '使用进阶',
            link: '/uml/advanced/README',
            collapsed: true,
            items: [
              { text: '页面切换', link: '/uml/advanced/page_switch' },
            ]
          }
        ]
      },
      {
        text: 'Phira 构建指南',
        link: '/phira_build_guide/README',
        collapsed: true,
        items: [
          { text: 'cargo 安装教程', link: '/phira_build_guide/cargo' },
          { text: 'Windows', link: '/phira_build_guide/Windows' },
          { text: 'Linux', link: '/phira_build_guide/Linux' },
          { text: 'Android', link: '/phira_build_guide/Android' },
        ]
      },
      {
        text: 'Phira MP 构建指南',
        collapsed: true,
        items: [
          { text: '教程', link: '/mp_build_guide/' },
          { text: 'Termux（安卓）', link: '/mp_build_guide/Termux' },
          { text: 'Windows', link: '/mp_build_guide/Windows' },
          { text: 'Linux', link: '/mp_build_guide/Linux' },
        ]
      },
      {
        text: '糗事集锦',
        link: '/dev-incident/README',
        collapsed: true,
        items: [
          { text: '长风的柳絮', link: '/dev-incident/长风的柳絮' },
          { text: 'v0.6.0 更新消息', link: '/dev-incident/v0.6.0更新消息' },
          { text: '6th PecJam', link: '/dev-incident/6thpecjam' },
          { text: '天空之城', link: '/dev-incident/天空之城' },
          { text: 'Forever Young', link: '/dev-incident/ForeverYoung' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/OrbiterStellarTrek/Phira-Doc' }
    ]
  },
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '更多'
    },
    config(md) {
      md.use(MermaidMarkdown);
      md.use(markdownItTaskCheckbox); //todo
      md.use(groupIconMdPlugin) //代码组图标
    },
  },
  sitemap: {
    hostname: 'https://phira-doc.star-trip.space/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },
  lastUpdated: true,
})
