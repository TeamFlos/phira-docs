# Linux

## 准备阶段
1. 确保系统安装了cargo，可以在终端使用 `cargo -V` 检查系统是否安装了cargo，如果没有安装，请点击 [这里](./cargo.md)按步骤安装构建工具
2. 从github下载源码到本地：
    - 若您是纯终端，建议使用git工具，请使用 `git clone https://github.com/TeamFlos/phira.git` 将仓库克隆到本地。
    - 若您使用了桌面环境，您也可以在phira仓库页面点击Code按钮选择 `Download ZIP` 将代码下载到本地，随后将代码解压到本地任意目录。
    - __如果您无法连接到github，您也可以使用git加速网站提供的加速地址克隆与下载。__
    - __若您要构建指定版本的phira，请前往release页面在Assets中选择下载 `Source code(tar.gz)` 到本地，解压到任意路径即可。__
    - __警告：为了防止玄学问题，我们不建议路径中包含除了ASCII编码包含字符以外的任何字符。__
3. 静态库文件，您可以 [直接下载](./prpr-avc.zip) 或者在 [缓存站](https://www.nuanr-mxi.com/prpr-avc.zip) 下载静态库文件，下载完成后直接解压到代码根目录下，如果提示覆盖文件，请点击覆盖。
4. 构建过程需要库文件补充，输入以下命令即可：
    >sudo apt update<br>
    >sudo apt install libasound2-dev<br>
    >sudo apt install libgtk-3-dev<br>
## 开始构建
1. 打开终端，切换到代码根目录
2. 输入 `cargo build -r --bin phira-main` ，直到编译完成。
3. 复制 `.\assets\` 目录中的所有文件到 `.\target\release\assets\` ，至此，构建流程全部完成，您可以在带有桌面环境的情况下直接运行 `phira-main` 检查资源文件是否完整，若您没有桌面环境，程序将会闪退（实测WSL无法兼容，如果在WSL下运行将会闪退），至此，构建流程结束。
- __注意：在此文档编写时，代码目录下的资源文件并不完整，如果您发现主程序闪退，您可以前往release页面下载任意版本，获取资源文件__ 

## 常见问题
Q. 构建输出 `failed to connect to github`<br>
A. 请检查网络环境。<br>
Q. 构建时报错 `The pkg-config command could not be found`<br>
A. 缺失 `pkg-config` 指令，使用 `sudo apt install pkg-config -y` 安装即可。<br>
Q. 构建报错 `failed to run custom build command for alsa-sys v0.3.1`<br>
A. 缺失库文件