# 为什么是OpenCore胜过Clover和其他

本节包含了为什么社区一直过渡到OpenCore的简要概述，并旨在消除社区中的一些常见神话。那些只想要一台macOS机器的人可以跳过这一页。

[[toc]]

## OpenCore特性

* 更多操作系统支持!
  * OpenCore现在支持更多版本的OS X和macOS，而无需Clover和Chameleon必须实现的痛苦hack
  * 这包括操作系统10.4：Tiger，甚至是最新版本13：Ventura!
* 平均而言，OpenCore系统的启动速度比使用Clover的系统更快，因为不必要的补丁较少
* 更好的整体稳定性，因为补丁可以更精确:
  * [macOS 10.15.4更新](https://www.reddit.com/r/hackintosh/comments/fo9bfv/macos_10154_update/)
  * AMD OSX补丁不需要更新每一个次要的安全更新
* 更好的总体安全在许多形式:
  * 无需禁用系统完整性保护(SIP)
  * 内置文件保险箱2支持
  * [Vaulting](https://dortania.github.io/OpenCore-Post-Install/universal/security.html#Vault) 允许创建EFI快照，防止不必要的修改
  * 跳跃的
    * 无论是UEFI还是Apple的变体
* 通过读取启动盘设置的NVRAM变量，支持BootCamp切换和启动设备选择，就像真正的Mac一样。
* 通过`boot.efi`支持引导热键-在启动时按住`Option`或`ESC`选择启动设备，`Cmd+R`进入恢复或`Cmd+Opt+P+R`重置NVRAM。

### 软件支持

有人可能想从其他引导加载程序切换的最大原因实际上是软件支持:

* Kext不再测试Clover:
  * kext出问题了?许多开发人员，包括[Acidanthera](https://github.com/acidanthera)组织(您最喜欢的kext的制造商)不会提供支持，除非在OpenCore上
* 许多固件驱动程序被合并到OpenCore:
  * [APFS支持](https://github.com/acidanthera/AppleSupportPkg)
  * [文件保险箱支持](https://github.com/acidanthera/AppleSupportPkg)
  * [固件补丁](https://github.com/acidanthera/AptioFixPkg)

## OpenCore的缺点

Clover的大部分功能实际上在OpenCore中以一些quick的形式得到支持，但是在过渡时，您应该密切关注OpenCore缺失的功能，因为这可能会影响您自己:

* 不支持启动基于MBR的操作系统
  * 解决办法是在OpenCore中链加载rEFInd一次
* 不支持基于UEFI的VBIOS补丁
  * 这可以在macOS中完成
* 不支持旧显卡的自动DeviceProperty注入
  * ie. InjectIntel, InjectNVIDIA and InjectAti
  * 不支持旧显卡的自动DeviceProperty注入 [显卡补丁](https://xuanxuan1231.github.io/OpenCore-Post-Install/显卡-patching/)
* 不支持IRQ冲突补丁
  * 可以用[SSDTTime](https://github.com/corpnewt/SSDTTime)解决
* 不支持旧CPU的P和C状态生成
* 不支持硬件UUID注入
* 不支持许多Clover的XCPM补丁
  * 例如Ivy Bridge XCPM补丁
* 不支持隐藏特定驱动器
* 不支持在OpenCore菜单中更改设置
* 不修补PCIRoot UID值
* 不支持macOS专用的ACPI补丁

## 常见的流言

### OpenCore是否因为测试版而不稳定?

短回答：否

长回答：否

OpenCore的版本号并不代表项目的质量。相反，它更像是一种看到项目垫脚石的方式。Acidanthera仍然有很多他们想做的项目，包括整体改进和更多的功能支持。

例如，OpenCore通过适当的安全审计，以确保其符合UEFI安全引导，并且是唯一一个经过严格审查并获得此类支持的黑苹果引导加载程序。

版本0.6.1最初被设计为OpenCore的官方版本，因为它将有适当的UEFI/Apple安全引导，并且将是OpenCore作为公共工具发布一周年。然而，由于macOS Big Sur的情况，以及为了支持它而重写OpenCore的预链接器，决定将1.0.0再推迟一年。

目前的路线图:

* 2019：测试
* 2020：安全启动
* 2021：细化

因此，请不要将版本号视为障碍，而应将其视为值得期待的东西。

### OpenCore是否总是向其他操作系统注入SMBIOS和ACPI数据?

默认情况下，OpenCore将假定所有操作系统在ACPI和SMBIOS信息方面应该被平等对待。这种想法的原因包括三个部分:

* 这允许适当的多引导支持，像[BootCamp](https://xuanxuan1231.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* 避免制作不良的DSDT，并鼓励正确的ACPI实践
* 避免信息被多次注入的边缘情况，这在Clover中很常见
  * 比如：您将如何处理SMBIOS和ACPI数据注入，一旦您启动boot.efi，然后被踢出？更改已经在内存中，因此试图撤销它们可能非常危险。这就是为什么Clover的方法不受欢迎。

然而，在OpenCore中有一些怪癖，允许SMBIOS注入受到macOS的限制，通过修补macOS从哪里读取SMBIOS信息。`CustomSMBIOSMode`设置为`Custom`时使用`CustomSMIOSGuid`quirk将来可能会中断，因此我们只建议在其他操作系统中某些软件中断的情况下使用此选项。为了最好的稳定性，请禁用这些怪癖。

### OpenCore需要重新安装吗?

如果你的安装是“普通”的，那就完全不一样了——这指的是操作系统是否以任何方式被篡改了，比如在系统卷中安装了第三方文本，或者苹果不支持的其他修改。当您的系统被严重篡改时，无论是您还是第三方工具(如Hackintool)，我们建议重新安装，以避免任何潜在的问题。

Clover用户特别注意:安装OpenCore时请重置NVRAM。许多Clover变量可能与OpenCore和macOS冲突。

* 注意:Thinkpad笔记本电脑在OpenCore中重置NVRAM后是半砖的，我们建议通过更新这些机器上的BIOS来重置NVRAM。

### OpenCore只支持有限版本的macOS吗?

从OpenCore 0.6.2开始，你现在可以启动每一个Intel版本的macOS，一直到OS X 10.4!然而，适当的支持取决于您的硬件，所以请自己验证:[硬件限制](macos-limits.md)

::: details macOS安装画廊

Acidanthera已经测试了很多版本，我自己也在我的旧HP DC 7900 (Core2 Quad Q8300)上运行了很多版本的OS X。这里只是我测试过的一个小画廊:

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.4-Tiger.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.5-Leopard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.6-Snow-Loepard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.7-Lion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.8-MountainLion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.9-Mavericks.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.10-Yosemite.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.12-Sierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.13-HighSierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.15-Catalina.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/11-Big-Sur.png)

:::

### OpenCore支持旧的硬件吗?

到目前为止，只要操作系统本身支持，大多数英特尔硬件都是支持的!但是，请参阅[硬件限制页面](macOS-limits.md)了解更多关于OS X/macOS版本支持哪些硬件的信息。

目前，英特尔的Yonah和更新的系列cpu已经在OpenCore上进行了适当的测试。

### OpenCore支持Windows/Linux启动吗?

OpenCore将自动检测Windows，无需任何额外配置。在OpenCore 0.7.3中，OpenLinuxBoot作为EFI驱动程序被添加到OpenCore中，它将自动检测Linux分区。这需要[ext4_x64.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/ext4_x64.efi)或[btrfs_x64.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/btrfs_x64.efi)，具体取决于它在您的发行版中使用的格式。对于引导加载程序具有不规则路径或名称的任何操作系统，您可以简单地将其添加到BlessOverride部分。

### 黑苹果的合法性

黑苹果处于法律的灰色地带，主要是因为虽然这并不违法，但我们实际上违反了EULA。这并不违法的原因是:

* 我们从[苹果服务器直接](https://github.com/acidanthera/OpenCorePkg/blob/0.6.9/Utilities/macrecovery/macrecovery.py#L125)下载macOS
* 我们是作为一个非营利性的教学和个人使用的组织
  * 计划使用黑苹果工作或想要转售的人应该参考[Psystar案例](https://en.wikipedia.org/wiki/Psystar_Corporation)和他们的地区法律

虽然EULA规定macOS只能安装在真正的Mac或在真正的Mac上运行的虚拟机上([第2B-i和2B-iii节](https://www.apple.com/legal/sla/docs/macOSBigSur.pdf))，但没有强制执行的法律完全禁止这一点。然而，重新打包和修改macOS安装程序的网站确实存在潜在[DMCA删除](https://en.wikipedia.org/wiki/Digital_Millennium_Copyright_Act)风险等问题。

* **注意**: 这不是法律建议，所以如果你有任何担忧，请自己做出适当的评估，并与你的律师讨论。

### macOS支持NVIDIA显卡吗?

由于在新版本的macOS中围绕NVIDIA支持的问题，许多用户得出的结论是macOS从不支持NVIDIA 显卡。在Monterey Beta 7发布之前，苹果一直支持搭载NVIDIA显卡的Mac(比如2013年搭载Kepler显卡的MacBook Pro)。虽然有社区制作的补丁来恢复支持，但它们需要禁用SIP(系统完整性保护)，从而禁用macOS中的重要安全功能。

另一个问题与任何更新的NVIDIA显卡有关，因为苹果公司停止了与它们一起出货的机器，因此它们从未获得苹果公司的官方操作系统支持。相反，用户不得不依赖NVIDIA的第三方驱动程序。由于苹果新推出的安全启动的问题，他们不能再支持网络驱动程序，因此NVIDIA不能在更新的平台上发布它们，将它们限制在macOS 10.13, High Sierra。

有关操作系统支持的更多信息，请参阅这里:[显卡购买指南](https://xuanxuan1231.github.io/GPU-Buyers-Guide/)
