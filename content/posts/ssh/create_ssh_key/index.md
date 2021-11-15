---
title: "创建ssh密钥对"
date: 2021-10-25T11:01:32+08:00
draft: false
toc: true
categories: ssh
categories_weight: 1
tags: ["ssh","id_rsa"]
---

# 创建ssh密钥对

## 环境

* Ubuntu 21.04

## 创建密钥对

### 检查ssh-keygen是否安装

```bash
$ whereis ssh-keygen
ssh-keygen: /usr/bin/ssh-keygen /usr/share/man/man1/ssh-keygen.1.gz
```

#### 安装ssh-keygen

ssh-keygen 是包含在ssh中的一个实用工具，所以只需安装ssh就可以同时安装ssh-keygen了

```bash
sudo apt install ssh
```

### 以交互方式创建密钥对

```bash
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user1/.ssh/id_rsa): 
Created directory '/home/user1/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user1/.ssh/id_rsa
Your public key has been saved in /home/user1/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:RjUpsQHwjJP95oMXBHQQkbANg0XrzGWjzwp17nKQS0o user1@u-user1
The key's randomart image is:
+---[RSA 3072]----+
|   +B+B*+.o.     |
|  .  %.o.+..     |
|    * O +.       |
|   + = =         |
|    *.. S        |
|  E.+= = .       |
| ..o o= +        |
|  ..oo.. .       |
|    .o.          |
+----[SHA256]-----+
```

