# 开始使用OpenCore

在我们开始制作基于OpenCore的系统之前，我们需要先了解一些事情。

## 先决条件

1. <span style="color:red">_**[重要]**_</span> 时间和耐心。
   * 如果你有截止日期或重要的工作，不要开始做这个。你不应该把Hackintosh当作工作机器来依赖。
2. <span style="color:red">_**[重要]**_</span> **知道你的硬件**
   * 你的CPU名称
   * 你的图形卡
   * 你的存储设备(HDD/SSD, NVMe/AHCI/RAID/IDE配置)
   * 你的笔记本/台式机型号（如果是从OEM厂商获得）
   * 你的**有线网卡**
   * 你的无线/蓝牙卡
3. <span style="color:red">_**[重要]**_</span> **基本的命令行知识，以及如何使用终端/命令提示符**
   * 这不仅是[重要]，这是整个指南的基础。如果您不知道如何`cd`到目录或删除文件，我们无法帮助您。
4. <span style="color:red">_**[重要]**_</span> 在_**兼容性**_一节中看到的兼容的机器。
   * [硬件限制页面](macos-limits.md)
5. <span style="color:red">_**[重要]**_</span> 至少：
   * 16GB USB（使用macOS创建USB时）
   * 4GB USB（使用Windows或Linux创建USB时）
6. <span style="color:red">_**[重要]**_</span> **以太网连接** (没有WiFi加密狗，以太网USB适配器可能工作取决于macOS支持)，并且你必须知道你的网卡的型号
   * 您必须有一个物理以太网端口，或兼容的macOS以太网加密狗/适配器。如果你有[兼容的WiFi卡](https://xuanxuan1231.github.io/Wireless-Buyers-Guide/)你也可以使用它
     * 请注意，大多数WiFi卡不支持macOS
   * 对于不能使用以太网但有Android手机的人，你可以将Android手机连接到WiFi，然后使用USB连接。我们要用到[HoRNDIS](https://joshuawise.com/horndis#available_versions)。
7. <span style="color:red">_**[重要]**_</span> **正确安装操作系统:**
   * 具体是：
     * macOS(如果是最新的就更好了)
     * Windows (Windows 10, 1703或更高版本)
     * Linux (干净且功能正常，使用Python 2.7或更高版本)
   * 对于Windows或Linux用户，您需要正在使用的驱动器上空出**15GB**或以上的可用空间。在Windows上，系统盘(C:)必须有15GB或以上的可用空间。
   * 对于macOS用户，在系统磁盘上空出至少**30GB**的可用空间。
   * 本指南中的大部分工具都需要用到[Python](https://www.python.org/downloads/)
8. <span style="color:red">_**[重要]**_</span> **安装了最新版本的BIOS固件**
   * 在大多数情况下，更新BIOS将为macOS提供最好的支持
   * 这个例外是MSI 500系列AMD主板，在[主板支持](macos-limits.md#motherboard-support)部分阅读更多信息
