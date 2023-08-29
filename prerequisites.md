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
4. <span style="color:red">_**[重要]**_</span> A machine that is compatible as seen in the _**Compatibility**_ section.
   * [Hardware Limitations page](macos-limits.md)
5. <span style="color:red">_**[重要]**_</span> A minimum of:
   * 16GB USB if you're going to use macOS to create the USB
   * 4GB USB if you're going to use Windows or Linux for USB creation
6. <span style="color:red">_**[重要]**_</span> An **Ethernet connection** (no WiFi dongles, Ethernet USB adapter may work depending on macOS support) and you must know your LAN card's model
   * You must either have a physical Ethernet port, or a compatible macOS Ethernet dongle/adapter. In case you have a [compatible WiFi card](https://dortania.github.io/Wireless-Buyers-Guide/), you can also use that.
     * Note the majority of WiFi cards are not supported by macOS
   * For people who can't use ethernet but have an Android phone, you can connect your Android phone to WiFi and then tether it using USB with [HoRNDIS](https://joshuawise.com/horndis#available_versions).
7. <span style="color:red">_**[重要]**_</span> **Proper OS Installation:**
   * Be it:
     * macOS (a fairly recent one would be better)
     * Windows (Windows 10, 1703 or newer)
     * Linux (Clean and properly functioning, with Python 2.7 or later)
   * For Windows or Linux users, **15GB** of free space on the drive you're working on. On Windows, your OS disk (C:) must have at least **15GB** of free space.
   * For macOS users, **30GB** of free space on the system's drive.
   * Most tools used in this guide will also require [Python installed](https://www.python.org/downloads/)
8. <span style="color:red">_**[重要]**_</span> **Latest BIOS installed**
   * In most cases, updating your BIOS will provide the best support for macOS
   * The exception to this are MSI 500-series AMD motherboards, read more at [Motherboard Support](macos-limits.md#motherboard-support)
