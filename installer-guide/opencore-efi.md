# 添加基本OpenCore文件

要设置OpenCore的文件夹结构，你需要在[OpenCorePkg的发布](https://github.com/acidanthera/OpenCorePkg/releases/)中找到EFI文件夹。请注意，它们将在IA32或X64文件夹下，前者用于32位固件，后者用于64位固件：

![](../images/installer-guide/opencore-efi-md/ia32-x64.png)

关于DEBUG与RELEASE版本：

* **DEBUG**：可以极大地帮助调试启动问题，但是可能会增加一些明显的启动时间延迟(例如:3-5秒到达拾取器)。安装后，您可以轻松地过渡到RELEASE
* **RELEASE**：更快的启动时间，但实际上没有提供有用的调试信息，使故障排除更加困难。

下载后，将EFI文件夹（从OpenCorePkg获取的）放在EFI分区的根目录上：

![](../images/installer-guide/opencore-efi-md/efi-moved.png)

**注意**:

* **Windows用户：**您将需要将EFI文件夹放在您之前制作的USB驱动器的根目录上
* **Linux用户：**这是我们之前创建的`OPENCORE`分区
  * 注意，方法1只创建了1个分区，而方法2创建了2个分区

现在让我们打开我们的EFI文件夹，看看里面是什么：

![根EFI文件夹](../images/installer-guide/opencore-efi-md/base-efi.png)

现在你会注意到它附带了一堆文件在`Drivers`和`Tools`文件夹中，我们不需要其中的大多数：

* **从Drivers文件夹保留以下文件**（如果兼容）：

| Driver | 状态 | 描述 |
| :--- | :--- | :--- |
| OpenUsbKbDxe.efi | <span style="color:#30BCD5"> 可选 </span> | 非EFI系统需要（2012以前） |
| OpenPartitionDxe.efi | ^^ | 启动macOS 10.7-10.9恢复所需 |
| ResetNvramEntry.efi | ^^ | 重置系统的NVRAM时需要 |
| OpenRuntime.efi | <span style="color:red"> 必需 </span> | 正常操作所需 |

::: details 提供的Drivers的更多信息

* AudioDxe.efi
  * 与macOS中的音频支持无关
* CrScreenshotDxe.efi
  * 用于在UEFI中创建快照，我们不需要
* HiiDatabase.efi
  * 用于修复GUI支持，如OpenShell。适用于Sandy Bridge和更老的系统
  * 启动时不需要
* NvmExpressDxe.efi
  * 用于Haswell和旧版本，当固件中没有内置NVMe驱动程序时
  * 不要使用，除非你知道你在做什么
* OpenCanopy.efi
  * 这是OpenCore的可选GUI，我们将在[安装后](https://xuanxuan1231.github.io/OpenCore-Post-Install/cosmetic/gui.html)中设置它，所以现在删除它
* OpenHfsPlus.efi
  * 开源的HFS Plus驱动程序，相当慢，所以我们建议不要使用，除非你知道你在做什么。
* OpenPartitionDxe.efi
  * 在启动OS X 10.7到10.9的恢复时需要
    * 注:OpenDuet用户（即没有UEFI）将内置这个驱动程序，不需要它
* OpenUsbKbDxe.efi
  * 用于**运行DuetPkg的旧系统**上的OpenCore启动器，[不推荐，在Ivy Bridge和更新的系统上甚至有害](https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653)
* Ps2KeyboardDxe.efi + Ps2MouseDxe.efi
  * 很明显，当你需要它时，USB键盘和鼠标用户不需要它
  * 提示：PS2 ≠ USB
* ResetNvramEntry.efi
  * 允许从引导选择器中重置NVRAM
* UsbMouseDxe.efi
  * 类似于OpenUsbKbDxe的想法，应该只需要在使用DuetPkg的遗留系统上
* XhciDxe.efi
  * 用于Sandy Bridge和旧版本，当固件中没有内置XHCI驱动程序时
  * 只有当你在旧机器上使用USB 3.0扩展卡时才需要

:::

* **从Tools文件夹保留以下文件：**

| Tool | 状态 | 解释 |
| :--- | :--- | :--- |
| OpenShell.efi | <span style="color:#30BCD5"> 可选 </span> | 推荐：更容易调试 |

整理后的EFI：

![清洁EFI](../images/installer-guide/opencore-efi-md/clean-efi.png)

现在你可以把你需要的固件驱动程序(.efi)放到 _Drivers_ 文件夹中，把Kext/ACPI放到它们各自的文件夹中。有关应该使用哪些文件的更多信息，请参阅[收集文件](../ktext.md)。

* 请注意，来自Clover的UEFI驱动程序不支持OpenCore！（EmuVariableUEFI, aptiommemoryfix, OsxAptioFixDrv等）。有关支持的驱动程序和合并到OpenCore中的驱动程序的更多信息，请参阅[Clover固件驱动程序转换](https://github.com/xuanxuan1231/OpenCore-Install-Guide/blob/master/clover-conversion/clover-efi.md)。

下面是一个被填充的EFI**_可以_**的样子（你的会有所不同）：

![已填充的EFI文件夹](../images/installer-guide/opencore-efi-md/populated-efi.png)

**提示**:

* SSDT和自定义DSDT（`.aml`）放在ACPI文件夹中
* Kext（`.kext`）放在Kexts文件夹中
* 固件驱动程序（`.efi`放在Drivers文件夹中

# 现在所有这些都完成了，前往[收集文件](../ktext.md)获取所需的kext和固件驱动程序
