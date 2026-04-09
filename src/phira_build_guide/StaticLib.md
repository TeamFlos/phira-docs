# 静态库（prpr-avc）

## 介绍
- 此文件为 Phira 使用的用于解码视频的静态库，现版本静态库文件由 [此仓库](https://github.com/TeamFlos/prpr-avc-ffmpeg/) 提供。
- Phira 引用的静态库 FFmpeg 版本无需非常严格。
## 构建
参考[prpr-avc-ffmpeg仓库](https://github.com/TeamFlos/prpr-avc-ffmpeg)工作流。
## 获取

## 在有bash的系统环境下
- 在克隆的仓库目录中，`cd` 到 `prpr-avc` 目录下，执行 `bash pull-static-lib.sh` 即可拉取静态库文件。

## 在没有bash的系统环境下
- 前往 [release](https://github.com/TeamFlos/prpr-avc-ffmpeg/releases/latest) 下载对应需要 target 的静态库压缩包文件。
- 将压缩包中的文件解压到 `prpr-avc\static-lib\%TARGET%` 目录下即可，没有对应目录请自行创建。