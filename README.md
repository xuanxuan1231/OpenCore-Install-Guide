---
home: true
heroImage: /dortania-logo-clear.png
heroText: Dortania的OpenCore安装指南
actionText: 入门→
actionLink: prerequisites.md

meta:
- name: description
  content: 当前支持版本0.9.1
---

更新状态：[![Build and Deploy](https://github.mirrors.xuanxuan1231.tk/xuanxuan1231/OpenCore-Install-Guide/actions/workflows/vuepress-deploy.yml/badge.svg)](https://github.com/xuanxuan1231/OpenCore-Install-Guide/actions/workflows/vuepress-deploy.yml)[![pages-build-deployment](https://github.mirrors.xuanxuan1231.tk/xuanxuan1231/OpenCore-Install-Guide/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/xuanxuan1231/OpenCore-Install-Guide/actions/workflows/pages/pages-build-deployment)
# 什么是OpenCore？本指南针对谁？

OpenCore就是我们所说的“引导加载程序”——它是一个复杂的软件，我们用它来为macOS准备我们的系统——特别是通过为macOS注入新的数据，比如SMBIOS、ACPI表和kext。这个工具与Clover等其他工具的不同之处在于，它在设计时考虑了安全性和质量，允许我们使用许多在真实Mac上发现的安全功能，例如[系统完整性保护](https://support.apple.com/zh-cn/HT204899)和[文件保险箱](https://support.apple.com/zh-cn/HT204837)。更深入的了解可以在这里找到:[为什么OpenCore胜过Clover和其他的](why-oc.md)

本指南特别关注两个主要方面:

* 在x86 PC上安装macOS
* 教你如何让你的黑苹果工作

正因为如此，你需要阅读、学习甚至使用谷歌。这不是简单的一键安装设置。

请记住，OpenCore仍然是新的，目前处于测试阶段。虽然它相当稳定，而且可以说在各方面都比Clover稳定得多，但它仍然在频繁更新，所以配置的大块变化相当频繁(即新的quick取代旧的)。

最后，那些有问题的人可以访问[r/Hackintosh subreddit](https://www.reddit.com/r/hackintosh/)和[r/Hackintosh Discord](https://discord.gg/u8V7N5C)寻求更多帮助。
