# 旧版macOS：离线办法

这种方法允许我们从苹果下载完整的安装程序，但仅限于以下macOS版本:

* Lion (10.7)
* Mountain Lion (10.8)
* Yosemite (10.10)
* El Capitan (10.11)
* Sierra (10.12)

::: tip 提示

Mavericks(10.9)无法使用此方法。此版本参见[旧版macOS：在线办法](./mac-install-recovery.md)。

:::

要开始，请进入以下链接之一:

* [Mac OS X Lion安装程序](https://support.apple.com/kb/DL2077)
* [Mac OS X Mountain Lion安装程序](https://support.apple.com/kb/DL2076)
* [如何获得旧版本的macOS](https://support.apple.com/zh-cn/HT211683)（对于10.10 - 10.12安装程序）

下载所需的版本，应该提供.dmg文件，其中包含.pkg文件。

根据你使用的操作系统，你可以安装这个包，它会为你提供一个“安装(macOS版本)”。然后转到[设置安装程序](./mac-install.md#设置安装程序)。但是，如果您收到此错误：

![](../images/installer-guide/legacy-mac-install-md/unsupported.png)

这意味着您的SMBIOS太新了，无法本地运行该版本(即使您试图为另一台计算机制作USB，它仍然会检查)。这意味着我们需要手动提取安装程序。

### 提取安装程序

首先，获取InstallMacOSX/InstallOS.dmg并挂载:

![](../images/installer-guide/legacy-mac-install-md/mount.png)

接下来，让我们打开终端窗口并将软件包解压缩到桌面上的一个文件夹中。这可能需要一段时间。

* 对于Lion和Mountain Lion:

```sh
cd ~/Desktop
pkgutil --expand-full "/Volumes/Install Mac OS X/InstallMacOSX.pkg" OSInstaller
```

* 对于Yosemite和El Capitan:

```sh
cd ~/Desktop
pkgutil --expand-full "/Volumes/Install OS X/InstallMacOSX.pkg" OSInstaller
```

* 对于Sierra:

```sh
cd ~/Desktop
pkgutil --expand-full "/Volumes/Install macOS/InstallOS.pkg" OSInstaller
```

接下来，运行以下命令(一次一个):

* Lion:

```sh
cd OSInstaller/InstallMacOSX.pkg
mv InstallESD.dmg "Payload/Install Mac OS X Lion.app/Contents/SharedSupport/"
mv "Payload/Install Mac OS X Lion.app" /Applications
```

* Mountain Lion:

```sh
cd OSInstaller/InstallMacOSX.pkg
mv InstallESD.dmg "Payload/Install OS X Mountain Lion.app/Contents/SharedSupport/"
mv "Payload/Install OS X Mountain Lion.app" /Applications
```

* Yosemite:

```sh
cd OSInstaller/InstallMacOSX.pkg
mv InstallESD.dmg "Payload/Install OS X Yosemite.app/Contents/SharedSupport/"
mv "Payload/Install OS X Yosemite.app" /Applications
```

* El Capitan:

```sh
cd OSInstaller/InstallMacOSX.pkg
mv InstallESD.dmg "Payload/Install OS X El Capitan.app/Contents/SharedSupport/"
mv "Payload/Install OS X El Capitan.app" /Applications
```

* Sierra:

```sh
cd OSInstaller/InstallOS.pkg
mv InstallESD.dmg "Payload/Install macOS Sierra.app/Contents/SharedSupport/"
mv "Payload/Install macOS Sierra.app" /Applications
```

### 完成后，您可以转到[设置安装程序](./mac-install.md#设置安装程序)
