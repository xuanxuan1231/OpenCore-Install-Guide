# 创建USB

需要的东西

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)，强烈建议运行调试版本以显示更多信息
* [ProperTree](https://github.com/corpnewt/ProperTree) 编辑.plist文件(OpenCore Configurator是另一个工具，但严重过时，Mackie版本以损坏而闻名。**请不惜一切代价避免使用这些工具!**).
* 如果您希望使用OpenCore作为主要引导加载程序，则必须将Clover从系统中完全删除。保留一个基于Clover的EFI备份。请看这里需要清理的地方:[Clover转换](https://github.com/xuanxuan1231/OpenCore-Install-Guide/tree/master/clover-conversion)

### 在线vs离线安装程序

离线安装程序有一个完整的macOS副本，而在线安装程序只有一个恢复映像(约500MB)，一旦启动，它就会从苹果服务器下载macOS。

* 离线
  * 只能在macOS上制作
  * Windows/Linux没有完整安装程序所需的APFS/HFS驱动程序
* 在线
  * 可以在macOS/Linux/Windows上制作
  * 需要通过目标机器上的macOS支持的网络适配器进行internet连接

### 制作安装程序

根据你使用的操作系统，请参见制作USB的具体部分:

* [macOS用户](../installer-guide/mac-install.md)
  * 支持OS X 10.4到当前版本
  * 支持传统和UEFI安装
* [Windows用户](../installer-guide/windows-install.md)
  * 支持OS X 10.7到当前版本
  * 仅在线安装程序
  * 支持传统和UEFI安装
* [Linux用户（UEFI）](../installer-guide/linux-install.md)
  * 支持OS X 10.7到当前版本
  * 仅在线安装程序
  * 适用于支持UEFI引导的机器
