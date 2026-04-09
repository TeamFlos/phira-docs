# OpenHarmony

## 准备阶段

1. 首先需要新增 ohos 平台，如果你还没有安装 `cargo`，请点击 [这里](https://rust-lang.org/learn/get-started/) 按系统安装构建工具。

更多内容可以参考 [ohos-rs](https://ohos.rs/)

```
rustup target add aarch64-unknown-linux-ohos
rustup target add armv7-unknown-linux-ohos  # 理论可以不加
rustup target add x86_64-unknown-linux-ohos # 理论可以不加，如果不在x86的模拟器运行
```

2. 你只需要下载最新的 `DevEco-Studio` 然后安装对应的 `NDK` 即可。你可以在 [DevEco Studio (Windows/macOS 平台)](https://developer.huawei.com/consumer/cn/deveco-studio/) 或者配置 [Command Line Tools（推荐 Linux 平台）](https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos) 找到并且下载。

下载完成之后，你需要为系统设置一个环境变量来帮助我们构建原生模块。假设你安装的 SDK 路径为 /path/Sdk，那么我们只需要设置如下的环境变量即可：

| 平台 | NDK 路径 | 环境变量设置方法 |
|------|----------|------------------|
| **MacOS** | `/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony` | 在终端执行：<br>`export OHOS_NDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony`<br>建议添加到 `~/.zshrc` 或 `~/.bash_profile` 使其永久生效 |
| **Windows** | `C:/Program Files/Huawei/DevEco Studio/sdk/default/openharmony` | 1. 打开系统环境变量设置<br>2. 新建系统变量 `OHOS_NDK_HOME`<br>3. 变量值填入上述路径<br>或 PowerShell 临时设置：<br>`$env:OHOS_NDK_HOME="C:/Program Files/Huawei/DevEco Studio/sdk/default/openharmony"` |
| **Linux** | 下载 Command Line Tools 后的自定义路径 | 在终端执行：<br>`export OHOS_NDK_HOME=/your/download/path/openharmony`<br>建议添加到 `~/.bashrc` 或 `~/.profile` 使其永久生效 |

> **注意**：`Deveco Studio` 或 `Command Line Tools` 版本不得低于 6.0.0 (API 20)。MacOS 仅推荐 ARM 版进行开发。

3. 安装ohrs

```
cargo install ohrs
```

## 开始构建

1. 首先克隆代码。

```
git clone https://github.com/TeamFlos/phira
git clone https://github.com/TeamFlos/phira-ohos
```

2. 静态库文件：参阅[静态库](./StaticLib.md#获取)页。

3. 添加 `config.toml`，配置 cmake 位置，此部分为编译 ohos 平台的 phira 所需要的。

```
$ cd phira
```

针对 `Linux` 平台

`.cargo/config.toml`

```
[env]
CMAKE = "/你的ohos sdk位置/command-line-tools/sdk/default/openharmony/native/build-tools/cmake/bin/cmake"
CMAKE_TOOLCHAIN_FILE_aarch64-unknown-linux-ohos = "/你的ohos sdk位置/command-line-tools/sdk/default/openharmony/native/build/cmake/ohos.toolchain.cmake"
CMAKE_GENERATOR = "Ninja"
CMAKE_MAKE_PROGRAM = "/你的ohos sdk位置/command-line-tools/sdk/default/openharmony/native/build-tools/cmake/bin/ninja"
OHOS_NDK_HOME = "/你的ohos sdk位置/command-line-tools/sdk/default/openharmony"
```

针对 `Windows` 平台，你需要在项目的 `.cargo` 文件夹中新建 `cmake-wrapper.cmd`，我们采用临时变量的方式防止与系统默认的cmake发生冲突

`.cargo/cmake-wrapper.cmd`

```
@echo off
set PATH=D:/你的ohos sdk位置/default/openharmony/native/build-tools/cmake/bin;%PATH%
"D:/你的ohos sdk位置/default/openharmony/native/build-tools/cmake/bin/cmake.exe" %*
```


`.cargo/config.toml`

```
[env]
CMAKE = "你的项目位置/.cargo/cmake-wrapper.cmd"
CMAKE_TOOLCHAIN_FILE_aarch64-unknown-linux-ohos = "D:/你的ohos sdk位置/default/openharmony/native/build/cmake/ohos.toolchain.cmake"
CMAKE_GENERATOR = "Ninja"
CMAKE_MAKE_PROGRAM = "D:/你的ohos sdk位置/default/openharmony/native/build-tools/cmake/bin/ninja.exe"
```

4. 开始构建

```
phira> cd phira  # 这里要进入到 phira 文件夹，否则会没有产物输出
phira/phira> ohrs build --release --arch aarch  # 可以不加 --arch 参数，即默认在 x86_64、armv7、arm64 编译，但目前鸿蒙设备均为 arm64
```

5. 构建成功之后会在 `phira/dist/<对应的arch>` 找到 `libphira.so`

6. `phira-ohos` 代码目录下不包含资源文件，你需要提前将 `assets/` 文件夹复制到 `entry/src/main/resources/resfile/assets` 中。如果您发现主程序黑屏，可以前往 [Release](https://github.com/TeamFlos/phira/releases) 页面下载任意版本，获取缺失的资源文件并复制到同一目录。

7. 进入 `phira-ohos` 文件夹中，将 `build-profile-nosigncfg.json5` 改成 `build-profile.json5`，然后打开 `DevEco Studio`。

连接设备，在 `Project Structure` 中找到 `Signing configs`，选择 `Automatically generate signature` 后点击 `Apply`，同时项目会自动触发 Sync。

![](image.png)

Project Structure 位置如箭头所示

复制生成的 `libphira.so` 到 `entry/libs/arm64-v8a` 文件夹中。点击编译即可在 ohos 设备运行。


## 常见问题

如果出现非常奇怪的编译报错，请考虑移步到 ~~arm64 的 MacOS~~ 或者 `WSL` 平台编译。

DevEco Studio 并没有 Linux 原生版本。