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

### Chipset Model

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

* 要查看设备的确切连接类型，请选择指针设备，然后进入`View -> Device by Connection`。这将澄清它是否通过PS2, I2C, SMBus, USB等

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
  
### Audio Codec

| AIDA64                                                        | 设备管理器                                                    |
|:--------------------------------------------------------------|:------------------------------------------------------------------|
| ![](./images/finding-hardware-md/audio-controller-aida64.png) | ![](./images/finding-hardware-md/audio-controller-aida64.png.png) |

由于某些OEM提供设备名称的方式，您使用设备管理器获得最准确信息的方法是通过PCI ID(如pci 14F1, 50F4)。这意味着你需要搜索ID并找出确切的设备ID。但是AIDA64可以正确地呈现名称，这对最终用户来说相当容易。

### 网络控制器型号

| AIDA64                                                 | 设备管理器                                                |
|:-------------------------------------------------------|:--------------------------------------------------------------|
| ![](./images/finding-hardware-md/nic-model-aida64.png) | ![](./images/finding-hardware-md/nic-model-devicemanager.png) |

由于某些oem提供设备名称的方式，您可以通过设备管理器获得最准确的信息是通过PCI ID(例如`PCI\VEN_14E4&DEV_43A0` 对应于供应商ID`14E4`和设备ID`43A0`)。这意味着你需要谷歌ID并找出确切的设备ID;然而，AIDA64可以正确地呈现名称，这可能会容易得多。

### Drive Model

| AIDA64                                                  | 设备管理器                                                 |
|:--------------------------------------------------------|:---------------------------------------------------------------|
| ![](./images/finding-hardware-md/disk-model-aida64.png) | ![](./images/finding-hardware-md/disk-model-devicemanager.png) |

由于OEM没有提供有关驱动器的详细信息，您需要Google一下哪个驱动器与显示的名称匹配。

## Finding Hardware using Linux

For finding hardware using Linux, we'll be using a few tools:

* `pciutils`
* `dmidecode`

Below you'll find a list of commands to run in the terminal, thankfully most Linux distros will come with these tools already installed. If not, you will likely find them in your distro's package manager.

### CPU Model

```sh
grep -i "model name" /proc/cpuinfo
```

### GPU Model

```sh
lspci | grep -i --color "vga\|3d\|2d"
```

### Chipset Model

```sh
dmidecode -t baseboard
```

### Keyboard, Trackpad and  Touchscreen Connection Type

```sh
dmesg | grep -i input
```

### Audio Codec

```sh
aplay -l
```

### Network Controller models

Basic info:

```sh
lspci | grep -i network
```

More in-depth info:

```sh
lshw -class network
```

### Drive Model

```sh
lshw -class disk -class storage
```

## Finding Hardware using OCSysInfo

There are 2 methods of obtaining and running OCSysInfo:

* [Precompiled binaries](https://github.com/KernelWanderers/OCSysInfo/releases)
* Manually cloning the [repository](https://github.com/KernelWanderers/OCSysInfo)

::: tip
We recommend you download [the binaries](https://github.com/KernelWanderers/OCSysInfo/releases), as it is the simplest and easiest method.

If you want to learn more about manually cloning the repository, you can check out the OCSysInfo [mini-guide](https://github.com/KernelWanderers/OCSysInfo/tree/main/mini-guide).
:::

### Discovering hardware

::: warning
Laptop users: before we start, we advise you to disconnect any external USB devices, as this may lead to ambiguous or unnecessary information collected which may confuse you.
:::

After you've successfully installed and ran the application, you should be greeted with the following screen:

![](./images/finding-hardware-md/ocsysinfo-example.png)

From here, you can type in `d` and press `ENTER`/`RETURN`, after, you should be greeted with a similar-looking screen:

![](./images/finding-hardware-md/ocsysinfo-hwdisc.png)

### CPU Model

![](./images/finding-hardware-md/cpu-model-ocsysinfo.png)

Besides the CPU model, it also lists the CPU's codename, highest SSE version supported and SSSE3 availability.

### GPU Model

![](./images/finding-hardware-md/gpu-model-ocsysinfo.png)

In this case, the machine has two GPUs:

* iGPU (Intel UHD Graphics 630)
* dGPU (AMD Radeon R9 390X)

Besides the model names, it also lists the GPUs' codename, ACPI & PCI path, which you may soon find useful as you progress in your hackintosh journey.

### Keyboard and Trackpad Connection Type

::: details SMBus Trackpad
![](./images/finding-hardware-md/id-smbus-ocsysinfo.png)
Trackpad: `SMBus` <br /> Keyboard: `PS/2`

Credit for providing image: [ThatCopy](https://github.com/ThatCopy)
:::

::: details I2C Trackpad
![](./images/finding-hardware-md/id-i2c-ocsysinfo.png)
Trackpad: `I2C` <br /> Keyboard: `PS/2`

Credit for providing image: [Mahas](https://github.com/Mahas1)
:::

::: details PS/2 Trackpad
![](./images/finding-hardware-md/id-ps2-ocsysinfo.png)
Trackpad: `PS/2` <br /> Keyboard: `PS/2`

Credit for providing image: [Tasty0](https://github.com/Tasty0)
:::

### Audio codec

![](./images/finding-hardware-md/audio-codec-ocsysinfo.png)

### Network models

![](./images/finding-hardware-md/network-model-ocsysinfo.png)

### Drive model

![](./images/finding-hardware-md/drive-model-ocsysinfo.png)
