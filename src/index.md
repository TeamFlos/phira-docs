---

layout: home

hero:
  name: Phira
  text: Phigros 二创社区
  actions:
    - theme: brand
      text: 说明
      link: README
    - theme: alt
      text: 多人联机服务器状态
      link: "https://status.dmocken.top/"
    - theme: alt
      text: 前往 Github 项目主页
      link: "https://github.com/Teamflos/Phira"
  image:
      src: /favicon.png
      alt: Phira

features:
  - icon: 🎮
    title: 谱面制作
    details: 完整的谱面标准文档，支持 RPE、PE、Official 等多种格式
  - icon: 📚
    title: 详细文档
    details: 从入门到精通，涵盖所有模块和功能的完整指南
  - icon: 🛠️
    title: 构建指南
    details: Windows、Linux、Android 多平台编译指南，助你快速上手

---

<style>
.VPHero {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 50vh !important;
  flex-direction: row !important;
}

.VPHero .container {
  display: flex !important;
  flex-direction: row !important;
  width: 100% !important;
  gap: 2rem !important;
  align-items: center !important;
}

.VPHero .main {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: center !important;
}

.VPHero .main .heading {
  transform: none !important;
}

.VPHero .main .actions {
  margin-top: 1.5rem !important;
}

.VPHero .image {
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transform: none !important;
}

.VPHero .image img {
  max-width: 300px !important;
  border-radius: 12px !important;
}

@media (max-width: 768px) {
  .VPHero .container {
    flex-direction: column !important;
  }

  .VPHero .main {
    align-items: center !important;
  }

  .VPHero .image {
    order: -1 !important;
  }

  .VPHero .image img {
    max-width: 200px !important;
  }
}
</style>


注：本文档基于 https://teamflos.github.io/phira-docs/ 搬来并二次编写