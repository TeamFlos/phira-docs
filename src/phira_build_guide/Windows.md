# Windows

## 准备阶段

1. 确保系统安装了cargo，可以在命令提示符（cmd）或者PowerShell使用 `cargo -V` 检查系统是否安装了cargo。如果提示以下信息：<br>
    - `'cargo' 不是内部或外部命令，也不是可运行的程序或批处理文件。`<br>
    - `cargo : 无法将“cargo”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。`<br>
    - 请点击 [这里](./cargo.md) 按步骤安装构建工具<br>

2. 从github下载源码到本地：<br>
    - 若您安装了git工具，请使用 `git clone https://github.com/TeamFlos/phira.git` 将仓库克隆到本地。<br>
    - 若您没有安装git工具，您也可以在phira仓库页面点击Code按钮选择 `Download ZIP` 将代码下载到本地，随后将代码解压到本地任意目录。<br>
    - __如果您无法连接到github，您也可以使用git加速网站提供的加速地址克隆与下载。__
    - __若您要构建指定版本的phira，请前往release页面在Assets中选择下载 `Source code(zip)` 到本地，解压到任意路径即可。__<br>
    - __警告：为了防止玄学问题，我们不建议路径中包含除了ASCII编码包含字符以外的任何字符。__
3. perl，您可以在命令提示符（cmd）或者PowerShell使用 `perl -v` 检查系统是否安装了perl，如果没有，请搜索并打开 `MSYS2 UCRT64` 输入 `pacman -S perl` 安装perl

4. 静态库文件，您可以 [直接下载](./prpr-avc.zip) 或者在 [缓存站](https://www.nuanr-mxi.com/prpr-avc.zip) 下载静态库文件，下载完成后直接解压到代码根目录下，如果提示覆盖文件，请点击覆盖。
## 开始构建

1. 在命令提示符（cmd）或者PowerShell切换到代码根目录（如 `D:\phira\` ）<br>
2. 在命令提示符（cmd）或者PowerShell使用 `cargo build -r --bin phira-main` ，如果不出意外，在 `openssl-sys(build)` 时，您将卡很久很久，请不要退出，这是正常的。
3. 构建完成后，在 `.\target\release\` 目录下您可以找到编译完成的主程序
4. 复制 `.\assets\` 目录中的所有文件到 `.\target\release\assets\` ，至此，构建流程全部完成，您可以直接运行 `phira-main.exe` 检查资源文件是否完整。
- __注意：在此文档编写时，代码目录下的资源文件并不完整，如果您发现主程序闪退，您可以前往release页面下载任意版本，获取资源文件__ 

## 常见问题
Q. 报错 `failed to send request: 操作超时`<br>
A. 请检查网络环境，确保您可以正常访问github<br>
Q. 报错 `failed to send request: 无法解析服务器的名称或地址`<br>
A. 检查DNS或更换DNS，更换后请刷新DNS缓存<br>
Q. 构建过程中报错 `error: failed to run custom build command for openssl-sys v0.9.99`<br>
A. 缺失perl，请检查是否正确安装perl后再试<br>
Q. 构建报错`error occurred: Failed to find tool. Is gcc.exe installed? (see https://github.com/rust-lang/cc-rs#compile-time-requirements for help)`<br>
A. 请检查是否安装了 `MSYS2` 以及检查是否配置了环境变量<br>
Q. 出现以下报错：<br>
>Error building OpenSSL dependencies:<br>
>Command: "make" "depend"<br>
>Failed to execute: program not found<br>

A. 缺失 `make` 指令，请前往MSYS2终端中使用 `pacman -S make` 安装此命令。<br>
Q. 报错包含 `This perl inplementation doesn't produce lnix like paths`<br>
A. 使用的perl不适用于gcc，请删除原有perl的环境变量或者直接卸载原有的perl。<br>
Q. 太麻烦了<br>
A. 这样，直接去release页面下吧~~微软我真谢谢你~~
