# 术语

术语 | 描述
--- | ---
**macOS**        | 苹果自己的基于UNIX的操作系统，用于Mac机器，并且是“让Mac成为Mac的东西”。  
**Windows**      | 微软的专有操作系统，在许多设备上使用和支持(如果你不想头疼，就继续使用这个操作系统)  
**Linux**        | 基于Linux内核的开源类unix操作系统家族，Linux内核是由Linus Torvalds于1991年9月17日首次发布的操作系统内核。Linux通常打包在Linux发行版中。请注意，虽然macOS和Linux可能是基于unix的，但它们有很大的不同。
**Distros**      | 发行版的简称。Linux发行版是Linux的发行方式。然而，当谈到macOS时，发行版混合了macOS安装程序和一堆不是来自苹果的工具。**不要使用“macOS发行版”**
**黑苹果**   | 将macOS安装到PC上的过程，请注意**黑苹果不是操作系统**，它也可以指被“黑掉”以在其上运行macOS的机器。比如：*我在这台Windows机器上安装了macOS，所以我有一个黑苹果。但是我没有安装“黑苹果”。*  
**引导加载程序**   | 加载操作系统的软件，通常由操作系统创建者制作。从技术上讲，OpenCore本身不是引导加载程序(参见下面的引导管理器解释)。Apple的Boot.efi将是Mac或黑苹果中实际的引导加载程序。
**启动管理器** | 一个管理引导加载程序的软件-我们有很多这样的:Clover, systemd-boot, OpenCore, rEFInd, rEFIt…这些通常被看作是为实际的引导加载程序准备系统。
---
术语 | 描述
--- | ---
**OpenCore**   | 黑苹果场景的新热点，由[Acidanthera团队](https://github.com/acidanthera)考虑到安全性后开发，启动速度更快，重量比Clover轻。它需要做更多的工作来设置，但也支持许多比Clover更原生的东西(如休眠，文件保险箱2，启动热键…)。
**Clover**  | 一个引导管理器，现在被认为是OpenCore发布的遗留问题。本指南将不涉及该软件的使用。
**ACPI**  | 高级配置和电源接口(Advanced Configuration and Power Interface, ACPI)提供了一个开放标准，操作系统可以使用它来发现和配置计算机硬件组件，本指南后面将讨论更多这方面的内容。
**DSDT/SSDT** | ACPI中的表描述了设备以及操作系统应该如何与它们交互，例如将计算机置于睡眠状态，唤醒状态，切换显卡, USB端口。
**.AML** | ACPI的编译文件格式，以及你的电脑将执行什么。`.DAT`是另一个具有完全相同用途的扩展名。
**.DSL** | ACPI 的源代码–这是您为计算机编辑和编译的内容。**不要**将此文件的扩展名混合为“.ASL'.
**Kexts**   | 也称为**K**ernel **Ext**ension（内核扩展），是macOS的驱动程序。它们用于执行不同的任务，如设备驱动程序，或用于不同的目的(在黑苹果中)，如为操作系统打补丁，注入信息或运行任务。kext并不是优秀的黑苹果的唯一组成部分，因为它们通常与ACPI补丁和修复一起使用。
**BIOS**  | 基本输入输出系统（The Basic Input/Output System）是用于在启动过程(上电启动)中执行硬件初始化，并为操作系统和程序提供运行时服务的固件。BIOS固件预装在个人电脑的系统板上，它是第一个开机运行的软件(来源:维基百科)。这是一个70年代制作的遗留软件，由于它的成熟，至今仍在使用。
**UEFI**  | 统一可扩展固件接口UEFI (Unified Extensible Firmware Interface)是定义操作系统与平台固件之间软件接口的规范。传统BIOS (Basic Input Output System)固件接口存在于所有兼容IBM pc的个人电脑中，而UEFI将其替换为支持传统BIOS服务的固件实现。UEFI可以支持远程诊断和维修电脑,即使没有安装操作系统。(来源:维基百科)
**UEFI驱动** | 像其他操作系统一样，UEFI有驱动程序，它们由Clover或OpenCore加载。他们也意味着加载设备或执行其他任务，比如用HfsPlus.efi装载Apple HFS驱动器，修补macOS的`boot.efi`等等。你可能会发现它们是“Clover驱动”或“OpenCore驱动”，它们都是UEFI驱动程序。（注意:只使用针对特定引导管理器的驱动程序。更多信息可以在[Clover转换页面](https://github.com/xuanxuan1231/OpenCore-Install-Guide/tree/master/clover-conversion)找到）。
---
术语 | 描述
--- | ---
**EFI**   | 它可以表示两件事: <br/>- Mac的固件，与UEFI相同，但修改了很多，只适用于Mac，所以不那么“通用”。<br/>- 硬盘上存储UEFI读取用于加载操作系统（如Windows引导加载程序）或UEFI应用程序（如OpenCore）的软件的分区，它是FAT32格式的，ID类型为`EF00`（十六进制）。它可以被命名为ESP或SYSTEM，通常大小在100MB到400MB之间，但大小不影响任何东西。
**MBR**   | 主引导记录（Master Boot Record）是一种特殊类型的引导扇区，位于分区计算机大容量存储设备(如固定磁盘或可移动驱动器，用于IBM pc兼容系统或其他系统)的最开始。MBR于1983年首次引入PC DOS 2.0。MBR保存了有关包含文件系统的逻辑分区在该介质上如何组织的信息。MBR还包含可执行代码，用于作为安装的操作系统的加载程序——通常通过将控制传递到加载程序的第二阶段，或者与每个分区的卷引导记录(VBR)结合起来。这个MBR代码通常被称为引导加载程序(source: Wikipedia)。这种格式用于BIOS/Legacy设置。MBR格式支持最多2 TiB的大小和最大的4个主分区。
**GPT**   | GUID分区表（GPT,GUID Partition Table）是计算机物理存储设备(如硬盘、固态硬盘等)分区表布局的标准，使用了通用唯一标识符(universally unique identifier)，也称为全球唯一标识符(GUIDs)。作为统一可扩展固件接口(UEFI)标准的一部分(统一EFI论坛提出的PC BIOS的替代品)，它仍然被用于一些BIOS系统，因为主引导记录(MBR)分区表的限制，它使用32位来对传统的512字节磁盘扇区进行逻辑块寻址(LBA)(来源:Wikipedia)。通常，这是你想在UEFI系统上使用的磁盘格式。
---
术语 | 描述
--- | ---
**EC** | 嵌入式控制器。主板和嵌入式外设(如热键、端口或电池)之间的通信。
**PLUG** | 允许XCPM,苹果XNU(操作系统内核)电源管理,将允许更好的CPU控制。仅支持Haswell和更新版本。
**AWAC** | ACPI唤醒闹钟计数器，主板的内部时钟。与实时时钟(RTC)相比。macOS不能与AWAC时钟,所以他们必须修补。
**PMC** | 电源管理控制器，在B360, B365, H310, H370, Z390主板上，OEM忘记映射此区域，因此需要SSDT-PMC来避免页面错误
**PNLF** | 内部背光显示，macOS使用此PNLF设备发送和接收亮度控制信息
**XOSI/_OSI** | `_OSI`用于确定正在引导的是什么操作系统，重命名为XOSI允许我们欺骗硬件，使其认为我们正在引导一个不同的操作系统
**HPET** | 高精度事件定时器，操作系统使用它来确定如何与设备通信(IRQ)。macOS对设备的设置可能非常挑剔，因此我们有时需要为HPET打补丁。
**RHUB** | 根USB集线器，其中定义了USB端口。如果这里缺少某些定义，USB端口可能无法在macOS中工作
**IMEI** | 英特尔管理引擎接口，处理杂项任务。在macOS中，Apple依靠IMEI来实现英特尔GPU的加速。如果使用一个未知的ID和Sandy Bridge使用7系列芯片组,macOS GPU加速将无法找到它。
**UNC** | Uncore Bridge，类似于North Bridge，它处理许多与缓存相关的函数。很多时候，OEM会定义这个设备，但没有功能，macOS无法处理这些情况。
**SMBus** | Uncore Bridge，类似于North Bridge，它处理许多与缓存相关的函数。很多时候，oem会定义这个设备，但没有功能，macOS无法处理这些情况。
