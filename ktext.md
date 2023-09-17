# 收集文件

本节是收集启动macOS的各种文件，我们希望你在开始之前对你的硬件有很好的了解，希望你之前做过一个黑苹果，因为我们不会在这里深入研究。

> 确定我的硬件是否受支持的最佳方法是什么?

参见[**硬件限制页面**](macos-limits.md)以更好地了解macOS启动需要什么，Clover和OpenCore之间的硬件支持非常相似。

> 有什么方法可以知道我有什么硬件?

参见前一页：[查找你的硬件](./find-hardware.md)

[[toc]]

## 固件驱动程序

固件驱动程序是OpenCore在UEFI环境下使用的驱动程序。它们主要是启动机器所需的，或者是通过扩展OpenCore的补丁功能，要么在OpenCore选择器中显示不同类型的驱动器（HFS驱动）。

* **位置**: 这些文件**必须**放在`EFI/OC/Drivers/`下

### 通用

::: tip 必需驱动程序

对于大多数系统，您只需要2个`.efi`驱动程序启动和运行:

* [HfsPlus.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi)(<span style="color:red">必需</span>)
  * 查看HFS卷（macOS安装程序和恢复分区/映像）需要。**请勿混合使用其他HFS驱动程序**
  * 对于Sandy Bridge和更老版本（包括低端Ivy Bridge（i3和赛扬）），查看下面的旧版部分
* [OpenRuntime.efi](https://github.com/acidanthera/OpenCorePkg/releases)(<span style="color:red">必需</span>)
  * 替代[AptioMemoryFix.efi](https://github.com/acidanthera/AptioFixPkg)，用作OpenCore的扩展，以帮助修补引导。用于NVRAM修复和更好的内存管理。
  * 提醒一下，这是在我们之前下载的OpenCorePkg中捆绑的

:::

### 旧版用户

除此之外，如果您的硬件不支持UEFI（2011年及更早的版本），那么您需要以下内容。请密切关注每一个条目，因为您可能不需要全部4个条目:

* [OpenUsbKbDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases)
  * 用于**运行DuetPkg的旧系统**上的OpenCore拾取器，[在UEFI（Ivy Bridge及更新版本）上不推荐甚至有害](https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653)
* [HfsPlusLegacy.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlusLegacy.efi)
  * HfsPlus的旧版变体，用于缺乏RDRAND指令支持的系统。这通常在Sandy Bridge和更老的系统（以及低端Ivy Bridge（i3和Celerons））上看到。
  * 不要把这个和HfsPlus.efi混在一起，根据你的硬件选择一个或另一个
* [OpenPartitionDxe](https://github.com/acidanthera/OpenCorePkg/releases)
  * 在OS X 10.7到10.9上启动恢复时需要
    * 该文件与OpenCorePkg捆绑在EFI/OC/Drivers下
    * 注：OpenDuet用户（即没有UEFI）将有这个驱动程序内置，不需要它
  * OS X 10.10，Yosemite及更新版本不需要

这些文件将在你的EFI驱动文件夹

::: details 32位的细节

对于那些使用32位CPU的设备，您也需要获取这些驱动程序

* [HfsPlus32](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus32.efi)
  * HfsPlusLegacy的替代方案，但对于32位cpu，不要将其与其他HFS.efi驱动程序混合使用

:::

## Kexts

kext是内核扩展（**k**ernel **ext**ension）的简称，你可以把它看成macOS的驱动，这些文件将进入EFI中的Kexts文件夹。

* **Windows和Linux注意**：kext将看起来像你的操作系统中的普通文件夹，**仔细检查**，你正在安装的文件夹有一个可见的。kext扩展名(如果它丢失，不要手动添加一个)。
  * 如果kext还包含`.dSYM`文件，您可以简单地删除它。它们仅用于调试目的。
* **位置说明**：这些文件**必须**放在`EFI/OC/kext/`下。

下面列出的大多数文本都可以在[build repo](http://dortania.github.io/builds/)中找到**预编译**版本。这里的kext在每次有新的提交时进行编译。

### 必需

::: tip 必需的kext

没有下面的2个，系统是无法启动的：

* [Lilu](https://github.com/acidanthera/Lilu/releases)(<span style="color:red">必需</span>)
  * 一个ext来修补许多进程，AppleALC, WhateverGreen, VirtualSMC和许多其他的kext需要。没有Lilu，他们就不会工作。
  * 请注意，虽然Lilu最低支持Mac OS X 10.4，但许多插件只适用于较新的版本。
* [VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)(<span style="color:red">必需</span>)
  * 模拟在真正的Mac上发现的SMC芯片，没有这个macOS将无法启动
  * 需要Mac OS X 10.4或更新版本

:::

### VirtualSMC插件

下面的插件不需要引导，它们只是为系统添加了额外的功能，比如硬件监控。除非另有说明，否则这些插件都是VirtualSMC附带的

::: tip

虽然VirtualSMC支持10.4，但插件可能需要更新的版本。

:::

* SMCProcessor.kext
  * 用于监控Intel CPU温度
  * 不适合基于AMD CPU的系统
  * 需要Mac OS X 10.7或更新版本
* [SMCAMDProcessor](https://github.com/trulyspinach/SMCAMDProcessor)
  * 用于监控AMD Zen系统的CPU温度
  * **积极发展下，潜在不稳定**
  * 需要AMDRyzenCPUPowerManagement（参见[AMD CPU特定的kext](ktext.md#amd-cpu特定的kext)）
  * 需要macOS 10.13或更新版本
* [SMCRadeonGPU](https://github.com/aluveitie/RadeonSensor)
  * 用于监控AMD GPU系统上的GPU温度
  * 需要来自同一存储库的RadeonSensor
  * 需要macOS 11或更新版本
* SMCSuperIO.kext
  * 用于监控风扇转速
  * 不适合基于AMD CPU的系统
  * 需要Mac OS X 10.6或更新版本
* SMCLightSensor.kext
  * 用于笔记本电脑的环境光传感器
  * **如果你没有环境光传感器（即台式机），不要使用。否则会导致问题**
  * 需要Mac OS X 10.6或更新版本
* SMCBatteryManager.kext
  * 用于测量笔记本电脑上的电池读数
  * **不在台式机上使用**
  * 需要Mac OS X 10.4或更新版本
* SMCDellSensors.kext
  * 允许对支持系统管理模式(SMM)的戴尔机器上的风扇进行更精细的监控和控制
  * **如果您没有受支持的戴尔计算机，请不要使用**，主要是戴尔笔记本电脑可以从中受益
  * 需要Mac OS X 10.7或更新版本

### 图形

* [WhateverGreen](https://github.com/acidanthera/WhateverGreen/releases)(<span style="color:red">必需</span>)
  * 用于图形修补，DRM修复，板ID检查，帧缓冲区修复等。所有的GPU都能从中受益。
  * 注意SSDT-PNLF.dsl文件仅适用于笔记本电脑和AIO，请参阅[ACPI入门](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/)了解更多信息
  * 需要Mac OS X 10.6或更新版本

### 音频

* [AppleALC](https://github.com/acidanthera/AppleALC/releases)
  * 用于AppleHDA补丁，允许支持大多数板载声音控制器
  * AppleALCU.kext是AppleALC的精简版，只支持数字音频，但你仍然可以在数字音频专用系统上使用AppleALC
  * AMD 15h/16h可能与AppleALC和Ryzen/Threadripper系统有问题，很少有麦克风支持
  * 需要OS X 10.4或更新版本
  
::: details 传统音频kext

对于那些计划启动10.7或更老版本的人来说，可能会选择以下Kext：

* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * 要求OS X 10.6或更新版本
  
* [VoodooHDA-FAT](https://github.com/khronokernel/Legacy-Kexts/blob/master/FAT/Zip/VoodooHDA.kext.zip)
  * 与上面类似，但是支持32位和64位内核，因此非常适合OS X 10.4-5引导和32位CPU

:::

### 以太网

这里我们假设您知道您的系统有什么以太网卡，提醒您，产品规格页面很可能会列出网卡的类型。

* [IntelMausi](https://github.com/acidanthera/IntelMausi/releases)
  * 对于大多数Intel网卡来说，基于I211的芯片组需要SmallTreeIntel82576.kext
  * 官方支持Intel的82578、82579、I217、I218和I219网卡
  * 要求OS X 10.9或更新版本，10.6-10.8用户可以使用IntelSnowMausi代替旧的操作系统
* [AppleIGB](https://github.com/donatengit/AppleIGB/releases)
  * 在macOS Monterey及以上版本上运行的I211网卡必需
  * 可能在一些网卡上有不稳定的问题，建议留在Big Sur上并使用SmallTree
  * 大多数运行Intel网卡的AMD主板都需要
  * 需要macOS 12及以上版本
* [SmallTreeIntel82576](https://github.com/khronokernel/SmallTree-I211-AT-patch/releases)
  * 需要I211网卡运行在macOS版本到Big Sur上，基于SmallTree ext，但打了补丁以支持I211（在macOS 12 [Monterey](./extras/monterey.md#以太网)或更高版本上不起作用）
  * 大多数运行Intel网卡的AMD主板都需要
  * 要求OS X 10.9-12(v1.0.6)，macOS 10.13-14(v1.2.5)，macOS 10.15+(v1.3.0)
* [AtherosE2200Ethernet](https://github.com/Mieze/AtherosE2200Ethernet/releases)
  * Atheros和Killer网卡所需
  * 要求OS X 10.8或更新版本
  * 注意:Atheros Killer E2500型号实际上是基于Realtek的，对于这些系统，请使用[RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)代替
* [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
  * 为Realtek的千兆以太网
  * v2.2.0及以下版本需要OS X 10.8及以上版本，v2.2.2版本需要macOS 10.12及以上版本，v2.3.0及以上版本需要macOS 10.14及以上版本
  *  **注意：** 有时最新版本的ext可能无法与您的以太网正常工作。如果您看到此问题，请尝试旧版本。
* [LucyRTL8125Ethernet](https://www.insanelymac.com/forum/files/file/1004-lucyrtl8125ethernet/)
  * Realtek的2.5Gb以太网
  * 需要macOS 10.15或更新版本
* 对于Intel的I225-V网卡，补丁在台式机[Comet Lake DeviceProperties](config.plist/comet-lake.md#deviceproperties)部分中提到。不需要kext。
  * 需要macOS 10.15或更新版本
* 对于Intel的I350网卡，补丁在HEDT [Sandy和Ivy Bridge-E DeviceProperties](config-HEDT/ivy-bridge-e.md#deviceproperties)部分中提到。不需要kext。
  * 要求OS X 10.10或更新版本

::: details 旧版以太网kext

与旧的macOS安装或旧的PC硬件相关。

* [AppleIntele1000e](https://github.com/chris1111/AppleIntelE1000e/releases)
  * 主要与基于10/100MBe的英特尔以太网控制器相关
  * 需要10.6或更新版本
* [RealtekRTL8100](https://www.insanelymac.com/forum/files/file/259-realtekrtl8100-binary/)
  * 主要与基于10/100MBe的Realtek以太网控制器相关
  * v2.0.0+需要macOS 10.12或更新版本
* [BCM5722D](https://github.com/chris1111/BCM5722D/releases)
  * 主要与基于BCM5722的Broadcom以太网控制器相关
  * 要求OS X 10.6或更新版本

:::

还要记住，某些网卡实际上是macOS原生支持的:

::: details Native Ethernet Controllers

#### Aquantia系列

```md
# AppleEthernetAquantiaAqtion.kext
pci1d6a,1    = Aquantia AQC107
pci1d6a,d107 = Aquantia AQC107
pci1d6a,7b1  = Aquantia AQC107
pci1d6a,80b1 = Aquantia AQC107
pci1d6a,87b1 = Aquantia AQC107
pci1d6a,88b1 = Aquantia AQC107
pci1d6a,89b1 = Aquantia AQC107
pci1d6a,91b1 = Aquantia AQC107
pci1d6a,92b1 = Aquantia AQC107
pci1d6a,c0   = Aquantia AQC113
pci1d6a,4c0  = Aquantia AQC113
```

**注**：由于许多Aquantia网卡上的一些过时的固件，您可能需要更新Linux/Windows中的固件以确保它与macos兼容。

#### Intel系列

```md
# AppleIntel8254XEthernet.kext
pci8086,1096 = Intel 80003ES2LAN
pci8086,100f = Intel 82545EM
pci8086,105e = Intel 82571EB/82571GB

# AppleIntelI210Ethernet.kext
pci8086,1533 = Intel I210
pci8086,15f2 = Intel I225LM (Added in macOS 10.15)

# Intel82574L.kext
pci8086,104b = Intel 82566DC
pci8086,10f6 = Intel 82574L

```

#### Broadcom系列

```md
# AppleBCM5701Ethernet.kext
pci14e4,1684 = Broadcom BCM5764M
pci14e4,16b0 = Broadcom BCM57761
pci14e4,16b4 = Broadcom BCM57765
pci14e4,1682 = Broadcom BCM57762
pci14e4,1686 = Broadcom BCM57766
```

:::

### USB

* USBToolBox （[tool](https://github.com/USBToolBox/tool)和[k0ext](https://github.com/USBToolBox/kext)）
  * 对于Windows和macOS的USB映射工具。
  * 建议您在安装macOS之前映射USB端口，以避免任何端口限制问题
  * 特性
    * 支持从Windows和macOS映射（Linux支持正在进行中）
    * 可以使用USBToolBox kext或原生Apple kext（AppleUSBHostMergeProperties）构建映射
    * 支持多种匹配方式
    * 支持配套端口（在Windows上）

* [XHCI-unsupported](https://github.com/RehabMan/OS-X-USB-Inject-All)
  * 非原生USB控制器所需
  * 基于AMD CPU的系统不需要这个
  * 需要此功能的常见芯片组：
    * H370
    * B360
    * H310
    * Z390（Mojave和更新版本不需要）
    * X79
    * X99
    * ASRock Intel主板（B460/Z490+不需要）

### WiFi和蓝牙

#### 非原生蓝牙卡

* [BlueToolFixup](https://github.com/acidanthera/BrcmPatchRAM/releases)
  * 修复macOS 12+蓝牙栈，支持第三方卡
  * 所有非原生（非Apple的Broadcom，Intel等）蓝牙卡都需要
  * 包括在[BrcmPatchRAM](#broadcom)压缩
  * **不要在macOS 11或更早的版本上使用**

#### Intel

* [AirportItlwm](https://github.com/OpenIntelWireless/itlwm/releases)
  * 增加了对各种英特尔无线卡的支持，并由于IO80211Family集成而在恢复模式中原生工作
  * 需要macOS 10.13或更新版本，并需要苹果的安全引导才能正常工作
* [Itlwm](https://github.com/OpenIntelWireless/itlwm/releases)
  * 对于无法启用Apple安全启动的系统，AirportItlwm的替代方案
  * 需要[Heliport](https://github.com/OpenIntelWireless/HeliPort/releases)
  * 它将被视为以太网卡，你必须通过Heliport连接Wi-Fi
  * **在macOS恢复模式中不工作**
* [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases)
  * 当与英特尔无线网卡配对时，为macOS增加蓝牙支持
  * 除了在macOS中修补错误外，还使用IntelBTPatcher（包含）
  * 需要macOS 10.13或更新版本
  * 在macOS 10.13到11上，您还需要IntelBluetoothInjector（包含）

::: details 关于启用AirportItlwm的更多信息

要在OpenCore中启用AirportItlwm支持，您需要:

* 将它设置为`Default`或其他可用值以启用`Misc -> Security -> SecureBootModel`
  * 这将在本指南的后面部分和安装后指南中讨论：[Apple安全启动](https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/security/applesecureboot.html)
* 如果你不能启用SecureBootModel，你仍然可以强制注入IO80211Family（**强烈反对**）
  * 在config.plist中的`Kernel -> Force`下设置以下内容。（在本指南后面讨论）：
  
![](./images/ktext-md/force-io80211.png)

:::

#### Broadcom

* [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
  * 用于修补非Apple/非Fenvi的Broadcom卡，**将不适用于Intel，Killer和Realtek等**
  * 要求OS X 10.10或更新版本
  * 关于Big Sur，请参阅[Bis Sur已知问题](./extras/big-sur#已知问题)了解有关AirPortBrcm4360驱动程序的额外步骤。
* [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM/releases)
  * 用于在Broadcom蓝牙芯片组上上传固件，所有非Apple/非Fenvi卡都需要。
  * 与BrcmFirmwareData.kext配对
    * BrcmPatchRAM3 for 10.15+（必须与BrcmBluetoothInjector配对）
    * BrcmPatchRAM2 for 10.11-10.14
    * BrcmPatchRAM for 10.8-10.10
  * 在macOS 10.11到macOS 11上，您还需要BrcmBluetoothInjector（包含）

::: details BrcmPatchRAM加载顺序

在`Kernel -> Add`中的顺序应该是：

1. BrcmBluetoothInjector（如果需要）
2. BrcmFirmwareData
3. BrcmPatchRAM3（或BrcmPatchRAM2/BrcmPatchRAM）

BlueToolFixup可以在Lilu之后的任何地方。

但是ProperTree将为您处理这个问题，因此您不必自己担心

:::

### AMD CPU特定的kext

* [XLNCUSBFIX](https://cdn.discordapp.com/attachments/566705665616117760/566728101292408877/XLNCUSBFix.kext.zip)
  * USB修复AMD FX系统，Ryzen不建议
  * 需要macOS 10.13或更新版本
* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * FX系统的音频和Ryzen系统的前面板Mic+音频支持，不要与AppleALC混合。音频质量明显比Zen cpu上的AppleALC差
  * 要求OS X 10.6或更新版本
  * 不建议在macOS 11.3及以上版本上使用此ext，因为您需要修改macOS文件系统并禁用SIP
* [AMDRyzenCPUPowerManagement](https://github.com/trulyspinach/SMCAMDProcessor)
  * Ryzen系统的CPU电源管理
  * **积极发展下，潜在不稳定**
  * 需要macOS 10.13或更新版本

### 附加

* [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * 需要在macOS 12.3及更高版本的AMD系统上，以及macOS 10.15及更高版本的Intel双插槽系统上。
  * 影响的SMBIOS：
    * MacPro6,1
    * MacPro7,1
    * iMacPro1,1
* [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases)
  * 需要在一些英特尔的HEDT和服务器主板上同步TSC，没有这个macOS可能会非常慢甚至无法启动。
  * **不能在AMD CPU上工作**
  * 要求OS X 10.8或更新版本
* [NVMeFix](https://github.com/acidanthera/NVMeFix/releases)
  * 用于修复非Apple NVMe的电源管理和初始化
  * 需要macOS 10.14或更新版本
* [SATA-Unsupported](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/SATA-unsupported.kext.zip)
  * 增加了对多种SATA控制器的支持，主要适用于在macOS中无法看到SATA驱动器的笔记本电脑。我们建议先不使用这个进行测试。
  * Big Sur+注意：[CtlnaAHCIPort](extra-files/CtlnaAHCIPort.kext.zip)将需要使用，因为大量的控制器被从二进制文件本身删除
    * Catalina和更老的系统不必担心
* [CPUTopologyRebuild](https://github.com/b00t0x/CpuTopologyRebuild)
  * 一个实验性的Lilu插件，优化了Alder Lake的异构核心配置。**仅适用于Alder Lake CPU**
* [RestrictEvents](https://github.com/acidanthera/RestrictEvents)
  * 修补macOS的各种功能，参见[README](https://github.com/acidanthera/RestrictEvents#boot-arguments)了解更多信息
* [EmeraldSDHC](https://github.com/acidanthera/EmeraldSDHC)
  * 支持eMMC的macOS内核扩展。目前只支持最高HS200速度的eMMC/MMC卡。此驱动程序目前正在进行中，在某些设备上可能会遇到性能不佳或不可用的情况。目前不支持SD卡。
::: details 传统SATA kext

* [AppleIntelPIIXATA.kext](https://github.com/xuanxuan1231/OpenCore-Legacy-Patcher/blob/d20d9975c144728da7ae2543d65422f53dabaa2d/payloads/Kexts/Misc/AppleIntelPIIXATA-v1.0.0.zip)
  * 旧的核心2双核/四核和奔腾4系统的传统IDE和ATA ext。macOS 11（Big Sur）和更新版本需要，因为这个kext在macOS 10.15（Catalina）中被删除了。
* [AHCIPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/AHCIPortInjector.kext.zip)
  * 传统的SATA/AHCI注入器，主要适用于Penryn前的旧机器
* [ATAPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/ATAPortInjector.kext.zip)
  * 旧版的ATA注入器，主要与IDE和ATA设备相关(即。当BIOS中没有AHCI选项时)
  * 依赖于AppleIntelPIIXATA.kext，使用macOS 11（Big Sur）及更新版本时需要注入
  
:::

### 笔记本电脑输入

要弄清楚你有什么样的键盘和触控板，请查看Windows中的设备管理器或Linux中的`dmesg | grep -i input`

::: warning 警告

大多数笔记本电脑的键盘都是PS2！即使您有I2C, USB或SMBus触控板，您也会想要抓取VoodooPS2。

:::

#### PS2键盘和触摸板

* [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases)
  * 适用于各种PS2键盘，鼠标和触控板
  * MT2（Magic Trackpad 2）功能需要macOS 10.11或更新版本
* [RehabMan's VoodooPS2](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/)
  * 对于带有PS2键盘，鼠标和触控板的旧系统，或者当您不想使用VoodooInput时
  * 支持macOS 10.6+

#### SMBus触摸板

* [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases)
  * 适用于带有Synaptics SMBus触控板的系统
  * MT2功能需要macOS 10.11或更新版本
  * 取决于Acidanthera的VoodooPS2
* [VoodooSMBus](https://github.com/VoodooSMBus/VoodooSMBus/releases)
  * 适用于带有ELAN SMBus触控板的系统
  * 目前支持macOS 10.14或更新版本

#### I2C/USB HID设备

* [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C/releases)
  * 支持macOS 10.11+
  * 连接到I2C控制器，允许插件与I2C触控板交互
  * 使用以下插件的USB设备仍然需要VoodooI2C
  * 必须与一个或多个插件配对如下所示：

::: tip VoodooI2C插件

| 连接类型 | 插件 | 注释 |
| :--- | :--- | :--- |
| 多点触控HID | VoodooI2CHID | 可以与I2C/USB触摸屏和触控板一起使用 |
| ELAN专有 | VoodooI2CElan | ELAN1200+需要VoodooI2CHID代替 |
| FTE1001触摸板 | VoodooI2CFTE | |
| Atmel多点触控协议 | VoodooI2CAtmelMXT | |
| Synaptics HID | [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases) | I2C Synaptic触控板（需要VoodooI2C仅用于I2C模式） |
| Alps HID | [AlpsHID](https://github.com/blankmac/AlpsHID/releases) | 可与USB或I2C Alps触控板一起使用。主要出现在戴尔笔记本电脑和一些惠普EliteBook型号上 |

:::

#### 杂项

* [ECEnabler](https://github.com/1Revenger1/ECEnabler/releases)
  * 修复了在许多设备上读取电池状态（允许读取超过8位长的EC字段）
  * 支持OS X 10.7及以上版本（10.4 - 10.6不需要）
* [BrightnessKeys](https://github.com/acidanthera/BrightnessKeys/releases)
  * 自动修复亮度键

请参考[kexts.md](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Kexts.md)（或OpenCore中的`Docs\Kexts.md`获取支持的完整kext列表

## SSDTs

你在AcpiSamples文件夹中看到所有的SSDT，想知道你是否需要它们。对于我们来说，我们将讨论**在config.plist的特定ACPI部分中需要哪些SSDT**，因为所需的SSDT是特定于平台的。有一些系统特定的地方需要配置，如果我现在给你一个SSDT列表供你选择，你很容易迷路。

[ACPI入门](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/)有一个关于SSDT的扩展部分，包括在不同平台上编译它们。

一个所需SSDT的快速TL;DR（这是源代码，你必须将它们编译成一个.aml文件）：

### 台式机

| 平台 | **CPU** | **EC** | **AWAC** | **NVRAM** | **USB** |
| :-------: | :-----: | :----: | :------: | :-------: | :-----: |
| Penryn | N/A | [SSDT-EC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A | N/A |
| Lynnfield和Clarkdale | ^^ | ^^ | ^^ | ^^ | ^^ |
| Sandy Bridge | [CPU-PM](https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management)（安装后运行） | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake | ^^ | ^^ | [SSDT-AWAC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/awac.html) | [SSDT-PMC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | N/A | [SSDT-RHUB](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/rhub.html) |
| AMD (15/16h) | N/A | ^^ | N/A | ^^ | N/A |
| AMD (17/19h) | [SSDT-CPUR for B550 and A520](https://github.com/xuanxuan1231/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-CPUR.aml) | ^^ | ^^ | ^^ | ^^ |

### 高端台式机

| 平台 | **CPU** | **EC** | **RTC** | **PCI** |
| :-------: | :-----: | :----: | :-----: | :-----: |
| Nehalem和Westmere | N/A | [SSDT-EC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A |
| Sandy Bridge-E | ^^ | ^^ | ^^ | [SSDT-UNC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/unc0) |
| Ivy Bridge-E | ^^ | ^^ | ^^ | ^^ |
| Haswell-E | [SSDT-PLUG](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/plug.html) | [SSDT-EC-USBX](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-RTC0-RANGE](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ |
| Broadwell-E | ^^ | ^^ | ^^ | ^^ |
| Skylake-X | ^^ | ^^ | ^^ | N/A |

### 笔记本

| 平台 | **CPU** | **EC** | **Backlight** | **I2C Trackpad** | **AWAC** | **USB** | **IRQ** |
| :-------: | :-----: | :----: | :-----------: | :--------------: | :------: | :-----: | :-----: |
| Clarksfield和Arrandale | N/A | [SSDT-EC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-PNLF](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | N/A | N/A | N/A | [IRQ SSDT](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/irq.html) |
| Sandy Bridge | [CPU-PM](https://xuanxuan1231.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management)（安装后运行） | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | [SSDT-GPI0](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Laptops/trackpad.html) | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ | ^^ | N/A |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake（8th Gen）和Whiskey Lake | ^^ | ^^ | [SSDT-PNLF](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | ^^ | [SSDT-AWAC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ | ^^ |
| Coffee Lake（9th Gen） | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ice Lake | ^^ | ^^ | ^^ | ^^ | ^^ | [SSDT-RHUB](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/rhub.html) | ^^ |

续表：

| 平台 | **NVRAM** | **IMEI** |
| :-------: | :-------: | :------: |
| Clarksfield和Arrandale | N/A | N/A |
| Sandy Bridge | ^^| [SSDT-IMEI](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/imei.html) |
| Ivy Bridge | ^^ | ^^ |
| Haswell | ^^ | N/A |
| Broadwell | ^^ | ^^ |
| Skylake | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ |
| Coffee Lake（8th Gen）和Whiskey Lake | ^^ | ^^ |
| Coffee Lake（9th Gen） | [SSDT-PMC](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | N/A | ^^ |
| Ice Lake | ^^ | ^^ |

# 现在所有这些都完成了，前往[ACPI入门](https://xuanxuan1231.github.io/Getting-Started-With-ACPI/)
