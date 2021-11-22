---
title: "安装docker"
date: 2021-10-24T23:03:42+08:00
draft: false
toc: true
categories: 'docker'
categories_weight: 2
featured_image: https://z3.ax1x.com/2021/11/22/Ivqw8S.png
tags: ["docker", "container"]
---

# 安装docker

## 环境

开始之前我们要先准备以下环境：

* 一台全新安装的Ubuntu20.04服务器

> [warn]
> 全新安装不是必须的但是为了减少其他环境因素的影响，这里使用全新安装的操作系统来做演示

## 基本概念

* 从 Docker 下载下来的叫镜像（ images ）
* 使用`docker run` 运行起来的镜像（ images ）叫容器（ containers ）

## 安装

官方 Ubuntu 存储库中提供的 Docker 安装软件包可能不是最新版本。

Ubuntu 官方的版本库中并不一定是 Docker 最新的安装包，为了保证是最新版，我们从 Docker 官方库来安装。

文章编写时最新的docker-ce版本是 `20.10.9`

> [info]
> 官网国内的访问速度真的是一言难尽，所以这里使用ustc docker-ce源进行加速

### 添加docker软件源

1. 更新apt软件包索引，安装支持apt使用https软件源的软件包

    ```bash
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg lsb-release
    ```

2. 添加docker的GPGkey

    ```bash
    curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    ```

3. 添加docker的软件源

    ```bash
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

### 安装docker-ce

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

查看docker版本信息

```bash
$ sudo docker version
Client: Docker Engine - Community
 Version:           20.10.9
 API version:       1.41
 Go version:        go1.16.8
 Git commit:        c2ea9bc
 Built:             Mon Oct  4 16:08:29 2021
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.9
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.16.8
  Git commit:       79ea9d3
  Built:            Mon Oct  4 16:06:37 2021
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.4.11
  GitCommit:        5b46e404f6b9f661a205e28d59c982d3634148f8
 runc:
  Version:          1.0.2
  GitCommit:        v1.0.2-0-g52b36a2
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0

```

### 检查docker服务状态

```bash
sudo systemctl status docker
```

```text
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2021-10-24 23:59:14 CST; 8s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 3416 (dockerd)
      Tasks: 7
     Memory: 27.7M
     CGroup: /system.slice/docker.service
             └─3416 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

```

出现类似于上面的输出就表示docker服务启动成功了

## 配置

### 不使用sudo执行docker

> [info] 这一步是可选的

默认情况下docker只能由root用户或docker组中的用户进行操作，docker组是在安装docker时创建的。

如果在执行`docker`命令时，没有用`sudo`，并且也不是`docker`组的用户，那么就会出现如下的提示：

```bash
$ docker version
Client: Docker Engine - Community
 Version:           20.10.11
 API version:       1.41
 Go version:        go1.16.9
 Git commit:        dea9396
 Built:             Thu Nov 18 00:37:06 2021
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/version": dial unix /var/run/docker.sock: connect: permission denied
```

如果要避免使用sudo来运行docker，可以将用户添加到docker组

```bash
sudo usermod -aG docker user1
```

上面命令将用户`user1`添加到了`docker`组中，使用新组成员身份执行命令，需要注销后重新登录，或使用su来切换身份。

```bash
su - user1
```

```bash
$ id -nG
user1 docker
```

现在user1就加入到docker组了

### 添加镜像源

> [info] 这一步是可选的
>
> 为了加快国内镜像的下载速度，使用阿里的镜像加速服务

修改daemon配置文件`/etc/docker/deamon.json`来使用加速器，不存在就新建

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": ["https://exfr1v5o.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

至此在Ubuntu上安装docker就完成了。
