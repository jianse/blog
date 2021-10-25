---
title: "安装Ubuntu"
date: 2021-10-21T10:21:13+08:00
draft: false
categories: ubuntu
categories_weight: 1
toc: true
tags: ["linux","ubuntu"]
---

# 安装Ubuntu

这篇文章记录一下我安装Ubuntu的经历，也是我记录使用、调试、美化Ubuntu的这个系列的开始。

## 预备知识

我将使用虚拟机进行演示，使用虚拟机的好处是我可以方便的截图，同时不会不小心把我的电脑搞成砖头（变成砖头也没太大问题）。所以我假设读这篇文章的人具有以下能力

1. 会使用`wmware`，会使用它创建虚拟机，安装虚拟机系统等。
2. 会寻找资源，从官方渠道下载文件

## 相关环境

* vmware workstation 版本： 16.2.0
* ubuntu-desktop 版本： 2004.3 lts

vmware版本并没有太大关系，这里列出只是为了读者在发现不同时可以排除环境的问题

ubuntu 选择lts（长期支持版）是为了尽量稳定

## 下载系统镜像文件

懒人链接：[Ubuntu 20.04.3 LTS](https://releases.ubuntu.com/20.04/ubuntu-20.04.3-desktop-amd64.iso)

或者到[Ubuntu官网](https://cn.ubuntu.com)选择自己喜欢的版本，安装步骤大同小异（大概）

## 安装步骤

### 创建虚拟机

我们在`vmware`中创建一个虚拟机，创建时不指定镜像文件（指定镜像会触发`vmware`的快速安装不利于讲解）,其他配置按需。

创建完成后，我们需要对刚创建的虚拟机进行一点修改

1. 修改固件类型，将固件类型修改为uefi
   ![修改固件类型](https://z3.ax1x.com/2021/10/25/5hosiV.png)
2. 添加镜像文件
   ![添加镜像文件](https://z3.ax1x.com/2021/10/25/5hoBaq.png)

### 启动虚拟机

启动虚拟机一路回车，到达下面的界面

> [info]
> 这里跳过了两个步骤
>
> 1. 选择启动要进入的选项，直接选择`ubuntu`
> 2. 检测镜像，等待就可以了，如果检查出现错误，请重新下载镜像，并重复上面的步骤

![欢迎界面](https://z3.ax1x.com/2021/10/25/5ho6RU.png)

选择你的语言，并点击安装Ubuntu按钮。这里选择`English`并单击`Install Ubuntu`按钮

![键盘布局](https://z3.ax1x.com/2021/10/25/5hoyGT.png)

选择键盘布局，按上图指示即可，并点击继续

![软件](https://z3.ax1x.com/2021/10/25/5hoDI0.png)

安装软件界面，选择标准安装，取消下载更新，勾上第三方驱动，点击下一步

![硬盘分区](https://z3.ax1x.com/2021/10/25/5ho2M4.png)

硬盘分区，这一步我选择使用整个硬盘进行安装

![提醒](https://z3.ax1x.com/2021/10/25/5hoczF.png)

弹出提醒，告诉我们硬盘将被分为两个分区，点击确定即可

![选择时区](https://z3.ax1x.com/2021/10/25/5ho4d1.png)

点击地图上的中国部分，或者在下面输入框输入`shanghai`即可，点击确定

![创建用户](https://z3.ax1x.com/2021/10/25/5hoRsJ.png)

根据自己情况输入即可，输入完成点击继续

![开始安装](https://z3.ax1x.com/2021/10/25/5ho5Ix.png)

接下来就是等待时间，期间可能会有几个下载项，可以选择跳过，进入系统后再装

![安装完成](https://z3.ax1x.com/2021/10/25/5hqHrF.png)

安装完成点击按钮重启

## 基础设置

重启后使用安装时设置的用户登陆，基本都是跳过，按需设置

### 切换软件源

打开`Software&Updates`应用，`Download from`->`other`中选择`china`->`tuna`清华的软件源，如图

![软件源](https://z3.ax1x.com/2021/10/25/5hxtDf.png)

点击`Choose server`需要输入密码才能进行更改，关闭`Software&Updates`应用时会提醒更新软件信息，点`reload`按钮即可。

### 更新软件

打开`terminal`，或者直接使用`control + alt + t`打开。

```bash
sudo apt update
```

上面命令更新软件索引，接着更新软件

```bash
sudo apt upgrade
```

重启以使更新生效。

## 小结

以上就是安装Ubuntu 20.04.3 lts 的简单步骤，以及进行简单设置的步骤，接下来我将一步一步美化，修改它，使它更加符合自己的习惯，更易用。

敬请期待！
