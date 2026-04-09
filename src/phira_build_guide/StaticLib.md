# 静态库（prpr-avc）

## 介绍
- 此文件为 Phira 使用的用于解码视频的静态库，现版本静态库文件由 [此仓库](https://github.com/TeamFlos/prpr-avc-ffmpeg/) 提供。
- Phira 引用的静态库 FFmpeg 版本无需非常严格。
- 预编译的静态库可以在 [prpr-avc-ffmpeg仓库](https://github.com/TeamFlos/prpr-avc-ffmpeg) 的 release 页面获取，但是通常，我们会建议您运行 `prpr-avc` 目录下的 `pull-static-lib.sh` 脚本自动拉取最新的静态库文件。
## 构建
参考[prpr-avc-ffmpeg仓库](https://github.com/TeamFlos/prpr-avc-ffmpeg)工作流。