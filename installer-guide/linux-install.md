# 在Linux上创建安装程序

虽然你不需要重新安装macOS来使用OpenCore，但有些用户更喜欢在启动管理器升级时使用新的版本。

首先，您需要以下内容:

* 4GB USB
* [macrecovery.py](https://github.com/acidanthera/OpenCorePkg/releases)
  
## 下载macOS

现在开始，首先进入[macrecovery的文件夹](https://github.com/acidanthera/OpenCorePkg/releases)，并运行以下命令之一:

![](../images/installer-guide/legacy-mac-install-md/macrecovery.png)

```sh
# 调整下面的命令到正确的文件夹
cd ~/Downloads/OpenCore-0/Utilities/macrecovery/
```

接下来，根据你想要启动的操作系统运行以下命令之一：

```sh
# Lion (10.7):
python3 ./macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
python3 ./macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download

# Mountain Lion (10.8):
python3 ./macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download

# Mavericks (10.9):
python3 ./macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download

# Yosemite (10.10):
python3 ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download

# El Capitan (10.11):
python3 ./macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download

# Sierra (10.12):
python3 ./macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download

# High Sierra (10.13)
python3 ./macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
python3 ./macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download

# Mojave (10.14)
python3 ./macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download

# Catalina (10.15)
python3 ./macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Big Sur (11)
python3 ./macrecovery.py -b Mac-42FD25EABCABB274 -m 00000000000000000 download

# Monterey (12)
python3 ./macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000000000 download

# Latest version
# ie. Ventura (13)
python3 ./macrecovery.py -b Mac-4B682C642B45593E -m 00000000000000000 download
```

从这里开始，在终端中运行这些命令之一，一旦完成，你将得到类似于这样的输出：

![](../images/installer-guide/legacy-mac-install-md/download-done.png)

* **Note**: 根据操作系统的不同，您将获得BaseSystem或RecoveryImage文件。它们都以相同的方式工作，所以当我们引用BaseSystem时，相同的信息适用于RecoveryImage

* **macOS 12及以上注释**:由于最近的macOS版本引入了对USB堆栈的更改，建议您在安装macOS之前映射USB端口(使用USBToolBox)。
  * <span style="color:red"> 警告： </span> 在macOS 11.3及更新版本中，[XhciPortLimit被损坏导致启动循环](https://github.com/dortania/bugtracker/issues/162)。
    * 如果你已经[映射你的USB端口](https://xuanxuan1231.github.io/OpenCore-Post-Install/usb/)并禁用`XhciPortLimit`，你在启动macOS 11.3+时不会出现问题。

## 制作安装程序


本节的目标是在USB设备中创建必要的分区。你可以使用你最喜欢的程序。`gdisk``fdisk``parted``gparted`或`gnome-disks`。本指南将重点介绍`gdisk`，因为它很好，可以稍后更改分区类型，因为我们需要它，以便macOS Recovery HD可以启动。(这里使用的发行版是Ubuntu 18.04，其他版本或发行版也可以使用)

感谢[mid 1996](https://github.com/midi1996)在[Internet安装指南](https://midi1996.github.io/hackintosh-internet-install-gitbook/)指南上所做的工作，这是本文的基础。

### 方法1

在终端:

1. 运行`lsblk`并确定您的USB设备块
  ![lsblk](../images/installer-guide/linux-install-md/unknown-5.png)
2. 运行`sudo gdisk /dev/<your USB block>`
   1. 如果询问使用哪个分区表，请选择GPT。
      ![选择GPT](../images/installer-guide/linux-install-md/unknown-6.png)
   2. 输入`p`来打印块的分区 \(并验证它是所需要的\)
      ![](../images/installer-guide/linux-install-md/unknown-13.png)
   3. 输入`o`来清除分区表并创建一个新的GPT表(如果不是空的)
      1. 输入`y`确认
         ![](../images/installer-guide/linux-install-md/unknown-8.png)
   4. 输入 `n`
      1. `partition number`：默认为空
      2. `first sector`：默认为空
      3. `last sector`：默认为空
      4. `Hex code or GUID`：`0700`用于Microsoft Basic Data类型
   5. 输入`w`
      * 输入`y`确认
      ![](../images/installer-guide/linux-install-md/unknown-9.png)
      * 在某些情况下需要重新启动，但很少，如果你想要确保，重新启动你的计算机。你也可以尝试重新插入USB。
   6. 输入`q`,关闭`gdisk`
3. 使用' lsblk '来确定分区的标识符
4. 运行`sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<your USB partition block>`以将你的USB格式化为FAT32文件系统并命名为`OPENCORE`。
5. 然后`cd`到`/OpenCore/Utilities/macrecovery/`你应该得到一个`.dmg`和`.chunklist`文件
   1. 使用`udisksctl`挂载USB分区(`udisksctl mount -b /dev/<your USB partition block>`，大多数情况下不需要sudo)或`mount`(`sudo mount/ dev/<your USB partition block> /where/your/mount/stuff`，sudo是必需的)
   2. ~~`cd`到你的USB驱动器并在FAT32分区根目录`mkdir com.apple.recovery.boot`~~<br/>由于acidanthera更新了macrecovery，它现在会自动生成com.apple.recovery文件夹并将BaseSystem或RecoveryImage以及chunklist放入文件夹。你可以直接使用com.apple.recovery文件夹。**跳过此步骤**
   3. ~~使用`cp`或`rsync`将`BaseSystem.dmg`和`BaseSystem.chunklist`放入`com.apple.recovery.boot`文件夹。~~<br/>使用`cp`或`rsync`将`com.apple.recovery.boot`文件夹放入FAT32分区根目录

### 方法二(如果第一种方法不起作用)

在终端:

1. 运行`lsblk`并确定您的USB设备块
   ![](../images/installer-guide/linux-install-md/unknown-11.png)
2. 运行`sudo gdisk /dev/<your USB block>`
   1. 如果询问使用哪个分区表，请选择GPT。
      ![](../images/installer-guide/linux-install-md/unknown-12.png)
   2. 输入`p`打印块的分区\(并验证它是所需要的\)
      ![](../images/installer-guide/linux-install-md/unknown-13.png)
   3. 输入`o`清除分区表并创建一个新的GPT表(如果不是空的)
      1. 输入`y`确认
         ![](../images/installer-guide/linux-install-md/unknown-14.png)
   4. 输入 `n`
      1. `partition number`：默认为空
      2. `first sector`：默认为空
      3. `last sector`：`+200M`创建一个200MB的分区，稍后在OPENCORE上命名
      4. `Hex code or GUID`：`0700`用于Microsoft Basic Data类型
      ![](../images/installer-guide/linux-install-md/unknown-15.png)
   5. 输入 `n`
      1. `partition number`：默认为空
      2. `first sector`：默认值保持空白
      3. `last sector`：默认为空 \(或者如果你想进一步分区USB的其余部分，你可以把它设为`+3G`\)
      4. `Hex code or GUID`：`af00`用于Apple HFS/HFS+
      ![](../images/installer-guide/linux-install-md/unknown-16.png)
   6. 输入`w`
      * 输入`y`确认
      ![](../images/installer-guide/linux-install-md/unknown-9.png)
      * 在某些情况下需要重新启动，但很少，如果你想要确保，重新启动你的计算机。你也可以尝试重新插入USB。
   7. 输入`q`,关闭`gdisk`
3. 再次使用`lsblk`来确定200MB的驱动器和其他分区
   ![](../images/installer-guide/linux-install-md/unknown-18.png)
4. 运行`sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<your USB partition block>`以将你的USB格式化为FAT32文件系统并命名为`OPENCORE`。
5. 然后`cd`到`/OpenCore/Utilities/macrecovery/`你应该得到一个`.dmg`和`.chunklist`文件
   1. 使用`udisksctl`挂载USB分区(`udisksctl mount -b /dev/<your USB partition block>`，大多数情况下不需要sudo)或`mount`(`sudo mount/ dev/<your USB partition block> /where/your/mount/stuff`，sudo是必需的)
   2. ~~使用`cp`或`rsync`将`BaseSystem.dmg`和`BaseSystem.chunklist`放入`com.apple.recovery.boot`文件夹。~~<br/>使用`cp`或`rsync`将`com.apple.recovery.boot`文件夹放入FAT32分区根目录
   3. 下载`dmg2img`(大多数发行版都有)
   4. 运行`dmg2img -l BaseSystem.dmg`并确定哪个分区具有`磁盘映像`属性
      ![](../images/installer-guide/linux-install-md/unknown-20.png)
   5. 运行`sudo dmg2img -p <the partition number> BaseSystem.dmg /dev/<your 3GB+ partition block>`提取恢复映像并将其写入分区磁盘
      * 这需要一些时间。如果你用的是慢速USB(我用快的USB2.0硬盘花了不到5分钟)。
      ![](../images/installer-guide/linux-install-md/unknown-21.png)

## 现在，所有这些都完成了，转到[设置EFI](./opencore-efi.md)来完成您的工作
