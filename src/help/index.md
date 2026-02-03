# Phira常见问题自助文档

__这里是由Phira答疑志愿者编写的《Phira常见问题自助文档》。在您游玩Phira前，请您认真阅读并且同意来自Phira官方的[《服务条款》](https://phira.moe/terms-of-use)与[《隐私政策》](https://phira.moe/privacy-policy)。__

以下是v0.6.7.1更新内容：

- 设置界面添加缓存管理功能
- 本地化优化
- 优化 RPE 文字支持
- 修复部分情况下黑屏 bug

__本文档问题请在[Phira官方](https://pd.qq.com/s/ezgv3q71g)QQ频道联系@Dmockenm，或前往[问题反馈](https://phira.dmocken.top/report)提交反馈。__

# 开始前，你需要准备：

1. 一部游玩的设备（安卓如需使用在线服务请至少Android 7及以上，苹果设备至少iOS12及以上）。
2. 一个个人邮箱
3. 了解一定的知识——如：ipa为iOS的应用程序安装包，此包需要进行签名使用；apk为安卓设备/鸿蒙设备的应用程序安装包，分为32位和64位，根据自己的设备实际情况下载。以及手机存储路径等。

# 安卓下载看这里

1. 国内下载源：
   - [好游快爆](https://www.3839.com/a/154061.htm)（需实名认证，官方授权）、
   - [Dmocken的Phira下载站](https://phira.dmocken.top)（第三方，国内）、
   - [Puremoon下载站](https://pmnet.work/)（第三方，国内）
   下载最新版本APK即可。
2. 国外下载源:
   - [Github](https://github.com/TeamFlos/phira/releases)
3. 如出现设备不支持、CPU不兼容，或者提示安装失败，请下载**32位版本**进行安装。
4. 64位版本兼容大部分安卓/鸿蒙设备，**暂无Harmony NEXT专用侧载安装包**。

# iOS下载看这里

1. (推荐)非中国大陆地区的苹果账户可以在 App Store 中搜索并下载 Phira，前往[APP Store](https://apps\.apple\.com/us/app/phira/id6447435864)。
2. 通过ipa侧载安装，安装包下载链接：
   [官方GitHub](https://github.com/F-Unction/phira_ipa/releases)（国外源）、 [Dmocken的Phira下载站](https://phira.dmocken.top)（第三方，国内）
3. iOS侧载安装方式需要电脑，或者需要巨魔等越狱工具，[查看教程](https://zhuanlan.zhihu.com/p/11349191286)。
4. 如果出现“未受信任的企业开发者“弹窗，可以去设置\-通用\-VPN\-信任开发者进行信任。；若出现“需要启用开发者模式”，请先前往设置打开“开发者模式。

# 相关问题合集：

###  __关于[《服务条款》](https://phira.moe/terms-of-use)与[《隐私政策》](https://phira.moe/privacy-policy)：__

- [《服务条款》](https://phira.moe/terms-of-use)与[《隐私政策》](https://phira.moe/privacy-policy)是您必须要了解并且同意的，若您不同意Phira有权不向您提供服务。
- 在您阅读[《服务条款》](https://phira.moe/terms-of-use)与[《隐私政策》](https://phira.moe/privacy-policy)后，弹窗会自动消失，即默认代表您已经完成阅读且同意条款内的内容。

### __账号注册及密码相关问题：__

- 注册后请及时查看邮箱，会有一封验证邮件发过来，没发过来请检查垃圾箱或者刷新。
- 邀请链接在收到的10分钟内进去提示“无效的激活码”，可能是系统bug，此时请到Phira中使用您注册的账号密码尝试能否成功登录。
- 如需修改密码请前往：[重置密码](https://phira.5wyxi.com/reset-password)，点击链接输入邮箱后，会向邮箱发送修改密码的链接，进入即可修改密码。输入邮箱后白屏是bug，如果在5分钟内没有收到重置密码链接，请尝试再次提交重置密码请求。
  - ⚠️：若出现邮箱内链接无法访问的情况，请将链接开头的```api.phira.cn```换成```phira.5wyxi.com```。

### __在线服务相关问题：__

- 谱面加载、下载错误检查自己的软件版本是否为最新版本（0\.6\.7\.1）如果为最新版本则为服务器问题，或者是访问频繁被限制，过段时间就好力。
- 谱面成绩若无法成功上传，提示：！尚在上传成绩  意为服务器目前网络不良，若不在意成绩建议开启离线模式游玩。
- 针对近期谱面出现无法下载（一长串报错），或下载速度缓慢可以尝试以下办法：
  ```
  等1小时后再上线
  切换网络（WiFi切换为数据流量）
  游戏内打开不安全模式并重启游戏
  开启飞行模式，或重启设备
  切换网络运营商
  使用网络代理工具
  等待服务器恢复访问
  ```

### __多人联机服务相关问题：__
   
   - Phira官方联机服务器（mp2.phira.cn:12345）目前暂时不可用。
   - 目前有第三方监控站用于收集多人游戏服务器地址，[前往监测站](https://status.dmocken.top)
   - 我们支持并且建议个人开设私服进行多人联机，详见[官方GitHub](https://github.com/TeamFlos/phira-mp)
   - 如需获取即开即用的已编译服务器文件，请前往：[多人游戏服务端](https://phira.dmocken.top/mulity)
   - [安卓搭建Phira多人游戏服务器教程](/mp_build_guide/Termux)
   - [Windows搭建Phira多人游戏服务器教程](/mp_build_guide/Windows)
   - [Linux服务端部署教程](/mp_build_guide/Linux)。
### __关于设备使用断触问题：__
   
   - iOS：请开启引导式访问。
   - 安卓：请放入系统自带的游戏空间内，或关闭所有多指手势等辅助型功能。
   - 通用问题：激进优化关闭/低画质开启；设备温度过高导致 CPU 降频，影响设备性能。设备屏幕过脏，影响设备触控。若还是断触请检查屏幕是否支持多指触控。
### __资源包相关问题：__
   
   - 资源包（皮肤和谱面）导入的是zip文件，不需要解压喔。
   - 资源包下载站：[prprBlog](https://prprblog.kevin2106.top/)（如果无法访问需要使用特殊网络环境）
   - QQ频道[Phira资源包制作分享](https://pd.qq.com/s/blwfryimz)
   - （安卓）QQ群文件下载的文件保存的地址：Android/data/com\.tencent\.mobileqq/Tencent/QQfile\_recv
   - 资源包导入（iOS）：Testflight安装可直接导入，ipa（自签）安装的Phira会有很多设备/很大概率，不能导入文件（如：本地谱面导入/资源包导入/头像导入等都均会失效）。
   - 资源包导入位置在主页——资源包——左边加号；谱面导入位置在游玩——右上角“导入”。；或将zip压缩包打开方式选为“Phira（资源包）”，若出现紫色标题、白色界面的情况，尝试在文件管理内使用Phira（资源包）方式打开zip压缩包即可导入
   - **注意⚠️：《Phigros官方资源包》 的版权属于鸽游公司，Phira并不拥有其使用权，已停止提供，也请各位玩家尊重版权，不要随意传播。**
### __自制谱面相关问题：__
   
   - 如果想要找特定歌曲的自制谱，最快的方式是在b站搜索并在谱面作者的引导下下载；
   - 自制谱上传：上传谱面前，请确保您已认真并完整阅读、知晓且同意[Phira谱面上传须知](https://docs.qq.com/doc/DU2dUaEt5WnFJV2Zh)、[Phira谱面内容机制(谱师须知)](https://docs.qq.com/doc/DU1dISHdEb0NuYVpB)中的所有条款及内容！另外，**有关Phigros所有独占曲/原创曲绘/谱面/官谱加强谱面等都禁止上传，违者可能会被封禁帐号。**
   - 非独占曲上传请勿使用原创曲绘，保证谱面思路与官谱不一致即可上传，如有其他问题，谱面上传须知内有详细介绍。
   - 为保护游戏内谱面、立绘的版权，Windows、Linux无法使用剧情谱面、无法加载立绘。
### __Phira的官方联系渠道__
   
   - QQ群：
     
     - 1群：`688798221`（已满）
     - 2群：`738179721`（已满）
     - 3群：`874761842`（会不定期清理Lv\.1人员）
   - QQ频道名称：Phira
     
     - 频道邀请链接: [https://pd.qq.com/s/ezgv3q71g](https://pd.qq.com/s/ezgv3q71g)
     - 频道号：r48eajexth
   - Telegram名称：[Phira](https://t\.me/phira\_official)
   - Discord名称：[Phira Official](https://discord.gg/9fH8UA9DgR)
   - 哔哩哔哩官方账号：[Phira官方](https://space\.bilibili\.com/3493259571628094)
   - 官方网站：[https://phira.moe](https://phira.moe)