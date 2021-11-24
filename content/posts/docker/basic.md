---
title: "docker基本使用"
date: 2021-11-22T17:12:47+08:00
draft: false
toc: true
categories: docker
categories_weight: 3
featured_image: https://z3.ax1x.com/2021/11/22/Izdvu9.png
tags: ["docker","container"]
---

## 环境

## 在 Docker 中使用镜像

容器是从镜像生成出来的。默认情况下，docker从[Docker Hub](https://hub.docker.com)下载这些镜像。

下面我们来启动我们的第一个docker容器`hello world`

### hello world

```bash
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:cc15c5b292d8525effc0f89cb299f1804f3a725c8d05e158653a563f15e4f685
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

执行此命令时，Docker 首先在本地查找hello-world，如没有，它会从 Docker Hub（默认版本库）下载了该镜像。下载镜像后，Docker 会根据镜像创建一个容器，并执行该容器中的应用程序。

您可以通过将docker命令与search子命令配合使用来搜索 Docker Hub 上可用的镜像。

### 搜索镜像

可以通过将docker命令与search子命令配合使用来搜索 Docker Hub 上可用的镜像。
例如，要搜索`ubuntu`镜像，可以输入

```bash
$ docker search ubuntu
NAME                                                      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
ubuntu                                                    Ubuntu is a Debian-based Linux operating sys…   13170     [OK]       
dorowu/ubuntu-desktop-lxde-vnc                            Docker image to provide HTML5 VNC interface …   587                  [OK]
websphere-liberty                                         WebSphere Liberty multi-architecture images …   282       [OK]       
rastasheep/ubuntu-sshd                                    Dockerized SSH service, built on top of offi…   256                  [OK]
consol/ubuntu-xfce-vnc                                    Ubuntu container with "headless" VNC session…   242                  [OK]
ubuntu-upstart                                            DEPRECATED, as is Upstart (find other proces…   112       [OK]       
1and1internet/ubuntu-16-nginx-php-phpmyadmin-mysql-5      ubuntu-16-nginx-php-phpmyadmin-mysql-5          50                   [OK]
open-liberty                                              Open Liberty multi-architecture images based…   48        [OK]       
ubuntu-debootstrap                                        DEPRECATED; use "ubuntu" instead                45        [OK]       
i386/ubuntu                                               Ubuntu is a Debian-based Linux operating sys…   26                   
fnndsc/ubuntu-python3                                     A slim Ubuntu-based Python3 image               24                   [OK]
solita/ubuntu-systemd                                     Ubuntu + systemd                                24                   [OK]
1and1internet/ubuntu-16-apache-php-5.6                    ubuntu-16-apache-php-5.6                        14                   [OK]
1and1internet/ubuntu-16-apache-php-7.0                    ubuntu-16-apache-php-7.0                        13                   [OK]
1and1internet/ubuntu-16-nginx-php-phpmyadmin-mariadb-10   ubuntu-16-nginx-php-phpmyadmin-mariadb-10       11                   [OK]
1and1internet/ubuntu-16-nginx-php-5.6-wordpress-4         ubuntu-16-nginx-php-5.6-wordpress-4             9                    [OK]
1and1internet/ubuntu-16-apache-php-7.1                    ubuntu-16-apache-php-7.1                        7                    [OK]
darksheer/ubuntu                                          Base Ubuntu Image -- Updated hourly             5                    [OK]
1and1internet/ubuntu-16-nginx-php-7.0                     ubuntu-16-nginx-php-7.0                         4                    [OK]
1and1internet/ubuntu-16-apache                            ubuntu-16-apache                                3                    [OK]
1and1internet/ubuntu-16-nginx-php-7.1-wordpress-4         ubuntu-16-nginx-php-7.1-wordpress-4             3                    [OK]
owncloud/ubuntu                                           ownCloud Ubuntu base image                      3                    
1and1internet/ubuntu-16-sshd                              ubuntu-16-sshd                                  1                    [OK]
smartentry/ubuntu                                         ubuntu with smartentry                          1                    [OK]
1and1internet/ubuntu-16-php-7.1                           ubuntu-16-php-7.1                               1                    [OK]
```

此命令会在 Docker Hub 上搜索并返回名称与搜索字符串匹配的所有镜像列表。

`OFFICIAL` 列（即官方）对应的镜像，就是出自官方的镜像了，大家可放心使用。

### 下载镜像

接下来，我们可以用pull子命令，将你需要的镜像下载到计算机。

本教程我们使用ubuntu的官方镜像。

```bash
$ docker pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
7b1a6ab2e44d: Pull complete 
Digest: sha256:626ffe58f6e7566e00254b638eb7e0f3b11d4da9675088f4781a50ae288f3322
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest
```

### 查看下载的镜像

```bash
$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED       SIZE
ubuntu        latest    ba6acccedd29   5 weeks ago   72.8MB
hello-world   latest    feb5d9fea6a5   8 weeks ago   13.3kB
```

当镜像执行时，它会生成一个容器，我们在容器中添加所需的软件后，可以把这个容器再次打包成新镜像。并可以把这个镜像上传到 Docker hub 上，方便自己在其他机器上使用。或是分享给合作开发者一起使用。这一点我们会在本教程后面的步骤中进行实践。

### 运行容器

下载镜像后可以用run子命令来运行镜像，作为示例，让我们来运行一下上面下载的Ubuntu镜像，`-it`选项可以让我们开启一个交互式的`shell`访问容器。

```bash
docker run -it ubuntu 
```

执行命令后，提示符会变为你正在使用镜像的容器id：

```bash
root@ea340f3ab7d6:/#
```

注意：这个容器ID，在此例中，为`ea340f3ab7d6`。我们可以使用这个ID来识别和删除这个容器。

现在，我们可以在容器内执行任何命令了。例如，让我们更新容器内的软件源。

我们在容器内是以 root 用户身份进行操作的，所有不需要使用sudo

接下来让我们在容器内添加`node`环境

```bash
apt update
apt install nodejs
$ node -v
v10.19.0
exit
```

我们安装的这个node.js只会在这个容器里被修改，不会修改镜像。

### 管理容器

在使用 Docker 一段时间后，我们的计算机上会有许多活动（运行）和非活动容器。

要查看这些活动中的容器对象，请使用：

```bash
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

在本教程中，我们启动了两个容器。一个是hello-world镜像，另一个是ubuntu镜像。这两个容器目前都没有在运行，但是它们仍然保存在计算机里。

要查看所有容器（活动和非活动），请docker ps -a

```bash
$ docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED             STATUS                         PORTS     NAMES
ea340f3ab7d6   ubuntu        "bash"     9 minutes ago       Exited (0) 3 minutes ago                 nice_saha
0ee46b6c93b6   hello-world   "/hello"   About an hour ago   Exited (0) About an hour ago             recursing_germain
```

要启动已停止的容器，请使用`docker start`命令+容器ID或容器名。

```bash
docker start ea340f3ab7d6
```

或者

```bash
docker start nice_saha
```

要停止正在运行的容器，请使用`docker stop`命令+容器 ID 或容器名

```bash
docker stop nice_saha
```

当某些容器我们不会再使用，我们可以通过容器 ID 或名称来轻松删除它们。我们可以通过`docker rm`命令来删除不用的容器。

```bash
$ docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED      STATUS                  PORTS     NAMES
ea340f3ab7d6   ubuntu        "bash"     2 days ago   Exited (0) 2 days ago             nice_saha
0ee46b6c93b6   hello-world   "/hello"   2 days ago   Exited (0) 2 days ago             recursing_germain
$ docker rm recursing_germain 
recursing_germain
```

### 提交镜像

docker commit :从容器创建一个新的镜像。

刚刚我们在 Ubuntu 的容器中安装 Node.js，此时，这个容器里的内容已经不同于生成它的镜像。如果以后我们想直接打开镜像就预装 Node.js 的话，我们可以把这个容器生成为新的镜像。

```bash
$ docker commit -m "add nodejs" -a "user1" nice_saha u-nodejs
sha256:b1611a4400e9b8e70f61ed8d27e5d7d58d41102eebdf2f9cd0aecd9adc139c4c
$ docker images 
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
u-nodejs      latest    b1611a4400e9   26 seconds ago   171MB
ubuntu        latest    ba6acccedd29   5 weeks ago      72.8MB
hello-world   latest    feb5d9fea6a5   2 months ago     13.3kB
```
