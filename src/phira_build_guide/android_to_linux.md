# 使用UserLAnd应用进行便携式构建

>**架构不一致警告！**  
>由于绝大部分嵌入式设备的处理器架构为*ARM64*架构（仅有小部分为x86或者amd64），所以不保证此方法与后面的Linux构建完美契合，请知悉。  

>**容器环境！**  
>由于是针对的非root设备编写，因此尽管这里运行的是完整的Linux发行版，但是系统初始化为*init*而不是*systemd*，也就是说，它们运行在一个proot容器中，所有关于systemctl的命令全部失效，请知悉。

>**仍有其他方法！**  
>除了UserLAnd，笔者还想到了使用Termux进行构建环境开发，而后者自带一个简单的BSD环境，也可以运行完整的Linux系统且更为简单，请知悉。

本章节讲述了如何使用UserLAnd应用构建最小Linux环境，并使用此环境进行便携式构建。

考虑到部分开发者可能没有计算机或者计算机硬件版本过旧不足以运行现有的操作系统，特写本章。

## 下载 ＆ 安装

这款应用可以在[Google Play](https://play.google.com/store/apps/details?id=tech.ula)上找到，但是国内用户由于某种问题访问肯定很困难；不过好在它在F-Droid上也有，链接[在这](https://f-droid.org/zh_Hans/packages/tech.ula/)。  
它也是个开源项目，可以点击[这里](https://github.com/CypherpunkArmory/UserLAnd)支持它。  
下载完成后直接安装就行

## 初始化配置

>软件初始化需要在Github下载发行版列表，请稍作等候。

打开应用，转到“文件系统”页面，点击右上角的“+”，新建一个Debian系统。  
文件系统名可以随便填，你喜欢啥就写啥。  
用户名只能是英文，并且还是小写。  
密码随便，VNC密码要6-8个字符。  
最后点击右上角的软盘按钮保存。  

## 建立会话

UserLAnd支持三种会话，SSH、VNC和XSDL。  

* 转到“会话”页面，点击右上角的“+”，新建一个会话。  
会话名随便，文件系统就填刚才创建的，由于我们这里系统是新建的，服务类别选ssh。  

* 点击右上角的软盘按钮保存。  

* 点击刚刚创建的会话，之后软件会下载相关的文件，由于是从Github下载，所以可能会比较慢，请耐心等待。  

## 配置软件源  

>**方法即将过期！**  
>由于较新版本的Debian采用了DEB822格式，传统编辑sources.list将失效。此文章后续将针对此格式进行更新。

输入自己设置的密码，进入系统。  
首先执行sudo apt upate进行软件源更新。

* 或者，输入以下命令使用USTC源（快速配置）：  

~~~bash
sudo sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && sudo apt update
~~~  

之后输入“sudo apt install vis -qq -y”安装vis编辑器（它和vim是一样的，你也可以用nano文本编辑器进行软件源编辑）  

之后“sudo vis /etc/apt/sources.list”，狂按“dd”清空所有内容，按"i"键进行编辑，粘贴如下内容：

~~~bash
deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free
# deb-src http://mirrors.ustc.edu.cn/debian stable main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free
# deb-src http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free

# deb http://mirrors.ustc.edu.cn/debian stable-proposed-updates main contrib non-free
# deb-src http://mirrors.ustc.edu.cn/debian stable-proposed-updates main contrib non-free
~~~

或者你也可以用清华源，但是要先输入“ sudo apt install apt-transport-https ca-certificates”回车以便拉取https源。  

以下是清华源的配置：  

~~~bash  
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stable main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ stable main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stable-updates main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ stable-updates main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stable-backports main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ stable-backports main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security stable/updates main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security stable/updates main contrib non-free
~~~

配置完成后，按Esc，键入“:wq”保存并退出。

### 配置系统语言  

输入如下命令：  

~~~bash
sudo apt install locales && sudo dpkg-reconfigure locales
~~~

之后回车几下，直到看到以下内容（或者类似）：  

~~~text
(Enter the items or ranges you want to select, separated by spaces.)

请选择需要生成的区域设置(locale)。
~~~

输入483、484、485、486，回车；之后输入6，回车。之后您便拥有了一个功能较为完备的轻型Debian GNU/Linux操作系统。

>This article is copied from [Starmoe's Blog](https://moerain.cn/2024/06/18/2022-12-30-03/), licensed under CC BY-NC 4.0.  
>To view a copy of this license, [click this link](https://creativecommons.org/licenses/by-nc/4.0/)
