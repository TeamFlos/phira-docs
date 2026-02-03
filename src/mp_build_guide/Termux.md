# __安卓搭建Phira多人游戏服务器__

## __直接使用已编译程序__

1. 首先[下载ZeroTermux](https://github.com/hanxinhao000/ZeroTermux/releases/tag/ZeroTermux-0.118.3.53)并安装（Termux也可以）。
2. 执行 apt update && apt upgrade 更新库
3. 前往[Phira下载站](https://phira.dmocken.top/mulity)复制预编译的程序链接
4. 执行 ```wget [链接]```下载已经预编译的文件
5. 执行 \./phira\-mp\-server  或 RUST\_LOG=debug \./phira\-mp\-server 开启服务端。第二个区别于第一个多了日志显示。
6. 如需自定义运行端口请在命令后添加 \-\-port \[端口号\]  例如``` RUST_LOG=debug ./phira-mp-server --port 11451```。
7. 需要映射到公网请自行配置内网穿透。

## __自行编译Phira服务器__

1. 首先下载[下载ZeroTermux](https://github.com/hanxinhao000/ZeroTermux/releases/tag/ZeroTermux-0.118.3.53)并安装（Termux也可以）。
2. 打开ZeroTermux，同意协议后在左上侧屏幕边缘向右滑动，点击切换源——清华源进行安装,出现选择Y/I/N/O/D/Z选项时直接回车，大概5\-6次。
3. 运行 ```pkg install rust```安装rust。
4. 输入 ```pkg install pkg-config```安装pkg\-config。
5. 运行``` pkg install git```安装git工具
6. 运行```git https://github.com/TeamFlos/phira-mp.git```获取仓库内容，如有需要请使用代理进行下载
7. 运行``` chmod -c 755 phira-mp``` 分配文件夹。
8. 运行``` cd phira-mp``` 定位至文件夹。
9. 运行 ```cargo update```更新cargo。
10. 运行 ```cargo build --release -p phira-mp-server```进行下载编译，或直接通过``` cargo run```运行代码。
11. 编译完成的可执行文件在```/phira-mp/target/release```

## __如何重新开启服务器__

- 进入ZeroTermux后找到编译好的phira-mp-server，使用已编译版本的正常运行```./phira-mp-server```即可正常启动；若为自行编译的，编译的文件一般在```/phira-mp/target/release```文件夹下。

## __常见问题__

1. 若执行编译步骤时出现：warning: spurious network error \(3 tries remaining\): \[55\] Failed sending data to the peer \(HTTP/2 stream 105 was not closed cleanly before end of the underlying connection\) 可开启VPN重新执行编译步骤即可。
2. 编译步骤耗时较长，建议提前设置好系统网络。
3. 如果文档内容有误，请在[Phira官方](https://pd.qq.com/s/ezgv3q71g)QQ频道联系@Dmockenm，或前往[问题反馈](https://phira.dmocken.top/report)提交反馈。

[Phira常见问题（持续更新）](/help/)
