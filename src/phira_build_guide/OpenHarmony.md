# OpenHarmony

## 准备阶段

1. 首先需要新增ohos平台，如果你没有安装`cargo`，如果没有安装，请点击 [这里](https://rust-lang.org/learn/get-started/) 按系统安装构建工具。

更多内容可以参考 [ohos-rs](https://ohos.rs/)

```
rustup target add aarch64-unknown-linux-ohos
rustup target add armv7-unknown-linux-ohos  # 理论可以不加
rustup target add x86_64-unknown-linux-ohos # 理论可以不加，如果不在x86的模拟器运行
```

2. 你只需要下载最新的 `DevEco-Studio` 然后安装对应的 `NDK` 即可. 你可以在 [Deveco Studio (windows/macos平台)](https://developer.huawei.com/consumer/cn/deveco-studio/)或者配置[Command Line Tools(推荐Linux平台)](https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos) 找到并且下载。

下载完成之后，你需要为系统设置一个环境变量来帮助我们构建原生模块。假设你安装的 SDK 路径为 /path/Sdk，那么我们只需要设置如下的环境变量即可：

```
# 通常情况下，Windows/MacOS下的Deveco Studio已经包含了一套齐全的ndk。你只需要设置OHOS_NDK_HOME为Deveco Studio位置/sdk/default/openharmony即可。
# 这里Deveco Studio的版本不得低于6.0.0(API 20).
# MacOS示例，这里仅推荐ARM版的MacOS对本项目进行开发。
export OHOS_NDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony
# Windows的Deveco Studio sdk 示例位置。
set OHOS_NDK_HOME="C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony"
# 针对Linux平台，因为没有Deveco Studio支持，只能下载Command Line Tools。下载位置需要自行确定并且设置OHOS_NDK_HOME。
```

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

2. 静态库文件，您可以在 [ESA](https://www.nuanr-mxi.com/prpr-avc.zip) 或 [EdgeOne](https://eo.nuanr-mxi.com/prpr-avc.zip) 下载静态库文件，下载完成后直接解压到 phira 代码根目录下，如果提示覆盖文件，请点击覆盖。
   
3. 添加 `config.toml` ,配置cmake位置，此部分为编译ohos平台的phira所需要的。

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

针对 `Windows` 平台，你需要在项目的 `.cargo` 文件夹中新建 `cmake-wrapper.cmd`

`.cargo/cmake-wrapper.cmd`

我们采用临时变量的方式防止与系统默认的cmake发生冲突

```
@echo off
set PATH=D:\你的ohos sdk位置\default\openharmony\native\build-tools\cmake\bin;%PATH%
"D:/你的ohos sdk位置\default\openharmony\native\build-tools\cmake\bin\cmake.exe" %*
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
phira>cd phira #这里要进入到phira文件夹。否则会没有产物输出
phira/phira>ohrs build --release --arch aarch #可以不加--arch 参数，即默认在x86_64 armv7 arm64编译，但目前鸿蒙设备均为arm64
```

5. 构建成功之后会在 `phira/dist/<对应的arch>` 找到 `libphira.so`

6. `phira-ohos` 代码目录下不包含资源文件，你需要提前将 `assets/` 文件夹提前复制到 `entry/src/main/resources/resfile/assets` 中，如果您发现主程序黑屏，您可以前往 [release](https://github.com/TeamFlos/phira/releases)页面下载任意版本，获取缺失的资源文件并且复制到同一目录。

7. 进入 `phira-ohos` 文件夹中,将 `build-profile-nosigncfg.json5` 改成 `build-profile.json5` ，然后打开 `Deveco Studio` 。

连接设备，在 `Project Structure` 中找到 `Signing configs` 选择 `Automatically generate signature` 后点击 `Apply`，同时项目会自动触发Sync。

![](image.png)

Project Structure位置在箭头所示

复制生成的 `libphira.so` 到 `entry/libs/arm64-v8a`文件夹中。点击编译即可在ohos设备运行。


## 常见问题

如果出现非常奇怪的编译报错，请考虑移步到~~arm64的MacOS~~或者 `WSL` 平台编译。

Deveco Studio并没有Linux原生版本。