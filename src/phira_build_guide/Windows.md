# Windows

## 准备阶段

1. 确保系统安装了 cargo，可以在命令提示符（cmd）或者 PowerShell 使用 `cargo -V` 检查系统是否安装了 cargo。如果提示以下信息：
    - `'cargo' 不是内部或外部命令，也不是可运行的程序或批处理文件。`
    - `cargo : 无法将“cargo”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。`
    - 请点击 [这里](./cargo.md) 按步骤安装构建工具
2. 从 GitHub 下载源码到本地：
    - 若您安装了 git 工具，请使用 `git clone https://github.com/TeamFlos/phira.git` 将仓库克隆到本地。
    - 若您没有安装 git 工具，您也可以在 Phira 仓库页面点击 Code 按钮选择 `Download ZIP` 将代码下载到本地，随后将代码解压到本地任意目录。
    - __如果您无法连接到 GitHub，您也可以使用 git 加速网站提供的加速地址克隆与下载。__
    - __若您要构建指定版本的 Phira，请前往 release 页面在 Assets 中选择下载 `Source code(zip)` 到本地，解压到任意路径即可。__
    - __警告：为了防止玄学问题，我们不建议路径中包含除了 ASCII 编码包含字符以外的任何字符。__
3. perl，您可以在命令提示符（cmd）或者 PowerShell 使用 `perl -v` 检查系统是否安装了 perl，如果没有，请搜索并打开 `MSYS2 UCRT64` 输入 `pacman -S perl` 安装 perl
4. 静态库文件，您可以 [直接下载](./prpr-avc.zip) 静态库文件，下载完成后直接解压到代码根目录下，如果提示覆盖文件，请点击覆盖。

## 开始构建

1. 在命令提示符（cmd）或者 PowerShell 切换到代码根目录（如 `D:\phira\` ）
2. 在命令提示符（cmd）或者 PowerShell 使用 `cargo build -r --bin phira-main` ，如果不出意外，在 `openssl-sys(build)` 时，您将卡很久很久，请不要退出，这是正常的。
3. 构建完成后，在 `.\target\release\` 目录下您可以找到编译完成的主程序
4. 复制 `.\assets\` 目录中的所有文件到 `.\target\release\assets\` ，至此，构建流程全部完成，您可以直接运行 `phira-main.exe` 检查资源文件是否完整。

- __注意：在此文档编写时，代码目录下的资源文件并不完整，如果您发现主程序闪退，您可以前往 [release](https://github.com/TeamFlos/phira/releases) 页面下载任意版本，获取缺失的资源文件__

## 32位版本

1. 在命令提示符（cmd）或者 PowerShell 切换到代码根目录（如 `D:\phira\` ）
2. 下载上面的静态库文件解压到`phira\prpr-avc\static-lib`或自行构建
3. 在命令提示符（cmd）或者 PowerShell 使用 `cargo build --target=i686-pc-windows-gnu --release --package phira-main` ，如果不出意外，在 `openssl-sys(build)` 时，您将卡很久很久，请不要退出，这是正常的。
4. 构建完成后，在 `.\target\release\` 目录下您可以找到编译完成的主程序
5. 复制 `.\assets\` 目录中的所有文件到 `.\target\release\assets\` ，至此，构建流程全部完成，您可以直接运行 `phira-main.exe` 检查资源文件是否完整。

- __注意：在此文档编写时，代码目录下的资源文件并不完整，如果您发现主程序闪退，您可以前往 [release](https://github.com/TeamFlos/phira/releases) 页面下载任意版本，获取缺失的资源文件__

## 有关静态库的构建（以i686-pc-windows-gnu为例）

下载 [FFmpeg n5.1.8 源代码（GitHub）)](https://github.com/FFmpeg/FFmpeg/archive/refs/tags/n5.1.8.tar.gz) 并解压到任意目录

在sh上操作（此处使用msys2，注意要将ffmpeg源码复制到 `C:\msys64\home\您的用户名`）

```sh
cd FFmpeg-n5.1.8 && mkdir build && cd build
../configure --disable-programs --disable-doc --disable-everything --disable-debug --arch=i686 --target_os=mingw32 --cross-prefix=i686-w64-mingw32-
make
```

note:这里有个坑。。。如果报错的话尝试把 msys64\mingw32\bin 这个目录下的 i686-w64-mingw32-gcc-ar.exe , i686-w64-mingw32-gcc-nm.exe , i686-w64-mingw32-gcc-ranlib.exe 复制粘贴一份然后重命名成 i686-w64-mingw32-ar.exe , i686-w64-mingw32-nm.exe , i686-w64-mingw32-ranlib.exe

接着把build文件夹下的所有形如 `*.a` 的文件复制到 `phira\prpr-avc\static-lib\i686-pc-windows-gnu` 就可以啦

- __注意：以上操作仅能保证 cargo 正常编译并输出主程序，如需用于视频解码请自行在 configure 启用 protocol=file，decoders，parsers 等选项__

## 常见问题

Q. 报错 `failed to send request: 操作超时`

A. 请检查网络环境，确保您可以正常访问 GitHub

Q. 报错 `failed to send request: 无法解析服务器的名称或地址`

A. 检查 DNS 或更换 DNS，更换后请刷新 DNS 缓存

Q. 构建过程中报错 `error: failed to run custom build command for openssl-sys v0.9.99`

A. 缺失 perl，请检查是否正确安装 perl 后再试

Q. 构建报错`error occurred: Failed to find tool. Is gcc.exe installed? (see https://github.com/rust-lang/cc-rs#compile-time-requirements for help)`

A. 请检查是否安装了 `MSYS2` 以及检查是否配置了环境变量

Q. 出现以下报错：

> Error building OpenSSL dependencies:
>
> Command: "make" "depend"
>
> Failed to execute: program not found

A. 缺失 `make` 指令，请前往 MSYS2 终端中使用 `pacman -S make` 安装此命令。

Q. 报错包含 `This perl inplementation doesn't produce lnix like paths`

A. 使用的 `perl` 不适用于 `gcc`，请删除原有 `perl` 的环境变量或者直接卸载原有的 `perl`。

Q. 报错包含`undefined reference to libiconv`

A. 使用的 `libiconv` 有问题，请在 MSYS2 终端中使用 `pacman -S libiconv`

Q. 太麻烦了

A. 这样，直接去 [release](https://github.com/TeamFlos/phira/releases/latest) 页面下吧~~微软我真谢谢你~~
