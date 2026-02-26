# 总览

- [简介](./README.md)

- [资源包](respack/index.md)

- [谱面标准](chart-standard/index.md)

  - [谱面信息](chart-standard/chartinfo.md)

  - [谱面文件格式](chart-standard/chart-format/index.md)

    - [RPE](chart-standard/chart-format/rpe/index.md)
      - [谱面根目录](chart-standard/chart-format/rpe/root.md)
      - [判定线](chart-standard/chart-format/rpe/judgeLine.md)
      - [beat](chart-standard/chart-format/rpe/beat.md)
      - [音符](chart-standard/chart-format/rpe/note.md)
      - [普通事件](chart-standard/chart-format/rpe/event.md)
      - [特殊事件](chart-standard/chart-format/rpe/extendEvent.md)
      - [扩展特性](chart-standard/chart-format/rpe/extend.md)
      - [Controls](chart-standard/chart-format/rpe/controls.md)
    - [PE](chart-standard/chart-format/pe/index.md)
      - [基本信息](chart-standard/chart-format/pe/basic.md)
      - [事件](chart-standard/chart-format/pe/event.md)
      - [音符](chart-standard/chart-format/pe/note.md)
    - [Official](chart-standard/chart-format/phi/index.md)
      - [谱面根目录](chart-standard/chart-format/phi/root.md)
      - [音符](chart-standard/chart-format/phi/note.md)
      - [事件](chart-standard/chart-format/phi/event.md)
      - [判定线](chart-standard/chart-format/phi/judgeLine.md)

  - [音乐文件格式](chart-standard/music.md)

  - [扩展特性](chart-standard/extra/index.md)

    - [特效](chart-standard/extra/effect/index.md)

      - [内置着色器](chart-standard/extra/effect/builtin/index.md)

        - [`chromatic`](chart-standard/extra/effect/builtin/chromatic.md)
        - [`circleBlur`](chart-standard/extra/effect/builtin/circleBlur.md)
        - [`fisheye`](chart-standard/extra/effect/builtin/fisheye.md)
        - [`glitch`](chart-standard/extra/effect/builtin/glitch.md)
        - [`grayscale`](chart-standard/extra/effect/builtin/grayscale.md)
        - [`noise`](chart-standard/extra/effect/builtin/noise.md)
        - [`pixel`](chart-standard/extra/effect/builtin/pixel.md)
        - [`radialBlur`](chart-standard/extra/effect/builtin/radialBlur.md)
        - [`shockwave`](chart-standard/extra/effect/builtin/shockwave.md)
        - [`vignette`](chart-standard/extra/effect/builtin/vignette.md)

      - [自行编写着色器](chart-standard/extra/effect/custom-shader.md)

    - [视频背景](chart-standard/extra/video/index.md)

  - [解锁动画](chart-standard/unlock_video/index.md)

- [活动指南](./event/index.md)

- [UML文档](./uml/README.md)

  - [语法](./uml/syntax/README.md)

    - [坐标](./uml/syntax/coordinate.md)
    - [数据类型](./uml/syntax/type.md)
    - [表达式](./uml/syntax/expression.md)
    - [变量](./uml/syntax/variable.md)
    - [元素](./uml/syntax/element.md)

      - [段落元素 `p`](./uml/syntax/elements/p.md)
      - [图片元素 `img`](./uml/syntax/elements/img.md)
      - [谱面合集元素 `col`](./uml/syntax/elements/col.md)
      - [按钮元素 `btn`](./uml/syntax/elements/btn.md)

    - [注释](./uml/syntax/comment.md)
    - [注释表达式](./uml/syntax/comment_expression.md)

  - [如何调试](./uml/debugging.md)

  - [样例 UML](./uml/examples/README.md)

    - [模板活动](./uml/examples/template_event.md)
    - [2024 圣诞夜惊魂](./uml/examples/xmas-2024.md)

  - [使用进阶](./uml/advanced/README.md)
    - [页面切换](./uml/advanced/page_switch.md)
  
- [Phira 构建指南](./phira_build_guide/README.md)
  - [cargo 安装教程](./phira_build_guide/cargo.md)
  - [Windows](./phira_build_guide/Windows.md)
  - [Linux](./phira_build_guide/Linux.md)
  - [macOS](./phira_build_guide/macOS.md)
  - [Android](./phira_build_guide/Android.md)

- [糗事集锦](./dev-incident/README.md)
  - [长风的柳絮](./dev-incident/长风的柳絮.md)
  - [v0.6.0 更新消息](./dev-incident/v0.6.0更新消息.md)
  - [6th PecJam](./dev-incident/6thpecjam.md)
  - [天空之城](./dev-incident/天空之城.md)
  - [Forever Young](./dev-incident/ForeverYoung.md)
