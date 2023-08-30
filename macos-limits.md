# 硬件限制

对于macOS，在开始安装之前，您需要了解许多硬件限制。这是由于Apple支持的硬件数量有限，所以我们不是受到Apple的限制，就是受到社区创建的补丁的限制。

要验证的主要硬件部分有:

[[toc]]

有关该主题的更详细指南，请参阅此处:

* [显卡购买指南](https://xuanxuan1231.github.io/GPU-Buyers-Guide/)
  * 检查你的显卡是否受支持，以及你可以运行哪个macOS版本。
* [无线网卡购买指南](https://xuanxuan1231.github.io/Wireless-Buyers-Guide/)
  * 检查是否支持您的无线网卡卡。
* [购买踩坑指南](https://xuanxuan1231.github.io/Anti-Hackintosh-Buyers-Guide/)
  * 关于应该避免什么以及硬件可能遇到的坑的总体指南。

## 处理器支持

对于CPU支持，我们有以下细分:

* 支持32位和64位CPU
  * 但是，这需要操作系统支持您的体系结构，请参阅下面的CPU要求部分
* 支持Intel台式机CPU。
  * 本指南提供Yonah Lake至Comet Lake支持。
* Intel高端台式机（HEDT）和服务器CPU。
  * 本指南提供Nehalem至Cascade Lake X支持。
* Intel酷睿"i"和至强系列笔记本CPU
  * 本指南提供Arrandale至Ice Lake支持
  * 请注意，Mobile Atoms、赛扬和奔腾cpu不支持
* AMD台式机Bulldozer (15h), Jaguar (16h) 和Ryzen (17h) CPU
  * **不支持**AMD笔记本CPU
  * 注意，AMD并不支持macOS的所有功能，见下文

**如欲了解更多详情，请参阅此处:[购买踩坑指南](https://xuanxuan1231.github.io/Anti-Hackintosh-Buyers-Guide/)**

::: details CPU要求

架构需求

* 10.4.1 ~ 10.6.8版本支持32位cpu
  * 注意10.7.x需要64位用户空间，将32位CPU限制在10.6及以下
* 注意10.7。x需要64位用户空间，将32位cpu限制为10.6

SSE要求:

* 所有Intel版本的OS X/macOS都需要SSE3
* 所有64位版本的OS X/macOS都需要SSSE3
  * 对于缺少SSSE3的CPU(即某些64位奔腾)，我们建议运行32位用户空间(`i386-user32`)
* 对于缺少SSSE3的cpu(即某些64位奔腾)，我们建议运行32位用户空间(`i386-user32`)
* 需要SSE4.2
  * [telemtrap.kext](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/post-28447707)支持SSE4.1 cpu
  * 较新的AMD驱动程序也需要SSE4.2 for Metal支持。要解决这个问题，请参见这里:[MouSSE: SSE4.2 emulation](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/)

固件要求:

* OS X 10.4.1到10.4.7需要EFI32(即IA32(32位)版本的OpenCore)
  * OS X 10.4.8到10.7.5支持EFI32和EFI64
* OS X 10.8及更新版本需要EFI64(即x64(64位)版本的OpenCore)
* OS X 10.7到10.9需要OpenPartitionDxe.efi启动Recovery分区

内核要求:

* OS X 10.4和10.5由于只支持32位内核空间，所以需要32位的kext
  * OS X 10.6和10.7同时支持32位和64位内核空间
* OS X 10.8及更新版本由于只支持64位内核空间，所以需要64位的kext
  * 运行`lipo -archs`来了解您的kext支持的体系结构(记住要在二进制文件本身上运行，而不是在.kext包上运行)

核心/线程数限制:

* OS X 10.10及以下版本可能无法引导超过24个线程(由`mp_cpus_call_wait() timeout` panic显示)
* OS X 10.11及更新版本有64个线程限制
* `cpus=` 引导参数可用作变通方法，或禁用超线程

特别指出:

* Lilu和插件需要10.8或更新版本才能运行
  * 我们建议在旧版本的OS X上运行FakeSMC
* OS X 10.6及更老版本需要启用RebuildAppleMemoryMap
  * 这是为了解决早期的内核问题

:::

::: details 英特尔CPU支持图

基于原生内核支持(即没有修改):

| CPU代数 | 最初支持 | 最后支持版本 | 注意 | CPUID |
| :--- | :--- | :--- | :--- | :--- |
| [Pentium 4](https://en.wikipedia.org/wiki/Pentium_4) | 10.4.1 | 10.5.8 | 仅用于开发工具包 | 0x0F41 |
| [Yonah](https://en.wikipedia.org/wiki/Yonah_(microprocessor)) | 10.4.4 | 10.6.8 | 32位 | 0x0006E6 |
| [Conroe](https://en.wikipedia.org/wiki/Conroe_(microprocessor)), [Merom](https://en.wikipedia.org/wiki/Merom_(microprocessor)) | 10.4.7 | 10.11.6 | 无SSE4 | 0x0006F2 |
| [Penryn](https://en.wikipedia.org/wiki/Penryn_(microarchitecture)) | 10.4.10 | 10.13.6 | 无SSE4.2 | 0x010676 |
| [Nehalem](https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)) | 10.5.6 | <span style="color:green"> 当前 </span> | N/A | 0x0106A2 |
| [Lynnfield](https://en.wikipedia.org/wiki/Lynnfield_(microprocessor)), [Clarksfield](https://en.wikipedia.org/wiki/Clarksfield_(microprocessor)) | 10.6.3 | ^^ | 没有支持10.14+的核芯显卡 | 0x0106E0 |
| [Westmere, Clarkdale, Arrandale](https://en.wikipedia.org/wiki/Westmere_(microarchitecture)) | 10.6.4 | ^^ | ^^ | 0x0206C0 |
| [Sandy Bridge](https://en.wikipedia.org/wiki/Sandy_Bridge) | 10.6.7 | ^^ | ^^ | 0x0206A0(M/H) |
| [Ivy Bridge](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.7.3 | ^^ | 没有支持12+的核芯显卡 | 0x0306A0(M/H/G) |
| [Ivy Bridge-E5](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.9.2 | ^^ | N/A | 0x0306E0 |
| [Haswell](https://en.wikipedia.org/wiki/Haswell_(microarchitecture)) | 10.8.5 | ^^ | ^^ | 0x0306C0(S) |
| [Broadwell](https://en.wikipedia.org/wiki/Broadwell_(microarchitecture)) | 10.10.0 | ^^ | ^^ | 0x0306D4(U/Y) |
| [Skylake](https://en.wikipedia.org/wiki/Skylake_(microarchitecture)) | 10.11.0 | ^^ | ^^ | 0x0506e3(H/S) 0x0406E3(U/Y) |
| [Kaby Lake](https://en.wikipedia.org/wiki/Kaby_Lake) | 10.12.4 | ^^ | ^^ | 0x0906E9(H/S/G) 0x0806E9(U/Y) |
| [Coffee Lake](https://en.wikipedia.org/wiki/Coffee_Lake) | 10.12.6 | ^^ | ^^ | 0x0906EA(S/H/E) 0x0806EA(U)|
| [Amber](https://en.wikipedia.org/wiki/Kaby_Lake#List_of_8th_generation_Amber_Lake_Y_processors), [Whiskey](https://en.wikipedia.org/wiki/Whiskey_Lake_(microarchitecture)), [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.14.1 | ^^ | ^^ | 0x0806E0(U/Y) |
| [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.15.4 | ^^ | ^^ | 0x0906E0(S/H)|
| [Ice Lake](https://en.wikipedia.org/wiki/Ice_Lake_(microprocessor)) | ^^ | ^^ | ^^ | 0x0706E5(U) |
| [Rocket Lake](https://en.wikipedia.org/wiki/Rocket_Lake) | ^^ | ^^ | 需要Comet Lake CPUID | 0x0A0671 |
| [Tiger Lake](https://en.wikipedia.org/wiki/Tiger_Lake_(microprocessor)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> 未测试 </span> | 0x0806C0(U) |

:::

::: details macOS中的AMD CPU限制

不幸的是，macOS中的许多功能完全不受AMD的支持，还有许多功能部分被破坏。这些包括:

* 依赖AppleHV的虚拟机
  * 这包括VMWare, Parallels, Docker, Android Studio等
  * VirtualBox是唯一的例外，因为他们有自己的管理程序
  * VMware 10和Parallels 13.1.0确实支持它们自己的虚拟机管理程序，但是使用这些过时的虚拟机软件会带来很大的安全威胁
* Adobe支持
  * 大多数Adobe的套件依赖于英特尔的Memfast指令集，导致在使用AMD cpu时崩溃
  * 您可以禁用RAW支持等功能以避免崩溃:[Adobe修复](https://gist.github.com/naveenkrdy/26760ac5135deed6d0bb8902f6ceb6bd)
* 32位支持
  * 对于那些在Mojave及以下版本中仍然依赖32位软件的用户，请注意原生补丁不支持32位指令
  * 一个解决办法是安装一个[自定义内核](https://files.amd-osx.com/?dir=Kernels)，但是你失去了iMessage支持，并且没有为这些内核提供的支持
* 许多应用程序的稳定性问题
  * 基于音频的应用最容易出现问题。例如Logic Pro
  * DaVinci Resolve也有零星的问题

:::

## 显卡支持

由于市场上GPU的数量几乎是无限的，所以对显卡的支持变得更加复杂，但总体分解如下:

* 最新版本的macOS支持AMD基于GCN的显卡
  * 但是不支持AMD APU
  * AMD[基于Lexa的内核](https://www.techpowerup.com/gpu-specs/amd-lexa.g806)的Polaris系列的也不支持
  * MSI Navi用户的特别注意事项:[安装程序无法与5700XT #901一起工作](https://github.com/acidanthera/bugtracker/issues/901)
    * 这个问题在macOS 11(Big Sur)中不再存在。
* NVIDIA显卡支持是复杂的:
  * [Maxwell(9XX)](https://en.wikipedia.org/wiki/GeForce_900_series)和[Pascal(10XX)](https://en.wikipedia.org/wiki/GeForce_10_series) 显卡仅限于macOS 10.13: High Sierra
  * [NVIDIA Turing(20XX](https://en.wikipedia.org/wiki/GeForce_20_series),[16XX)](https://en.wikipedia.org/wiki/GeForce_16_series) 显卡**所有的macOS版本都不支持**
  * [NVIDIA's Ampere(30XX)](https://en.wikipedia.org/wiki/GeForce_30_series) 显卡**所有的macOS版本都不支持**
  * [NVIDIA's Kepler(6XX,](https://en.wikipedia.org/wiki/GeForce_600_series)[7XX)](https://en.wikipedia.org/wiki/GeForce_700_series) 显卡支持到macOS 11: Big Sur
* Intel [GT2+ tier](https://en.wikipedia.org/wiki/Intel_Graphics_Technology)系列核芯显卡
  * 本指南涵盖了从Ivy Bridge到Ice Lake的核芯显卡支持
    * 关于GMA系列核芯显卡的更多信息，可以在这里找到:[GMA补丁](https://xuanxuan1231.github.io/OpenCore-Post-Install/gpu-patching/)
  * 注意GT2指的是核芯显卡的层级，低端GT1的核芯显卡在奔腾、赛扬和Atom上是不支持的

对于**带有独立显卡的笔记本电脑**，还有一个重要的提示:

* 90%的独立显卡无法工作，因为它们连接在macOS不支持的配置中(可切换图形)。对于NVIDIA分立显卡，这通常被称为Optimus。不可能将这些分立的显卡用于内部显示，因此通常建议禁用它们并关闭它们(将在本指南的后面介绍)。
* 然而，在某些情况下，为任何外部输出(HDMI, mini DisplayPort等)分立GPU供电时可能工作，也可能不工作;在这种情况下，如果它工作，你将不得不保持卡运行。
* 然而，有些笔记本电脑很少没有可切换的显卡，所以可以使用独立显卡(如果macOS支持的话)，但接线和设置通常会引起问题。

**有关支持的GPU的完整列表，请参阅[显卡购买指南](https://xuanxuan1231.github.io/GPU-Buyers-Guide/)**

::: details Intel显卡支持列表

| 显卡代数 | 最初支持 | 最后支持版本 | 注意 |
| :--- | :--- | :--- | :--- |
| [第3代GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Third_generation) | 10.4.1 | 10.7.5 | [需要32位内核和补丁](https://xuanxuan1231.github.io/OpenCore-Post-Install/gpu-patching/legacy-intel/) |
| [第4代GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen4) | 10.5.0 | ^^ | ^^ |
| [Arrandale(高清显卡)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen5) | 10.6.4 | 10.13.6 | 只支持LVDS，不支持eDP和外部输出 |
| [Sandy Bridge(HD 3000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen6) | 10.6.7 | ^^ | N/A |
| [Ivy Bridge(HD 4000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.7.3 | 11.7.x | ^^ |
| [Haswell(HD 4XXX, 5XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.8.5 | 12.6.x | ^^ |
| [Broadwell(5XXX, 6XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen8) | 10.10.0 | ^^ | ^^ |
| [Skylake(HD 5XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.11.0 | ^^ | ^^ |
| [Kaby Lake(HD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.12.4 | <span style="color:green"> 当前 </span> | ^^ |
| [Coffee Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.13.6 | ^^ | ^^ |
| [Comet Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.15.4 | ^^ | ^^ |
| [Ice Lake(Gx)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen11) | 10.15.4 | ^^ | 需要引导参数`-igfxcdc`和`-igfxdvmt` |
| [Tiger Lake(Xe)](https://en.wikipedia.org/wiki/Intel_Xe) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> 无可用驱动程序 </span> |
| [Rocket Lake](https://en.wikipedia.org/wiki/Rocket_Lake) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> 无可用驱动程序 </span> |

:::

::: details AMD显卡支持列表

| 显卡代数 | 最初支持 | 最后支持版本 | 注意 |
| :--- | :--- | :--- | :--- |
| [X800](https://en.wikipedia.org/wiki/Radeon_X800_series) | 10.3.x | 10.7.5 | 需要32位内核 |
| [X1000](https://en.wikipedia.org/wiki/Radeon_X1000_series) | 10.4.x | ^^ | N/A |
| [TeraScale](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [TeraScale 2/3](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.6.x | ^^ | ^^ |
| [GCN 1](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.8.3 | 12.6.x | ^^ |
| [GCN 2/3](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.10.x | ^^ | ^^ |
| [Polaris 10](https://en.wikipedia.org/wiki/Radeon_RX_400_series), [20](https://en.wikipedia.org/wiki/Radeon_RX_500_series) | 10.12.1 | <span style="color:green"> 当前 </span> | ^^ |
| [Vega 10](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.12.6 | ^^ | ^^ |
| [Vega 20](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.14.5 | ^^ | ^^ |
| [Navi 10](https://en.wikipedia.org/wiki/Radeon_RX_5000_series) | 10.15.1 | ^^ | 需要引导参数`agdpmod=pikera` |
| [Navi 20](https://en.wikipedia.org/wiki/Radeon_RX_6000_series) | 11.4 | ^^ | <span style="color:yellow"> 目前只有一些Navi 21型号可以工作 </span> |

:::

::: details NVIDIA显卡支持列表

| 显卡代数 | 最初支持 | 最后支持版本 | 注意 |
| :--- | :--- | :--- | :--- |
| [GeForce 6](https://en.wikipedia.org/wiki/GeForce_6_series) | 10.2.x | 10.7.5 | 需要32位内核和[NVCAP补丁](https://xuanxuan1231.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [GeForce 7](https://en.wikipedia.org/wiki/GeForce_7_series) | 10.4.x | ^^ | [需要打NVCAP补丁](https://xuanxuan1231.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [Tesla](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Tesla v2](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)#Tesla_2.0) | 10.5.x | ^^ | ^^ |
| [Fermi](https://en.wikipedia.org/wiki/Fermi_(microarchitecture)) | 10.7.x | ^^ | ^^ |
| [Kepler](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.7.x | 11.7.x | N/A |
| [Kepler v2](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.8.x | ^^ | ^^ |
| [Maxwell](https://en.wikipedia.org/wiki/Maxwell_(microarchitecture)) | 10.10.x | 10.13.6 | [需要NVIDIA网络驱动](https://www.nvidia.com/download/driverResults.aspx/149652/) |
| [Pascal](https://en.wikipedia.org/wiki/Pascal_(microarchitecture)) | 10.12.4 | ^^ | ^^ |
| [Turing](https://en.wikipedia.org/wiki/Turing_(microarchitecture)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> 无可用驱动程序 </span> |
| [Ampere](https://en.wikipedia.org/wiki/Ampere_(microarchitecture)) | ^^ | ^^ | ^^ |

:::

## 主板支持

在大多数情况下，只要支持CPU，就支持所有主板。

::: details MSI 500系列AMD主板说明

~~唯一的例外是MSI 500系列AMD主板(A520, B550和X570)。这些主板在macOS Monterey及以上版本上有问题:~~

* ~~PCIe设备并不总是被正确枚举~~
* ~~Zen 3的BIOS更新支持中断引导~~

~~对于这些主板，我们建议使用macOS Big Sur或更早版本。~~

感谢CaseySJ，这已经在最新版本的AMD原生补丁中修复了!

:::

## 存储支持

在大多数情况下，支持所有基于SATA的驱动器和大多数NVMe驱动器。只有少数例外:

* **三星PM981、PM991和美光2200S NVMe固态硬盘**
  * 这些SSD不兼容开箱即用(导致kernel panic)，因此需要[NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases)来修复这些kernel panic。请注意，即使使用NVMeFix.kext，这些驱动器仍然可能导致启动问题。
  * 与此相关的是，三星970 EVO Plus NVMe固态硬盘也有同样的问题，但在固件更新中得到了修复;[在这里](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/)获取更新(Windows下的Samsung Magician或可引导ISO)。
  * 同样需要注意的是，使用[Intel Optane Memory](https://www.intel.com/content/www/us/en/architecture-and-technology/optane-memory.html)或[Micron 3D XPoint](https://www.micron.com/products/advanced-solutions/3d-xpoint-technology)进行硬盘加速的笔记本电脑在macOS中是不支持的。一些用户报告说，在Catalina中甚至可以成功地读写支持，但我们强烈建议删除驱动器，以防止任何潜在的启动问题。
    * 请注意，如果在macOS中禁用Optane部分，则英特尔Optane Memory H10/H20型号兼容。更多信息可以在[这里](https://blog.csdn.net/weixin_46341175/article/details/126626808)找到([原文](https://zhuanlan.zhihu.com/p/429073173))。
  
* **Intel 600p**
  * 虽然不是无法启动，但请注意此型号可能会导致许多问题。[Any fix for Intel 600p NVMe Drive? #1286](https://github.com/acidanthera/bugtracker/issues/1286)
  * 660p的型号没问题

## 有线网络

实际上，所有有线网络适配器在macOS中都有某种形式的支持，不是有内置驱动程序，就是有社区制作的kext。主要的例外情况:

* Intel I225 2.5Gb NIC
  * 在HEDT Comet Lake主板上发现
  * 解决方案是可能的:[源](https://www.hackintosh-forum.de/forum/thread/48568-i9-10900k-gigabyte-z490-vision-d-er-läuft/?postID=606059#post606059)和[示例](config.plist/comet-lake.md#deviceproperties)
* Intel I350 1Gb服务器网卡
  * 通常存在于英特尔和超微的服务器主板的各个代数
  * [解决方案](config-HEDT/ivy-bridge-e.md#deviceproperties)
* Intel 10Gb服务器网卡
  * [X520和X540芯片组](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/)的解决方案是可能的
* Mellanox和Qlogic服务器网卡

## 无线网络

大多数笔记本电脑自带的WiFi卡都不支持，因为它们通常是英特尔（Intel）或高通（Qualcomm）的。如果幸运的话，您可能有一个受支持的Atheros卡，但支持只运行到High Sierra。

最好的选择是获得支持的博通（Broadcom）卡;请参阅[无线网卡购买指南](https://xuanxuan1231.github.io/Wireless-Buyers-Guide/)获取建议。

注意:在macOS上Intel WiFi有非官方的(第三方驱动程序)支持，查看[无线网卡购买指南](https://xuanxuan1231.github.io/Wireless-Buyers-Guide/)了解更多关于驱动程序和支持卡的信息。

## 其他

* **指纹传感器**
  * 目前还没有办法模拟Touch ID传感器，所以指纹传感器将无法工作。
* **Windows Hello人脸识别**
  * 一些笔记本电脑带有I2C连接的WHFR(并通过核芯显卡使用)，这些将无法工作。
  * 有些笔记本电脑带有USB连接的WHFR，如果幸运的话，你可能有相机功能，但没有其他功能。
* **英特尔智能音响技术**
  * 带有英特尔SST的笔记本电脑将没有任何连接通过它们(通常是内部麦克风)工作，因为它不支持。你可以用Windows上的设备管理器检查。
* **耳机插孔组合**
  * 一些带有组合耳机插孔的笔记本电脑可能无法通过它们输入音频，必须使用内置麦克风或通过USB连接外部音频输入设备。
* **Thunderbolt USB-C接口**
  * (黑苹果) macOS对Thunderbolt的支持目前仍不确定，对Alpine Ridge控制器的支持更是如此，目前大多数笔记本电脑都有这种控制器。有人尝试让控制器保持开机状态，这样就可以让Thunderbolt和USB-C热插拔工作，但这是以kernel panic和/或USB-C在睡眠后断开为代价的。如果你想使用端口的USB-C端并且能够睡眠，你必须在启动时插入并保持插入状态。
  * 注意:这不适用于仅USB-C端口-仅适用于Thunderbolt 3和USB-C组合端口。
  * 在BIOS中禁用Thunderbolt也可以解决这个问题。
