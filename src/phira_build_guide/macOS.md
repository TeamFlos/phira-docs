# macOS

## 准备阶段

1. 确保系统安装了 cargo 和 Xcode，可以在终端使用 `cargo -V` 检查系统是否安装了 cargo，如果没有安装，请点击 [这里](./cargo.md) 按步骤安装构建工具
2. 从 GitHub 下载源码到本地：
    - 使用 git 工具，在终端输入 `git clone https://github.com/TeamFlos/phira.git` 将仓库克隆到本地。
    - 您也可以在 Phira 仓库页面点击 Code 按钮选择 `Download ZIP` 将代码下载到本地，随后将代码解压到本地任意目录。
    - __如果您无法连接到 GitHub，您也可以使用 git 加速网站提供的加速地址克隆与下载。__
    - __若您要构建指定版本的 Phira，请前往 [release](https://github.com/TeamFlos/phira/releases) 页面在 Assets 中选择下载 `Source code (tar.gz)` 到本地，解压到任意路径即可。__
    - __警告：为了防止玄学问题，我们不建议路径中包含除了 ASCII 编码包含字符以外的任何字符。__
3. 静态库文件，您可以 [直接下载](./prpr-avc.zip) 静态库文件，下载完成后直接解压到代码根目录下，如果提示覆盖文件，请点击覆盖。

## 开始构建

1. 打开终端，切换到代码根目录
2. 输入 `cargo build -r --bin phira-main` ，直到编译完成。
3. 复制 `.\assets\` 目录中的所有文件到 `.\target\release\assets\` ，至此，构建流程全部完成，您可以直接运行 `phira-main` 检查资源文件是否完整。

- __注意：在此文档编写时，代码目录下的资源文件并不完整，如果您发现主程序闪退，您可以前往 [release](https://github.com/TeamFlos/phira/releases) 页面下载任意版本的 Windows 或 Linux 压缩包，获取缺失的资源文件__

## 常见问题

Q. 构建输出 `failed to connect to GitHub`

A. 请检查网络环境，或者把 [prpr-miniquad](https://github.com/Mivik/prpr-miniquad)，[prpr-macroquad](https://github.com/Mivik/prpr-macroquad)，[sasa](https://github.com/Mivik/sasa)，[phira-mp](https://github.com/TeamFlos/phira-mp) 的源代码逐一下载到本地并在 `Cargo.toml` 指定上述 crates 的 path（如 `prpr-miniquad = { path = "../../prpr-miniquad" }`） 然后重新构建

其余，请补充