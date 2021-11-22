---
title: "Ubuntu添加用户"
date: 2021-11-17T11:51:15+08:00
draft: false
toc: true
categories: ubuntu-server
categories_weight: 1
tags: ["ubuntu","linux","server"]
---

# Ubuntu添加用户

## 环境

- Ubuntu 20.04.3 lts

## 添加用户

添加用户一般有两个命令可供选择

- `useradd` ：这个命令相对底层，默认情况下只创建用户，不设置密码，home目录等杂项
- `adduser` ：这个命令是在`useradd`的基础上扩展的，会进行创建用户后的一些设置

### useradd

下面使用`useradd`创建一个基本完整的用户

```bash
sudo useradd -m user1
sudo passwd user1
```

`useradd -m`选项指定创建用户的同时创建家目录
`passwd`命令为新创建的用户指定密码

### adduser

```bash
sudo adduser user2
```

该命令会执行下面操作

- 在/etc/passwd文件中增添一行记录。
- 在/home目录下创建新用户的主目录，并将/etc/skel目录中的文件复制到该目录中。
- 交互式设置密码等信息

## passwd文件
