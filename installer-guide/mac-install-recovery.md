# 旧版macOS：在线办法

这种方法允许我们下载macOS的旧版本，包括10.7到最新版本，但是这些只是恢复安装程序，所以需要在安装程序本身内部连接互联网

首先，您需要使用macrecovery.py。这个工具实际上已经在OpenCorePkg中捆绑了；

![](../images/installer-guide/legacy-mac-install-md/macrecovery.png)

运行说明非常简单，根据你想下载的操作系统选择下面的命令:

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

* **macOS 12及以上注释**:由于最近的macOS版本引入了对USB堆栈的更改，建议您在安装macOS之前映射USB端口(使用USBToolBox)。
  * <span style="color:red"> 警告： </span> 在macOS 11.3及更新版本中，[XhciPortLimit被损坏导致启动循环](https://github.com/dortania/bugtracker/issues/162)。
    * 如果你已经[映射你的USB端口](https://xuanxuan1231.github.io/OpenCore-Post-Install/usb/)并禁用`XhciPortLimit`，你在启动macOS 11.3+时不会出现问题。

从这里开始，在终端中运行这些命令之一，一旦完成，你将得到类似于这样的输出:

![](../images/installer-guide/legacy-mac-install-md/download-done.png)

一旦这样做，格式化你的USB为GUID分区表和FAT32文件系统：

![](../images/installer-guide/legacy-mac-install-md/fat32-erase.png)

::: details 下一步骤说明
acidanthera更新了macrecovery，它现在会自动生成`com.apple.recovery.boot`文件夹并将`BaseSystem`或`RecoveryImage`以及`chunklist`放入文件夹。你可以直接使用`com.apple.recovery.boot`文件夹。
:::
~~最后，在这个驱动器的根目录下创建一个名为`com.apple.recovery.boot`的文件夹。并将新下载的BaseSystem/RecoveryImage文件放入:~~

![](../images/installer-guide/legacy-mac-install-md/dmg-chunklist.png)


### 一旦你完成，你可以前往[设置OpenCore的EFI环境](./mac-install.md#设置OpenCore的EFI环境)
