# 旧版macOS：磁盘映像

这种方法依赖于来自Apple或Acidanthera的托管映像，并将其恢复到您的驱动器上。

#### Acidanthera映像

下面的安装程序是从真正的Mac恢复磁盘中提取的，删除了SMBIOS锁，OS X本身的内容没有以任何方式修改。

* [OS X 10.4.10(8R4088)](https://archive.org/details/10.4.10-8-r-4088-acdt)[MEGA镜像](https://mega.nz/folder/D3ASzLzA#7sjYXE2X09f6aGjol_C7dg)

* [OS X 10.5.7(9J3050)](https://archive.org/details/10.5.7-9-j-3050)[MEGA镜像](https://mega.nz/folder/inRBTarD#zanf7fUbviwz3WHBU5xpCg)

* [OS X 10.6.7(10J4139)](https://archive.org/details/10.6.7-10j3250-disk-images)[MEGA镜像](https://mega.nz/folder/z5YUhYTb#gA_IRY5KMuYpnNCg7kR3ug/file/ioQkTagI)

#### Apple映像

请注意，这些映像需要你有一个Apple开发者账户才能访问。

* [OS X 10.5.0 Golden Master(9a581)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_v10.5_leopard_9a581/leopard_9a581_userdvd.dmg)

* [OS X 10.6.0 Golden Master(10a432)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_version_10.6_snow_leopard_build_10a432/mac_os_x_v10.6_build_10a432_user_dvd.dmg)

### 恢复驱动器

现在是有趣的部分，您首先要打开刚刚下载的dmg并将其挂载。现在打开磁盘工具，用GUID分区映射将你的驱动器格式化为macOS日志式(HFS+):

![格式化USB](../images/installer-guide/mac-install-md/format-usb.png)

Next we have 2 options to follow:

* [ASR恢复](#asr)(Apple Software Restore)
  * 基于终端，在启用SIP的情况下工作
* [磁盘管理恢复](#磁盘管理)
  * May require SIP disabled in newer OSes
  
#### ASR

这里你只需要打开终端并运行以下命令:

```sh
sudo asr restore -source /Volumes/Mac\ OS\ X\ Install\ DVD  -target /Volumes/MyVolume -erase -noverify
```

* **注**:这可能与您的设置不一致，请相应地更改:
  * 将`/Volumes/Mac\ OS\ X\ Install\ DVD`更改为您挂载的磁盘映像的名称
  * 将`/Volumes/MyVolume`更改为USB的名称

### 一旦你完成，你可以前往[设置OpenCore的EFI环境](./mac-install.md#设置opencore的efi环境)
  
#### 磁盘管理

由于磁盘管理的一些麻烦问题，如果启用SIP，许多恢复可能会失败。如果您有问题，我们建议您使用[ASR方法](#asr)或禁用SIP。

首先，打开磁盘管理，您应该在侧边栏中看到USB驱动器和磁盘映像。从这里，选择restore

![](../images/installer-guide/legacy-mac-install-md/pre-restore.png)
![](../images/installer-guide/legacy-mac-install-md/restore.png)

::: details 排错

如果在恢复过程中出现如下错误:

![](../images/installer-guide/legacy-mac-install-md/sip-fail.png)

这可能意味着需要禁用SIP，但是我们建议使用[ASR方法](#asr)代替。

:::

### 一旦你完成，你可以前往[设置OpenCore的EFI环境](./mac-install.md#设置OpenCore的EFI环境)
