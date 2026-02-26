# Android
## 构建

> <span style="color:red;">注意：此构建方案的产物**不包含成绩上传**的部分（与Windows端类似）</span> 

1. 方便起见，这里使用**Github Action**构建Android端Phira，本地构建待补充。~~才不是因为几次都失败了惹~~
2. [**Fork**](https://github.com/TeamFlos/phira/fork)官方Phira仓库，创建 `.github/workflows/`目录并在该目录下创建一个.yml文件，名称任意。
3. 在该.yml文件写入以下内容并commit，进入Action页面的Build Android Phira工作流，**请求一个workflow**（可选择构建分支），等待约5分钟，工作流即可运行完毕。**下载Artifact解压**备用。
> 如果需要armeabi-v7a架构构建，请将"arm64-v8a"，"aarch64-linux-android"分别全部**替换**为"armeabi-v7a"，"armv7-linux-androideabi"（未测试）
```yaml
name: Build Android Phira

on:
  workflow_dispatch:


env:
  CARGO_TERM_COLOR: always
  ANDROID_HOME: ${{github.workspace}}/android-sdk
  ANDROID_NDK_HOME: ${{github.workspace}}/android-ndk-r27c
  ANDROID_NDK_ROOT: ${{github.workspace}}/android-ndk-r27c

jobs:
  Build:

    runs-on: ubuntu-24.04

    steps:
    - uses: actions/checkout@v4.2.2
    
    - run: |
        sudo apt-get update
        sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev libasound2-dev libssl-dev pkg-config
        # For compatibility of release v0.6.7 and stable channel of Rust
        sed -i 's/#!\[feature(local_key_cell_methods)\]//g' prpr/src/lib.rs
        
    - name: Download static-lib
      uses: suisei-cn/actions-download-file@v1.3.0
      id: downlod-static-lib
      with:
        url: "https://teamflos.github.io/phira-docs/phira_build_guide/prpr-avc.zip"
        target: ./

    - name: Set Up static-lib
      run: |
        unzip prpr-avc.zip -d ./

    - name: Install Android SDK Tools
      run: |
        wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip
        unzip commandlinetools-linux-8512546_latest.zip -d $ANDROID_HOME
        echo y | $ANDROID_HOME/cmdline-tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} "platform-tools" "build-tools;33.0.2" "platforms;android-35"

    - name: Install Android NDK
      run: |
        wget https://googledownloads.cn/android/repository/android-ndk-r27c-linux.zip
        unzip android-ndk-r27c-linux.zip -d ${{github.workspace}}

    - name: Install Rust Toolchains
      uses: actions-rs/toolchain@v1.0.6
      with:
        toolchain: stable
        target: aarch64-linux-android
    
    - name: Build for Android
      run: |
        cd phira
        cargo install cargo-ndk
        cargo ndk -t arm64-v8a --platform 35 build --release
    
    - name: Upload Artifact
      uses: actions/upload-artifact@v4
      with:
        name: android-build
        path: |
          target/aarch64-linux-android/release/libphira.so
```


## 替换
> 由于未提供打包工具，需要我们手动替换apk下libphira.so文件

> **直接安装运行，会提示找不到quad_native.QuadNative.preprocessInput的定义**

#### 方法一：

1. 将libphira.so文件**推送到Android设备上**你熟悉的位置。

2. 从Phira官方仓库的[Release](https://github.com/TeamFlos/phira/releases)下载libphira.so对应架构的apk，用[MT管理器](https://mt2.cn/)查看。
3. 将构建出来的libphira.so**替换掉**lib/arm64-v8a（或armeabi-v7a）/**libphira.so**。

4. 用Dex编辑器++打开classes.dex，进入org，flos.phira，查看**QuadSurface**类。

5. ##### 找到153行（或其他调用preprocessInput的语句），移除这一行的内容（或注释掉）。

6. 根据MT管理器的提示，保存退出文件，重新签名。

7. 按需可选择进行apk共存操作。

#### 方法二：

##### 在phira/src/lib.rs中加入以下声明：

```Rust
#[cfg(target_os = "android")]
#[no_mangle]
pub unsafe extern "C" fn Java_quad_1native_QuadNative_preprocessInput(
    _: *mut std::ffi::c_void,
    _: *const std::ffi::c_void,
    #[allow(dead_code)] motionEvent: ndk_sys::AInputEvent,
    #[allow(dead_code)] f: ndk_sys::jfloat,
    #[allow(dead_code)] f2: ndk_sys::jfloat,
    #[allow(dead_code)] z: ndk_sys::jboolean,
    #[allow(dead_code)] z2: ndk_sys::jboolean,
) {
    
}
```

# 原理
- *特别感谢[qaqFei进行的测试](https://github.com/qaqFei/phira/tree/main)*。

