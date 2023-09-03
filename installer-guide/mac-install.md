
# 在macOS上创建安装程序

虽然你不需要重新安装macOS来使用OpenCore，但有些用户更喜欢在启动管理器升级时使用新的版本。

首先，我们需要一个macOS的拷贝。如果你只是制作一个可引导的OpenCore而不是安装程序，你可以跳过这个步骤，直接格式化USB。对于其他人，你可以从App Store下载macOS，也可以使用Munki的脚本。

> 译者注：本指南中所有的安装程序都称为`Install macOS.app`，而非`安装macOS.app`。

## 下载现代macOS

此方法允许您下载macOS 10.13及更新版本，10.12及更早版本请参见[下载旧版macOS](#下载旧版macos)。

* **macOS 12及以上注释**:由于最近的macOS版本引入了对USB堆栈的更改，建议您在安装macOS之前映射USB端口(使用USBToolBox)。
  * <span style="color:red"> 警告： </span> 在macOS 11.3及更新版本中，[XhciPortLimit被损坏导致启动循环](https://github.com/dortania/bugtracker/issues/162)。
    * 如果你已经[映射你的USB端口](https://xuanxuan1231.github.io/OpenCore-Post-Install/usb/)并禁用`XhciPortLimit`，你在启动macOS 11.3+时不会出现问题。

从一台符合你想要安装的操作系统版本要求的macOS机器，直接进入App Store:

* [使用App Store](#使用app-store)

对于需要特定操作系统版本或无法从App Store下载的机器:

* [命令行软件更新实用程序,](#命令行软件更新实用程序)
* [Munki的InstallInstallMacOS实用程序](#munki的installinstallmacos实用程序)

## 使用App Store

从一台符合你想要安装的操作系统版本要求的macOS机器上，直接到App Store下载所需的操作系统版本，然后继续[**设置安装程序**](#设置安装程序)。

## 命令行软件更新实用程序

打开终端窗口，复制粘贴下面的命令:

```sh
softwareupdate --list-full-installers;echo;echo "请输入你想下载的版本号:";read;$(if [ -n "$REPLY" ]; then; echo "softwareupdate --fetch-full-installer --full-installer-version "$REPLY; fi);
```

![](../images/installer-guide/mac-install-md/commandlinesoftwareupdateutility.png)

这将为您提供一个可供选择的可用版本列表。
一旦下载，它将保存在您的应用程序文件夹。
您可以继续[**设置安装程序**](#设置安装程序)。

## Munki的InstallInstallMacOS实用程序

::: details 运行macOS Monterey 12.3或以上版本的用户注意事项

从macOS Monterey 12.3开始，Apple取消了对' python2.7 '的支持。因此没有它，`installinstallmacos.py`将抛出以下错误:

```
This tool requires the Python xattr module. Perhaps run 'pip install xattr' to install it.
```

为了解决这个问题，我们建议安装`Command Line Tools for Xcode`，在终端中运行`xcode-select --install`，然后运行`pip3 install xattr`。

之后，你可以运行下面相同的命令，但使用`python3`而不是`python`:

```sh
mkdir -p ~/macOS-installer && cd ~/macOS-installer && curl https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py && sudo python3 installinstallmacos.py
```
  
:::

为了运行它，只需在终端窗口中复制并粘贴下面的命令:

```sh
mkdir -p ~/macOS-installer && cd ~/macOS-installer && curl https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py && sudo python installinstallmacos.py
```

![](../images/installer-guide/mac-install-md/munki.png)

正如你所看到的，我们得到了一个很好的macOS安装程序列表。如果你需要一个特定版本的macOS，你可以通过输入旁边的数字来选择它。在这个例子中，我们选择10：

![](../images/installer-guide/mac-install-md/munki-process.png)

这将需要一段时间，因为我们正在下载整个8GB以上的macOS安装程序，所以强烈建议你在等待的同时阅读指南的其余部分。

完成后，您会在`~/macOS-Installer/`文件夹中发现一个包含macOS安装程序的DMG。这里以名为`Install_macOS_11.1-20C69.dmg`的安装程序为例。挂载它，您将找到安装应用程序。

* 注意:我们建议将`安装macOS.app`放到`/Applications`文件夹中，因为我们将从那里执行命令。
* 注意2:在访达中运行Cmd+Shift+G将允许您轻松跳转到`~/macOS-installer`

![](../images/installer-guide/mac-install-md/munki-done.png)

![](../images/installer-guide/mac-install-md/munki-dmg.png)

从这里，跳转到[设置安装程序](#设置安装程序)完成您的工作。如果您想检查下载的完整性，您可以检查[这个校验和存储库](https://github.com/notpeter/apple-installer-checksums)，但请注意，这些是众包校验和，可能不是检查真实性的可靠方法。

## 下载旧版macOS

* This method allows you to download much older versions of OS X, currently supporting all Intel versions of OS X(10.4 to current)

  * [旧版macOS：离线办法](./mac-install-pkg.md)
    * 支持10.7-10.12，不包括10.9
  * [旧版macOS：在线办法](./mac-install-recovery.md)
    * 支持10.7-11
  * [旧版macOS：磁盘映像](./mac-install-dmg.md)
    * 支持10.4-10.6

## 设置安装程序

现在我们将格式化USB，为macOS安装程序和OpenCore做准备。我们希望使用带有GUID分区映射的macOS日志式(HFS+)。这将创建两个分区:主分区`MyVolume`和第二个名为`EFI`的分区，它用作引导分区，固件将在其中检查引导文件。

* 注1:格式化USB创建的“EFI”分区是隐藏的。直到当[设置OpenCore的EFI环境](#设置opencore的efi环境)时你挂载它
* 注2:默认情况下，磁盘实用程序只显示分区-按Cmd/Win+2显示所有设备(或者你可以按视图按钮)
* 注3:遵循`旧版macOS：在线办法`部分的用户可以跳转到[设置OpenCore的EFI环境](#设置opencore的efi环境)

![格式化USB](../images/installer-guide/mac-install-md/format-usb.png)

接下来运行[Apple](https://support.apple.com/zh-cn/HT201372)提供的`createinstallmedia`命令。请注意，该命令是为格式化后的名称为`MyVolume`的USB准备的（如果是其他盘符，请替换掉`/Volumes/MyVolime`中的`MyVolume`）:

```sh
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

::: details Apple Silicon上安装比Big Sur更老的macOS的用户的注意事项

如果`createinstallmedia`出现`zsh: killed`或`killed: 9`失败，那么很可能是安装程序的代码签名有问题。要解决这个问题，可以运行以下命令:

```sh
cd /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/
codesign -s - -f --deep /Applications/Install\ macOS\ Big\ Sur.app
```

你需要安装Xcode的命令行工具:

```sh
xcode-select --install
```

:::

这需要一些时间，所以你可能想喝杯咖啡或继续阅读指南(公平地说，你真的不应该在没有阅读全文的情况下一步一步地遵循本指南)。

您还可以将`createinstallmedia`路径替换为安装程序所在的路径(与驱动器名称相同)。

::: details 遗留的createinstallmedia命令

摘自苹果自己的网站:[如何为macOS创建一个可启动的安装程序](https://support.apple.com/zh-cn/HT201372)

```sh
# Ventura
sudo /Applications/Install\ macOS\ Ventura.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Monterey
sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Big Sur
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Catalina
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Mojave
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# High Sierra
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Sierra
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ macOS\ Sierra.app

# El Capitan
sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app

# Yosemite
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Yosemite.app

# Mavericks
sudo /Applications/Install\ OS\ X\ Mavericks.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Mavericks.app --nointeraction
```

:::

## 遗留的设置
对于不支持UEFI引导的系统，请参见以下内容:

::: details 设置旧启动

首先，您需要以下内容:

* BootInstall_IA32.tool或BootInstall_X64.tool
  * 这可以在OpenCorePkg下的`/utilities/LegacyBoot/`中找到。
* 安装USB(上面创建的)

在你的OpenCore构建文件夹中，导航到`Utilities/LegacyBoot`。在这里你会发现一个名为`BootInstall_ARCH.tool`的文件。它的作用是将DuetPkg安装到所需的驱动器上。

![BootInstall位置](../images/extras/legacy-md/download.png)

现在在终端**中使用sudo**运行这个工具(否则这个工具可能会失败):

```sh
# 如果您有32位CPU，请将X64替换为IA32
sudo ~/Downloads/OpenCore/Utilities/legacyBoot/BootInstall_X64.tool
```

![磁盘选择/写入新的MBR](../images/extras/legacy-md/boot-disk.png)

这将为您提供可用磁盘的列表，选择您的磁盘，然后将提示您编写新的MBR。选择`[y]`，你就完成了。

![完成安装程序](../images/extras/legacy-md/boot-done.png)

![根EFI](../images/extras/legacy-md/efi-base.png)

这将为您提供一个带有**bootia32**或**bootx64**文件的EFI分区

:::

## 设置OpenCore的EFI环境

设置OpenCore的EFI环境很简单——你所需要做的就是挂载我们的EFI系统分区。这是在我们使用GUID格式化时自动创建的，但默认情况下是卸载的，这就是我们的朋友[MountEFI](https://github.com/corpnewt/MountEFI)的作用:

![MountEFI](../images/installer-guide/mac-install-md/mount-efi-usb.png)

您会注意到，一旦我们打开EFI分区，它是空的。这就是乐趣开始的地方。

![空EFI分区](../images/installer-guide/mac-install-md/base-efi.png)

## 现在，所有这些都完成了，转到[设置EFI](./opencore-efi.md)来完成您的工作
