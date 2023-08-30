# 查找你的硬件

本节主要是一个关于如何找到当前正在运行的硬件的迷你指南;这主要与笔记本电脑和预构建用户相关，因为硬件规格更难获得。如果你已经知道你有什么硬件，你可以跳过这一页，转到[创建USB](./installer-guide/)。

为此，我们假设您安装了Windows或Linux:

[[toc]]

## 使用Windows查找你的硬件

为此，我们主要有2种选择:

* Windows的内置设备管理器
* [AIDA64](https://www.aida64.com/downloads)

由于更容易使用GUI，我们建议下载AIDA64并运行它，因为它更容易获取规格。但是，我们将向您展示获取硬件规格的两种方法。

### CPU型号

| AIDA64                                                 | 设备管理器                                                |
|:-------------------------------------------------------|:--------------------------------------------------------------|
| ![](./images/finding-hardware-md/cpu-model-aida64.png) | ![](./images/finding-hardware-md/cpu-model-devicemanager.png) |

### 显卡型号

| AIDA64                                                 | 设备管理器                                                 |
|:-------------------------------------------------------|:--------------------------------------------------------------|
| ![](./images/finding-hardware-md/GPU-model-aida64.png) | ![](./images/finding-hardware-md/GPU-model-devicemanager.png) |

### 芯片组型号

| AIDA64                                                     | 设备管理器                                                     |
|:-----------------------------------------------------------|:------------------------------------------------------------------|
| ![](./images/finding-hardware-md/chipset-model-aida64.png) | ![](./images/finding-hardware-md/chipset-model-devicemanager.png) |

* 注意:基于英特尔SOC的CPU将在同一芯片上拥有芯片组和其他功能，而不是专用芯片。这意味着试图检测确切的芯片组有点困难

### 键盘，触控板和触摸屏连接类型

| 设备管理器                                                      |
|:-------------------------------------------------------------------|
| ![](./images/finding-hardware-md/trackpad-model-devicemanager.png) |

遗憾的是，AIDA64没有提供任何有关指针设备的有用信息，因此我们建议使用设备管理器。

* 你可以在下面找到这些设备:
  * `人体学接口设备（HID）`
  * `键盘`
  * `鼠标和其他指针设备`

* 要查看设备的确切连接类型，请选择指针设备，然后进入`查看 -> 按连接列出设备`。这将澄清它是否通过PS2, I2C, SMBus, USB等

根据设备的不同，它可能显示在多个名称和连接下。需要关注的主要问题有:
  
::: details SMBus
  
这些将显示为一个直接的PCI设备，如' Synaptics SMBus Driver '或' ELAN SMBus Driver '

* Synaptics设备将显示在PS2下的`Synaptics PS2 device`/`Synaptics Pointing Device`和PCI下的`Synaptics SMBus Driver`

![](./images/finding-hardware-md/Windows-SMBus-Device.png)

正如你所看到的，我们在左边的图像中得到了2个Synaptics设备，但是如果我们仔细观察，我们会发现顶部的设备是PS2，而底部的是SMBus。虽然你可以在任何一种模式下使用触控板，但SMBus通常提供更好的手势支持和准确性。

:::

::: details USB

| 按类型列出的设备 | 按连接方式划分的设备 |
| :--- | :--- |
| ![](./images/finding-hardware-md/USB-trackpad-normal.png) | ![](./images/finding-hardware-md/USB-trackpad-by-connection.png)

这些将显示为`PS2兼容的触控板`，当我们将连接视图切换到`设备连接`时，也会显示在USB下。

:::

::: details I2C

![](./images/finding-hardware-md/i2c-trackpad.png)
它们几乎总是显示为一个Microsoft HID device，但也可以显示为其他触控板。但它们总是会在I2C下出现。

:::
  
### 音频编解码器

| AIDA64                                                        | 设备管理器                                                    |
|:--------------------------------------------------------------|:------------------------------------------------------------------|
| ![](./images/finding-hardware-md/audio-controller-aida64.png) | ![](./images/finding-hardware-md/audio-controller-aida64.png.png) |

由于某些OEM提供设备名称的方式，您使用设备管理器获得最准确信息的方法是通过PCI ID(如pci 14F1, 50F4)。这意味着你需要搜索ID并找出确切的设备ID。但是AIDA64可以正确地呈现名称，这对最终用户来说相当容易。

### 网络控制器型号

| AIDA64                                                 | 设备管理器                                                |
|:-------------------------------------------------------|:--------------------------------------------------------------|
| ![](./images/finding-hardware-md/nic-model-aida64.png) | ![](./images/finding-hardware-md/nic-model-devicemanager.png) |

由于某些oem提供设备名称的方式，您可以通过设备管理器获得最准确的信息是通过PCI ID(例如`PCI\VEN_14E4&DEV_43A0` 对应于供应商ID`14E4`和设备ID`43A0`)。这意味着你需要谷歌ID并找出确切的设备ID;然而，AIDA64可以正确地呈现名称，这可能会容易得多。

### 磁盘型号

| AIDA64                                                  | 设备管理器                                                 |
|:--------------------------------------------------------|:---------------------------------------------------------------|
| ![](./images/finding-hardware-md/disk-model-aida64.png) | ![](./images/finding-hardware-md/disk-model-devicemanager.png) |

由于OEM没有提供有关驱动器的详细信息，您需要Google一下哪个驱动器与显示的名称匹配。

## 使用Linux查找你的硬件

为了使用Linux查找硬件，我们将使用一些工具:

* `pciutils`
* `dmidecode`

下面是要在终端中运行的命令列表，值得庆幸的是，大多数Linux发行版都已经安装了这些工具。如果没有，您可能会在发行版的包管理器中找到它们。

### CPU型号

```sh
grep -i "model name" /proc/cpuinfo
```

### 显卡型号

```sh
lspci | grep -i --color "vga\|3d\|2d"
```

### 芯片组型号

```sh
dmidecode -t baseboard
```

### 键盘，触控板和触摸屏连接类型

```sh
dmesg | grep -i input
```

### 音频编解码器

```sh
aplay -l
```

### 网络控制器型号

基本信息:

```sh
lspci | grep -i network
```

更深入的信息:

```sh
lshw -class network
```

### 磁盘型号

```sh
lshw -class disk -class storage
```

## 使用OCSysInfo查找硬件

获取和运行OCSysInfo有两种方法:

* [预编译的二进制文件](https://github.com/KernelWanderers/OCSysInfo/releases)
* 手动克隆[存储库](https://github.com/KernelWanderers/OCSysInfo)

::: tip 提示
我们建议您下载[二进制文件](https://github.com/KernelWanderers/OCSysInfo/releases), 因为这是最简单和最容易的方法。

如果您想了解更多关于手动克隆存储库的信息，可以查看OCSysInfo[指南]。(https://github.com/KernelWanderers/OCSysInfo/tree/main/mini-guide).
:::

### 发现硬件

::: warning 警告
笔记本电脑用户:在我们开始之前，我们建议您断开任何外部USB设备，因为这可能导致模棱两可或不必要的信息收集，可能会使您感到困惑。
:::

成功安装并运行应用程序后，您应该看到以下屏幕:

![](./images/finding-hardware-md/ocsysinfo-example.png)

从这里，你可以输入`d`，然后按`ENTER`/`RETURN`，之后，你应该会看到一个类似的屏幕:

![](./images/finding-hardware-md/ocsysinfo-hwdisc.png)

### CPU型号

![](./images/finding-hardware-md/cpu-model-ocsysinfo.png)

除了CPU型号，它还列出了CPU的代号、支持的最高SSE版本和SSSE3可用性。

### 显卡型号

![](./images/finding-hardware-md/gpu-model-ocsysinfo.png)

在这种情况下，机器有两个显卡:

* 核芯显卡 (Intel UHD Graphics 630)
* 独立显卡 (AMD Radeon R9 390X)

除了模型名称外，它还列出了显卡的代号，ACPI和PCI路径，随着您在黑苹果旅程中的进展，您可能很快就会发现这些有大用处。

### 键盘和触控板连接类型

::: details SMBus触控板
![](./images/finding-hardware-md/id-smbus-ocsysinfo.png)
触控板: `SMBus` <br /> 键盘: `PS/2`

[ThatCopy](https://github.com/ThatCopy)提供图片
:::

::: details I2C触控板
![](./images/finding-hardware-md/id-i2c-ocsysinfo.png)
触控板: `I2C` <br /> 键盘: `PS/2`

[Mahas](https://github.com/Mahas1)提供图片
:::

::: details PS/2 触控板
![](./images/finding-hardware-md/id-ps2-ocsysinfo.png)
触控板: `PS/2` <br /> 键盘: `PS/2`

[Tasty0](https://github.com/Tasty0)提供图片
:::

### 音频编解码器

![](./images/finding-hardware-md/audio-codec-ocsysinfo.png)

### 网卡型号

![](./images/finding-hardware-md/network-model-ocsysinfo.png)

### 磁盘型号

![](./images/finding-hardware-md/drive-model-ocsysinfo.png)
