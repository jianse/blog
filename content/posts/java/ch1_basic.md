---
title: "[Java笔记]第一章 java历史、特性与JDK的安装"
date: 2019-07-15T12:19:59+08:00
draft: false
categories:
    - "javase"
toc: true
featured_image: https://z3.ax1x.com/2021/08/25/hZbGod.jpg
---

# 第一章 Java历史、特性与JDK的安装

## 1.1 java的历史

詹姆斯·高斯林 （James Gosling）是一名软件专家，1955年5月19日出生于加拿大，Java编程语言的共同创始人之一，一般公认他为“Java之父”。

![James Gosling](https://s2.ax1x.com/2019/08/15/mEv7xf.jpg)

java起源于sun公司的嵌入式项目

之后sun公司被Oracle公司收购

## 1.2 java的特性

1. 简单性
2. 面向对象
3. 健壮性
4. 跨平台性
5. 支持网络
6. 多线程
7. 动态性
8. 高性能

### 1.2.1 简单性

Java的语法与C/C++比较一致，如果你以前接触过C/C++你上手Java并不会很难。同时Java屏蔽了与底层强相关的实现细节包括头文件、指针、结构体、虚函数、运算符重载、多继承等特性。使你使用Java进行编程时不必太过关注计算机的硬件环境。同时Java提供了一个很全面的标准库，可以很方便的使用标准库中已经实现的工具与数据结构。

### 1.2.2 面向对象

面向对象是一种程序设计的思想，强调对问题进行建模，而不是按解决问题的步骤一步一步的解决问题。Java是一门面向对象的语言这意味着使用Java写出一个面向对象的程序远远比非面向对象的语言简单。

> [info] 面向对象的程序设计方法，已经在过去40多年证明了它的价值。近些年出现的函数式编程也引起了不少讨论。方法没有高低贵贱，只有适用与不适用，在不同的场合使用不同的方法。切勿二极管思维。

### 1.2.3 健壮性

Java作为一门编译型语言，它在编译时就可以检测到很多错误，便于我们早期的错误排查和纠正。Java有固定的类型系统、异常处理、范型、动态类型检测等。这些都能够帮助程序，无论是在编译时，还是在运行时都能够健壮的运行。

> [info] 许多刚开始编写程序的新手经常会被编译器报出的错误而吓退，实际上编译器报出错误并不可怕，只要我们认真阅读编译器给出的错误提示，适当的使用搜索引擎了解错误的原因，80%以上的错误是能够自行解决的。

### 1.2.4 跨平台性

Java得益于构建在操作系统上的Jvm提供的一致的接口，Java语言编译出的目标程序并不直接依赖于操作系统，而是依赖于Jvm。这使得所以编译好的Java程序都可以运行在符合要求的Jvm上，而不需要考虑与系统的兼容性。所以Java是一门跨平台的语言。

### 1.2.5 支持网络

Java有一个强大的标准库，其中的`java.net`包提供了基础的网络api，`java.net.http`包提供了有关http服务的支持。这使得使用Java实现；网络通讯变得十分简单。

### 1.2.6 多线程

多线程一定情况下可以加速程序的运行，Java可以通过继承`java.lang.Thread`类或者实现`java.lang.Runable`接口来创建线程，同时Java库中的`java.util.concurrent`包中还提供了线程池、锁、同步等一系列高级的线程管理工具。

### 1.2.7 动态性

Java本身是静态语言，而它的动态性体现在Java可以在运行时改变程序的结构或变量的类型，主要体现在反射机制、字节码织入、动态编译、执行其他脚本。这些动态特性为Java带来了更多的灵活性。

### 1.2.8 高性能

起初的Java是解释运行的自然它的效率就不尽人意，因为这相当于你通过翻译与一个外国人进行交流。之后随着运行时编译（jit）特性的加入，java开始快了起来。之后为了增强Java的垃圾回收机制，垃圾回收算法从标记清除法到最近的zgc。为了适应云原生的需要又出现了可以把Java编译成原生代码的`Graal vm` 现代的Java程序已经与原生的应用不相上下。

## 1.3 JDK、JRE、JVM

### JDK

JDK(Java Development Kit)是Java语言的软件开发包，是提供给开发人员的产品，主要包括Java的编译调试工具链、运行时环境、java虚拟机。

> [info]
>
> ![Description of Java Conceptual Diagram](https://s1.ax1x.com/2020/03/12/8mhOPO.png)
>
> [java-11-tools-reference](https://docs.oracle.com/en/java/javase/11/tools/tools-and-command-reference.html)

通常的JDK分为ME、SE、EE三类。

ME(J2ME)，micro edition，主要用于移动设备、嵌入式设备上的java应用程序，从JDK 5.0开始，改名为Java ME。

SE(JavaSE)，standard edition，标准版，是我们通常用的一个版本，从JDK 5.0开始，改名为Java SE。

EE(JavaEE)，enterprise edition，企业版，使用这种JDK开发J2EE应用程序，从JDK 5.0开始，改名为Java EE。从2018年2月26日开始，J2EE改名为Jakarta EE

### JRE

JRE(Java Runtime Environment)Java运行环境是一个软件，JRE包含了Java提供的标准类库和JVM，是Java程序运行的必要条件。

### JVM

JVM(Java Virtual Machine)Java虚拟机，是一个抽象的虚拟计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的，Java虚拟机为java字节码提供了统一的平台，Java语言在不同的平台上不需要重新编译，从而让Java具有了良好的跨平台性。

## 1.4 Java各版本及特性

Java的版本迭代从1.1到1.4和j2se 5.0、java se 6是由sun公司维护发布的这时的java基本上是每两年发布一个大版本。这之中java几经改名由最初的`jdk 1.0`这样的小版本号，到`j2se 1.2`、`j2se 1.3`、`j2se 1.4`其中j2se(java to stander edition)表示的是java的标准版本。再到`j2se 5.0`将小版本号换为大版本号。再到`Java se 6`去掉了版本号后面的`.0`。2009年sun公司被Oracle公司收购，Java的升级维护工作就转交到Oracle手中。Oracle发布了`java se 7`和`java se 8`之后将Java的许可证进行了变更，同时修改了Java的发布周期。`java se 8`成为了许可证变更前的最后一个lts版本（长期支持版）。从`java se 9`开始java每半年发布一个新的版本，每三年发布一个lts版本，java8之后的第一个lts版本是java11。

### JDK 1.0

* 开发代号：Oak
* 发行时间：1996-01-23

初代版本，一个伟大的里程碑，但是是纯解释运行，使用外挂JIT，性能比较差，运行速度慢。

### JDK 1.1

* 开发代号：无
* 发行时间：1997-02-19
* 引入特性：
  - JDBC(Java DataBase Connectivity)
  - 支持内部类
  - RMI(Remote Method Invocation)
  - 反射（仅用于内省）
  - Java Bean

### JDK 1.2

* 开发代号：Playground
* 发行时间：1998-12-04
* 引入特性：
  - JIT(Just In Time)编译器
  - 对打包的Java文件进行签名
  - JFC(Java Foundition Classes),包括Swing 1.0，拖放和Java2D类库
  - Java插件
  - JDBC中引入可滚动结果集，BLOB，CLOB，批量更新和用户自定义类型
  - Applet中添加声音支持

### JDK 1.3

* 开发代号：Kestrel
* 发行时间：2000-02-08
* 引入特性：
  - Java Sound API
  - jar文件索引
  - 大量优化和增强

### JDK 1.4

* 开发代号：Merlin
* 发行时间：2004-02-06
* 引入特性：
  - XML处理
  - Java打印服务
  - Logging API
  - Java Web Start
  - JDBC 3.0 API
  - 断言
  - Preferences API
  - 链式异常处理
  - 支持IPV6
  - 支持正则表达式
  - 引入Image I/O API

### JAVA 5

这是Java史上一个里程碑式的版本,为了表示该版本的重要性，J2SE 1.5 更名为JAVA SE 5.0(内部版本1.5.0)

* 开发代号：Tiger
* 发行时间：2004-09-30
* 引入特性：
  - 范型
  - 增强循环，可使用迭代方式
  - 自动装箱与自动拆箱
  - 类型安全的枚举
  - 可变参数
  - 静态引入
  - 元数据（注解）
  - Instrumentation

### JAVA 6

* 开发代号:Mustang
* 发行时间：2006-12-11
* 引入特性：
  - 支持脚本语言
  - JDBC 4.0 API
  - JAVA Compiler API
  - 可插拔注解
  - 增加对Native PKI,Java GSS,Kerberos和LDAP支持
  - 继承Web Services

### JAVA 7

* 开发代号：Dolphin
* 发行时间：2011-07-28
* 引入特性：
  - switch语句块中允许以字符串作为分支条件
  - 在创建范型对象时应用类型推断
  - 在一个语句块中捕获多种异常
  - 支持动态语言
  - 支持try-with-resources
  - 引入Java NIO.2开发包
  - 数值类型可以用二进制字符串表示，并且可以在字符串表示中添加下划线
  - 钻石型语法
  - null值得自动处理

### JAVA 8

开发代号自JAVA 8之后不再持续下去

* 开发代号：Spider
* 发行时间：2014-03-18
* 引入特性：
  - Lambda表达式 - Lambda表达式允许把函数作为一个方法的参数
  - 方法引用 - 方法引用提供了非常有用的语法，可以直接引用已有Java类或对象的方法或构造器。与lambda联合使用，方法引用可以使语言的构造更紧凑简洁，减少冗余代码。
  - 默认方法 - 默认方法就是一个接口里面有了一个实现的方法。
  - 新工具 - 新的编译工具，如：Nashorn引擎jjs、类依赖分析器jdeps。
  - Stream API - 新添加的Stream API（java.util.stream） 把真正的函数式编程风格引入到Java中。
  - Date Time API - 加强对日期与时间的处理。
  - Optional 类 - Optional类已经成为Java 8 类库的一部分，用来解决空指针异常。
  - Nashorn，JavaScript引擎 - Java 8提供了一个新的Nashorn javascript引擎，它允许我们在JVM上运行特定的将javascript应用。

### JAVA 9

* 发行时间：2017-09-22
* 引入特性：
  - 模块系统 - 模块是一个包的容器，Java 9最大的变化之一是引入了模块系统（Jigsaw项目）。
  - REPL（JShell） - 交互式编成环境
  - HTTP 2 客户端 - HTTP/2标准是HTTP协议的最新版本，新的 HTTPClient API 支持 WebSocket 和HTTP2 流以及服务器推送特性。
  - 改进的 Javadoc - Javadoc 现在支持在 API 文档中的进行搜索。另外，Javadoc 的输出现在符合兼容 HTML5 标准。
  - 多版本兼容 JAR 包 - 多版本兼容 JAR 功能能让你创建仅在特定版本的 Java 环境中运行库程序时选择使用的 class 版本。
  - 集合工厂方法 - List，Set 和 Map 接口中，新的静态工厂方法可以创建这些集合的不可变实例。
  - 私有接口方法 - 在接口中使用private私有方法。我们可以使用 private 访问修饰符在接口中编写私有方法。
  - 进程 API - 改进的 API 来控制和管理操作系统进程。引进 java.lang.ProcessHandle 及其嵌套接口 Info 来让开发者逃离时常因为要获取一个本地进程的 PID 而不得不使用本地代码的窘境。
  - 改进的 Stream API - 改进的 Stream API 添加了一些便利的方法，使流处理更容易，并使用收集器编写复杂的查询。
  - 改进 try-with-resources - 如果你已经有一个资源是 final 或等效于 final 变量,您可以在 try-with-resources 语句中使用该变量，而无需在 try-with-resources 语句中声明一个新变量。
  - 改进的弃用注解 @Deprecated - 注解 @Deprecated 可以标记 Java API 状态，可以表示被标记的 API 将会被移除，或者已经破坏。
  - 改进钻石操作符(Diamond Operator) - 匿名类可以使用钻石操作符(Diamond Operator)。
  - 改进 Optional 类 - java.util.Optional 添加了很多新的有用方法，Optional 可以直接转为 stream。
  - 多分辨率图像 API - 定义多分辨率图像API，开发者可以很容易的操作和展示不同分辨率的图像了。
  - 改进的 CompletableFuture API - CompletableFuture 类的异步机制可以在 ProcessHandle.onExit 方法退出时执行操作。
  - 轻量级的 JSON API - 内置了一个轻量级的JSON API
  - 响应式流（Reactive Streams) API -  Java 9中引入了新的响应式流 API 来支持 Java 9 中的响应式编程。

### JAVA 10

* 发行时间：2018-03-21
* 引入特性：
  - JEP286，var 局部变量类型推断。
  - JEP296，将原来用 Mercurial 管理的众多 JDK 仓库代码，合并到一个仓库中，简化开发和管理过程。
  - JEP304，统一的垃圾回收接口。
  - JEP307，G1 垃圾回收器的并行完整垃圾回收，实现并行性来改善最坏情况下的延迟。
  - JEP310，应用程序类数据 (AppCDS) 共享，通过跨进程共享通用类元数据来减少内存占用空间，和减少启动时间。
  - JEP312，ThreadLocal 握手交互。在不进入到全局 JVM 安全点 (Safepoint) 的情况下，对线程执行回调。优化可以只停止单个线程，而不是停全部线程或一个都不停。
  - JEP313，移除 JDK 中附带的 javah 工具。可以使用 javac -h 代替。
  - JEP314，使用附加的 Unicode 语言标记扩展。
  - JEP317，能将堆内存占用分配给用户指定的备用内存设备。
  - JEP317，使用 Graal 基于 Java 的编译器，可以预先把 Java 代码编译成本地代码来提升效能。
  - JEP318，在 OpenJDK 中提供一组默认的根证书颁发机构证书。开源目前 Oracle 提供的的 Java SE 的根证书，这样 OpenJDK 对开发人员使用起来更方便。
  - JEP322，基于时间定义的发布版本，即上述提到的发布周期。版本号为FEATURE.INTERIM.UPDATE.PATCH，分j别是大版本，中间版本，升级包和补丁版本。

### JAVA 11

* 发行时间：2018-09-25
* 引入特性：
  - 181:Nest-Based访问控制
  - 309:动态类文件常量
  - 315:改善Aarch64 intrinsic
  - 318:无操作垃圾收集器
  - 320:消除Java EE和CORBA模块
  - 321:HTTP客户端(标准)
  - 323:局部变量的语法λ参数
  - 324:Curve25519和Curve448关键协议
  - 327:Unicode 10
  - 328:飞行记录器
  - 329:ChaCha20和Poly1305加密算法
  - 330:发射一列纵队源代码程序
  - 331:低开销堆分析
  - 332:传输层安全性(Transport Layer Security,TLS)1.3
  - 333:动作:一个可伸缩的低延迟垃圾收集器 (实验)
  - 335:反对Nashorn JavaScript引擎
  - 336:反对Pack200工具和API

### JAVA 12

* 发行时间：2019-03
* 引入特性：
  - 189: Shenandoah: A Low-Pause-Time Garbage Collector (Experimental) ：新增一个名为 Shenandoah 的垃圾回收器，它通过在 Java 线程运行的同时进行疏散 (evacuation) 工作来减少停顿时间。
  - 230: Microbenchmark Suite：新增一套微基准测试，使开发者能够基于现有的 Java Microbenchmark Harness（JMH）轻松测试 JDK 的性能，并创建新的基准测试。
  - 325: Switch Expressions (Preview) ：对 switch 语句进行扩展，使其可以用作语句或表达式，简化日常代码。
  - 334: JVM Constants API ：引入一个 API 来对关键类文件 (key class-file) 和运行时工件的名义描述（nominal descriptions）进行建模，特别是那些可从常量池加载的常量。
  - 340: One AArch64 Port, Not Two ：删除与 arm64 端口相关的所有源码，保留 32 位 ARM 移植和 64 位 aarch64 移植。
  - 341: Default CDS Archives ：默认生成类数据共享（CDS）存档。 344: Abortable Mixed Collections for G1 ：当 G1 垃圾回收器的回收超过暂停目标，则能中止垃圾回收过程.346: Promptly Return Unused Committed Memory from G1 ：改进 G1 垃圾回收器，以便在空闲时自动将 Java 堆内存返回给操作系统。

## 1.5 开发环境搭建

### 基本步骤

搭建Java开发环境在各个平台上都是大同小异的，大致包括以下步骤

1. 下载jdk的压缩包，这里选择压缩包是因为安装包是一个黑箱，我们不知道它到底在安装时做了什么不便于我们理解JDK的原理和结构。
2. 把包含JDK的压缩包解压到你想要放置JDK的目录
3. 配置环境变量JAVA_HOME，指向刚解压的JDK的根目录。这一步使用配置JAVA_HOME的原因有两个，第一可以在下一步配置PATH时引用JAVA_HOME，当需要改动JDK位置时就可以只改动JAVA_HOME这一个变量达成目的。其二是有一些Java应用启动时会根据JAVA_HOME变量来查找JDK的安装位置。
4. 配置环境变量PATH。
5. 命令行运行java和javac确认是否配置正确。

### 各平台的安装具体步骤

根据平台和版本不同，JDK的安装有一些细微的差别。下面是Oracle提供的Java SE 安装指南。

[Java SE 11 Installation Guide](https://docs.oracle.com/en/java/javase/11/install/overview-jdk-installation.html#GUID-8677A77F-231A-40F7-98B9-1FD0B48C346A)

## 1.6 编译与运行Java程序

### 单个文件编译运行

首先创建一个`Hello.java`文件

```java
// Hello.java
public class Hello{
  public static void Main(String[] args){
    System.out.println("hello world");
  }
}
```

编译，在命令行下执行（这里我使用的是bash），

```bash
javac Hello.java
# 编译完成后查看文件夹下的文件
ls
```

结果如下：

```text
Hello.class Hello.java
```

可以看到编译产生了`Hello.class`字节码文件。

运行

```bash
java Hello
```

要注意这里运行Java程序只需要输入包含Main方法的类名即可，不需要输入文件名。

运行结果如下：

```text
hello world
```

### 多个文件的编译

创建`SayHello.java`文件，定义一个`sayHello`方法

```java
// SayHello.java
public class SayHello{
  public static void sayHello(){
      System.out.println("hello");
  }
}
```

创建`Hello.java`文件，调用上面的`sayHello`方法

```java
// Hello.java
public class Hello{
   public static void main(String[] args) {
    SayHello.sayHello();
  }
}
```

在命令行下进行编译，你可以分别编译`SayHello.java`和`Hello.java`两个文件，也可以直接编译`Hello.java`Java编译器将自动编译`Hello.java`所依赖的类文件。

> [warn]
> 当你让Java编译器自动寻找依赖进行编译时，

```bash
javac Hello.java
```

这样在当前文件夹下就会生成`Hello.class`和`SayHello.class`。

### 包含包结构的Java程序编译和运行

一般的为了更好的组织程序代码，Java使用包来组织代码。

> [info]
> 包之间并没有父子关系，比如`cn.ntboy`与`cn.ntboy.sub`，在文件结构上是包含关系，但在Java语言层面上并无包含关系

创建`Hello.java`类文件，这次我们将他放在一个包内`cn.ntboy`，所以还要创建两层目录，同时这个类文件的全类名就变成了`cn.ntboy.Hello`，这个全类名在我们运行这个程序时会用到。

```bash
mkdir -p cn/ntboy
touch cn/ntboy/Hello.java
tree
```

运行结果如下

```text
.
└── cn
    └── ntboy
        └── Hello.java

2 directories, 1 file
```

为`Hello.java`添加内容

```java
// 表示当前类文件所属的包
package cn.ntboy;

public class Hello{
  public static void main(String[] args) {
    System.out.println("hello world");
  }
}
```

编译，编译时不指定`-classspath`或`-cp`选项时，默认以`cwd`即当前命令行所在的文件夹为classpath，即在当前文件夹下搜索依赖（Java提供的内置类库除外），所以有两种编译方式。

1. 在项目的根目录，即包含你刚创建的包目录的目录下进行编译。
2. 在编译时显式的指明classpath

假如我刚才的文件就创建在`~/java_test`下

```bash
# 在项目根目录编译
javac cn/ntboy/Hello.java
```

或

```bash
# 在任意目录编译
javac -cp `echo ~/java_test/` ~/java_test/cn/ntboy/Hello.java
```

> [info]
> 上面命令中的`echo ~/java_test\`被`包围之后就会先执行，而把执行后的值替换到相应的位置
> 因为javac不会自动将相对于用户根目录的路径展开


这两种方式的结果是相同的，都会在`Hello.java`文件相同的目录下生成`Hello.class`。

> [info]
> 如果你想把源文件和目标文件分开，还可以指定`-d`选项，这个选项指定一个目录来存放生成的目标文件。
> 更加详细的javac 文档，可以参考[Java SE 11 Tools Reference - javac](https://docs.oracle.com/en/java/javase/11/tools/javac.html#GUID-AEEC9F07-CB49-4E96-8BC7-BCC2C7F725C9)

运行，相同的运行也可以有两种方式

1. 在根目录运行
2. 添加`-cp`或`-classpath`选项，在任意位置运行

```bash
# 在根目录运行
java cn.ntboy.Hello

# 在任意位置运行
java -cp `echo ~/java_test/` cn.ntboy.Hello
```

> [info]
> [java 命令详细文档](https://docs.oracle.com/en/java/javase/11/tools/java.html#GUID-3B1CE181-CD30-4178-9602-230B800D4FAE)

### Jar包相关的Java程序运行

#### 什么是JAR包

Jar(Java Archive)Java归档文件是一种软件包文件格式，通常用作归档聚合大量的Java类文件、相关的元数据和资源文件到一个文件，以便于分发。

#### 创建一个JAR包

我们选择将[上面提到的例子](#包含包结构的java程序编译和运行)打包成一个jar包，首先我们将项目生成到一个独立的文件夹下，以便我们打包时可以不受源文件的影响。

```bash
# 不用担心目标目录是否创建，因为javac会为你创建
javac -cp `echo ~/java_test/` ~/java_test/cn/ntboy/Hello.java -d ~/java_test/target
```

然后JDK提供的jar命令进行打包

```bash
# 移动到目标文件夹
cd ~/java_test/target

# 打包
jar -cvf hello.jar *
```

> [info]
> [jar 命令详细文档](https://docs.oracle.com/en/java/javase/11/tools/jar.html#GUID-51C11B76-D9F6-4BC2-A805-3C847E857867)

```text
added manifest
adding: cn/(in = 0) (out= 0)(stored 0%)
adding: cn/ntboy/(in = 0) (out= 0)(stored 0%)
adding: cn/ntboy/Hello.class(in = 319) (out= 237)(deflated 25%)
```

#### 运行一个JAR包

上面打好的Jar包并不能直接运行，因为我们还没有指定程序的入口点。我们有两种方式指定程序的入口点

1. manifest文件
2. -e或--main-class 选项

```bash
# manifest文件
touch manifest.mf
jar cvfm hello.jar manifest.mf cn/*
```

manifest.mf

```mf
Main-Class: cn.ntboy.Hello

```

> [warn]
> manifest.mf文件必须以一个空行结束。

```bash
# -e选项
jar -cvfe cn.ntboy.Hello cn/*
```

运行jar

```bash
java -jar hello.jar
```

#### 依赖于外部JAR包的程序编译

创建一个Jar包，包含一个类，`SayHello`

```java
package cn.ntboy.say;

public class SayHello{
  public static void sayHello(){
    System.out.println("hello");
  }
}
```

```bash
javac cn/ntboy/say/SayHello -d target
cd target
jar cf say.jar *
```

现在我们有`say.jar`了，我们想在一个新的类`Hello`里面调用`sayHello`这个方法。

```java
package cn.ntboy;

public class Hello{
  public static void Main(String[] args){
    cn.ntboy.say.SayHello.sayHello();
  }
}
```

现在这个类依赖于一个外部Jar包（`say.jar`）里面的一个类。所以编译时要在classpath里面包含这个jar包，才可以编译。

```bash
javac -cp `echo ~/java_test/target/say.jar` cn/ntboy/Hello.java
```

#### 依赖JAR包的程序运行

接上，刚编译的`Hello.class`依赖于`say.jar`，所以运行时也需要把`say.jar`加入`classpath`

```bash
# 合并多个classpath，并用冒号隔开
cp="`echo ~/java_test/target/say.jar`:`echo ~/java_test/`"
# 运行程序
java -cp $cp cn.ntboy.Hello
```

> [info]
> 多个classpath要用分隔符分开，在linux平台上要用冒号(`:`)，而在windows平台上要用分号(`;`)隔开。

## 1.7 集成开发环境

集成开发环境（IDE，Integrated Development Environment ）是用于提供程序开发环境的应用程序，一般包括代码编辑器、编译器、调试器和图形用户界面等工具。集成了代码编写功能、分析功能、编译功能、调试功能等一体化的开发软件服务套。所有具备这一特性的软件或者软件套（组）都可以叫集成开发环境。

### eclipse

Eclipse 是一个开放源代码的、基于Java的可扩展开发平台。就其本身而言，它只是一个框架和一组服务，用于通过插件组件构建开发环境。

### netbeans

NetBeans是Sun公司（2009年被甲骨文收购）在2000年创立的开放源代码供开发人员和客户社区的家园，旨在构建世界级的Java IDE。NetBeans当前可以在Solaris、Windows、Linux和Macintosh OS X平台上进行开发，并在SPL(Sun公用许可)范围内使用。

### IntelliJ IDEA

DEA是JetBrains公司的产品，这家公司总部位于捷克共和国的首都布拉格，开发人员以严谨著称的东欧程序员为主。它的旗舰版本还支持HTML，CSS，PHP，MySQL，Python等。免费版只支持Python等少数语言。

### Android Studio

由Google开发的主要针对Android应用程序，它已经证明与Java编码相当优秀。它对支持Google服务和设备相当顺滑。
