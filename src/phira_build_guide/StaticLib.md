# 静态库（prpr-avc）

> 从 [`92ec640`](https://github.com/TeamFlos/phira/commit/92ec64002598b8212849be5520cccf6701a1aa73) 起，`prpr-avc` 的构建脚本会自动获取静态库；若使用更早的代码库，请见文末「[旧代码库](#旧代码库)」一节。

## 介绍

这些文件为 Phira 解码视频（在编译期）所需的静态库，现版本静态库文件由 [此仓库](https://github.com/TeamFlos/prpr-avc-ffmpeg/) 提供。

## 获取

### 自动获取（推荐）
- `prpr-avc` 的构建脚本会在编译时自动处理：读取 `prpr-avc/ffmpeg-version` 中的版本号，若 `prpr-avc/static-lib/<目标平台>/` 下没有对应版本号的 `.version` 文件和静态库，就会自动从 prpr-avc-ffmpeg 的 [Release](https://github.com/TeamFlos/prpr-avc-ffmpeg/releases/latest) 下载并解压。只需保证能访问 GitHub Release。

### 手动获取
若自动下载失败，可手动准备：

1. 前往 [Release](https://github.com/TeamFlos/prpr-avc-ffmpeg/releases/latest) 下载对应 target 的静态库压缩包（例如 `aarch64-apple-ios.tar.gz`）。
2. 将压缩包解压到 `prpr-avc/static-lib/<target>/` 目录下（没有对应目录请自行创建）。
3. 在该目录下新建 `.version` 文件，内容写与仓库中 `prpr-avc/ffmpeg-version` 一致的版本号，否则构建脚本会判定缓存无效、仍会尝试联网下载。

## 自行构建
参考[仓库](https://github.com/TeamFlos/prpr-avc-ffmpeg)工作流。

## 旧代码库

若使用的是早于 [`92ec640`](https://github.com/TeamFlos/phira/commit/92ec64002598b8212849be5520cccf6701a1aa73) 的代码库，静态库不会自动获取，需要手动下载 prpr-avc-ffmpeg 的 [首个 Release](https://github.com/TeamFlos/prpr-avc-ffmpeg/releases/tag/20260309_v0)（`20260309_v0`）即可。