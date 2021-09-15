---
title: "第十二章 流与文件"
date: 2019-08-20T12:19:59+08:00
draft: false
categories: javase
categories_weight: 12
toc: true
tags: ["java","流","文件"]
---

# 第十二章 流与文件

## 12.1 什么是流

流是一组有顺序的，有起点和终点的字节集合，是对数据传输的总称或抽象。即数据在两设备间的传输称为流。流的本质是数据传输，根据数据传输特性将流抽象为各种类，方便更直观的进行数据操作。

## 12.2 流的分类

1. 按数据流的方向

   - 输入流
   - 输出流

2. 按处理数据类型

   - 字符流
   - 字节流

3. 按功能不同

   - 节点流
   - 处理流

下面按照功能展开讨论

## 12.3 节点流
<!-- markdownlint-disable MD033 -->
| 类型          | 字符流                             | 字节流                                        |
| :------------ | :--------------------------------- | :-------------------------------------------- |
| File          | FileReader<br>FileWriter           | FileInputStream<br>FileOutputStream           |
| Memory Array  | CharArrayReader<br>CharArrayWriter | ByteArrayInputStream<br>ByteArrayOutputStream |
| Memory String | StringReader<br>StringWriter       | -                                             |
| Pipe          | PipedReader<br>PipedWriter         | PipedInputStream<br>PipedOutputStream         |

* File 文件流。对文件进行读、写操作 ：FileReader、FileWriter、FileInputStream、FileOutputStream。
* Memory 内存流
  - 从/向内存数组读写数据: CharArrayReader与 CharArrayWriter、ByteArrayInputStream与ByteArrayOutputStream。
  - 从/向内存字符串读写数据 StringReader、StringWriter、StringBufferInputStream。
* Pipe 管道流。 实现管道的输入和输出（进程间通信）: PipedReader与PipedWriter、PipedInputStream与PipedOutputStream。

?> _TODO_ 添加详细介绍小节

## 12.4 处理流

### 12.4.1 处理流的类型

| 处理类型        | 字符流                                  | 字节流                                      |
| :-------------- | :-------------------------------------- | :------------------------------------------ |
| Buffering       | BufferedReader<br>BufferedWriter        | BufferedInputStream<br>BudderedOutputStream |
| Filtering       | FilterReader<br>FilterWriter            | FilterInputStream<br>FilterOutputStream     |
| Converting      | InputStreamReader<br>OutputStreamWriter | -                                           |
| Serialization   | -                                       | ObjectInputStream<br>OnjectOutputStream     |
| Data conversion | -                                       | DataInputStream<br>DataOutputStream         |
| Counting        | LineNumberReader                        | LineNumberInputStream                       |
| Peeking ahead   | PushbackReader                          | PushbackInputStream                         |
| Printing        | PrintWriter                             | PrintStream                                 |
| Merge           | -                                       | SequenceInputStream                         |

<!-- markdownlint-enable MD033 -->

* Buffering缓冲流：在读入或写出时，对数据进行缓存，以减少I/O的次数
* Filtering 滤流：在数据进行读或写时进行过滤 , 抽象类 .
* Converting between Bytes and Characters 转换流：按照一定的编码/解码标准将字节流转换为字符流，或进行反向转换（Stream到Reader）
* Object Serialization 对象流
* DataConversion 数据流： 按基本数据类型读、写（处理的数据是Java的基本类型（如布尔型，字节，整数和浮点数））
* Counting计数流： 在读入数据时对行记数
* Peeking Ahead预读流： 通过缓存机制，进行预读
* Printing打印流： 包含方便的打印方法
* Merge 合并流: 合并多个输入流的方法

### 12.4.2 缓冲流

对I/O进行缓冲是一种常见的性能优化，缓冲流为I/O流增加了内存缓冲区，增加缓冲区的两个目的：

1. 允许Java的I/O一次不只操作一个字符，这样提高整个系统的性能；
2. 由于有缓冲区，使得在流上执行skip、mark和reset方法都成为可能。

### 12.4.3 转换流

转换流有两种：

1. InputStreamReader：将字节流转换为字符流;
2. OutputStreamWriter：将字符流转换为字节流。

> [warn] **什么时候需要转换流?**
>
> 当你处理字符而不想处理复杂的编码解码过程时.

### 12.4.4 数据流

数据流：DataInputStream和DataOutputStream

DataInputStream和DataOutputStream是面向字节的，因此要使用InputStream和OutputStream。

DataInputStream和DataOutputStream分别继承InputStream和OutputStream，

它们属于处理流，需要分别“套接”在InputStream和OutputStream类型的节点流上。

DataInputStream和DataOutputStream提供了可以存取与机器无关的Java原始类数据（如：int，double等）的方法。

DataInputStream和DataOutputStream的构造方法：

## 12.5 操作文件

File是java.io包下面的一个类，代表与平台无关的文件或者目录。JAVA中，无论文件还是目录，都可以看作File类的一个对象。File类能对文件或目录新建，删除，获取属性等操作，但是不能直接操作文件内容（文件内容需要用数据流访问）。

JVM默认会将workspace作为相对路径，即user.dir系统变量所指路径, 即如果这样初始化file对象，File file = new File("."); 就是获取了user.dir路径。

> **java 1.7 引入了新的文件工具类[java.nio.file包](#128-javanio包)用来代替旧的File类**

### 12.5.1 File

* 常用方法

```text
String getName() -如果file对象是一个文件，则返回文件名，如果是路径，则返回路径的最后一级

File getAbsoluteFile() -返回绝对路径

String getParent() -返回file对象所在目录的父目录
```

* 检查文件

```text
exists()-文件或目录是否存在

canRead()-是否可读

isFile()-是否是文件

isDirectory()-是否是目录
```

* 获取文件属性

```text
long lastModified() -最后修改时间

long length() -文件长度
```

* 进行文件操作

```text
createFile() -成功true，失败false

delete()

mkdir() -创建目录 ，file对象必须对应一个路径

String[] list() - 如果file对象是一个路径，list()将返回一个数组，如果路径下没有文件和子目录，则数组为empty；如果file对象是一个文件，或者file路径不存在，或者发生IO错误，则list()返回null

File[] listFiles() -同上，只不过返回的是File类型数组
```

## 12.6 流的使用

``` java
InputStream in = new FileInputStream("/home/foo/test.txt");
byte[] buffer = new byte[1024];
int len = in.read(buffer);
in.close();

OutputStream out = new FileOutputStream("/home/foo/target.txt");
out.write(buffer,0,len);
out.close();
```

## 12.7 java.io中的设计模式

> [warn] See also [java.io中的设计模式](https://www.cnblogs.com/wxgblogs/p/5649933.html)
>
> **注意** : 上面链接中StringBufferInputStream已经弃用。

### 12.7.1 装饰器模式

java.io包中IO流的设计使用了一种叫做装饰设计模式的方式 , 顾名思义就是在流的外部加上一层装饰, 以增强它的功能 .

例如: 下面代码创建了一个文件输入流

``` java
InputStream in = new FileInputStream("/home/foo/test.txt");
```

现在我想把这个流加上一个缓冲区以提高其性能

``` java
BufferedInputStream bin = new BufferedInputStream(in);
```

这样FileInputStream就被装饰了起来, 从而增加了缓冲的功能 .

> [info] 详见 [装饰器模式|菜鸟教程](https://www.runoob.com/design-pattern/decorator-pattern.html)

### 12.7.2 适配器模式

ByteArrayInputStream是一个适配器类 。ByteArrayInputStream继承了InputStream的接口，而封装了一个byte数组。换而言之，它将一个byte数组的接口适配成了InputStream流处理器的接口。 java语言支持四种类型：java类、java接口、java数组和原始类型。前三章是引用类型，类和数组的实例都是对象，原始类型的值不是对象。 java语言的数组是像所有其他对象一样的对象，而不管数组中所存放的元素的类型是什么。这样一来，ByteArrayInputStream就符合适配器模式的描述，而且是一个对象形式的适配器类。

> [info] 详见 [适配器模式|菜鸟教程](https://www.runoob.com/design-pattern/adapter-pattern.html)

## 12.8 java.nio包

Java NIO(New IO或者Non-blocking)是一个可以替代标准Java IO API的IO API（从Java 1.4开始)，Java NIO提供了与标准IO不同的IO工作方式。

Java NIO: Channels and Buffers（通道和缓冲区）

标准的IO基于字节流和字符流进行操作的，而NIO是基于通道（Channel）和缓冲区（Buffer）进行操作，数据总是从通道读取到缓冲区中，或者从缓冲区写入到通道中。

Java NIO: Non-blocking IO（非阻塞IO）

Java NIO可以让你非阻塞的使用IO，例如：当线程从通道读取数据到缓冲区时，线程还是可以进行其他事情。当数据被写入到缓冲区时，线程可以继续处理它。从缓冲区写入通道也类似。

Java NIO: Selectors（选择器）

Java NIO引入了选择器的概念，选择器用于监听多个通道的事件（比如：连接打开，数据到达）。因此，单个的线程可以监听多个数据通道。

> [warn] **详见** [并发编程网-nio](http://ifeve.com/java-nio-all/)
>
>上面文档后 3 节有待翻译 , 可以参考[java NIO教程 - 简书](https://www.jianshu.com/p/465ecd909f8c)互相补充查看

### 12.8.1 java.nio.file包

这个包定义了Java虚拟机的接口和类，以访问文件，文件属性和文件系统。用来代替java.io. File类.

