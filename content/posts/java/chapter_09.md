---
title: "[Java笔记]第九章 常用类"
date: 2019-08-08T12:19:59+08:00
draft: false
categories:
    - "javase"
tags: 
    - "java"
    - "javase"
    - "包装类"
    - "String"
    - "Scanner"
    - "Math"
    - "日期时间"
toc: true
---

# 第九章 常用类

## 9.1 Java的包装类

### 9.1.1 什么是包装类型

Java 设计当初就提供了 8 种 基本数据类型及对应的 8 种包装数据类型。我们知道 Java 是一种面向对象编程的高级语言，所以包装类型正是为了解决基本数据类型无法面向对象编程所提供的。

### 9.1.2 八种基本类型的包装类

|基本数据类型|包装类型|
|:--|:--|
byte|Byte
boolean|Boolean
short|Short
char|Charactor
int|Integer
long|Long
float|Float
double|Double

### 9.1.3 包装类的继承结构

![wrapper_class](https://s2.ax1x.com/2020/02/11/1o20Ld.png)

### 9.1.4 包装类的应用场景

#### 1. 泛型只能是包装类

```java
// 编译时异常
List<int> list1 = new ArrayList<>();

// 正确写法
List<Integer> list1 = new ArrayList<>();
```

#### 2. 不能包含默认值的成员变量

```java
private int status;
```

基本数据类型的成员变量都有默认值，如以上代码中的status默认值是0，如果定义中0代表失败或者异常，那么在一定的情境下就会有问题。使用包装类Integer，它的默认值是null，就可以避免默认值的影响了。

#### 3. 方法参数允许定义空值

```java
private static void test1(int status){
    System.out.println(status);
}
```

看以上代码，方法参数定义的是基本数据类型 int，所以必须得传一个数字过来，不能传 null，很多场合我们希望是能传递 null 的，所以这种场合用包装类比较合适。

### 9.1.5 自动装箱、拆箱

Java 5 增加了自动装箱、拆箱机制，提供基本数据类型和包装类型的相互转换操作。

在 Java 5 之前要用整型数初始化一个Integer类的实例一般要这样

```java
Integer i = Integer.valueOf(10);
```

Java 5 提供了一个语法糖，叫做自动装箱。现在你可以直接对Integer对象赋值而不用调用valueOf方法

```java
Integer i = 10;
```

相似的，在Java 5 之前用Integer对象赋值给整型变量的代码如下

```java
Integer a = Integer.valueOf(10);
int b = a.intValue();
```

Java 5 提供了另一个语法糖，叫做自动拆箱。用来简化显式的intValue方法调用。上面的代码在Java 5 之后就可以简化为下面这段代码。

```java
Integer a = 10;
int b = a;
```

让我们来从字节码的角度看看这些语法糖的真实面貌

创建`Test.java`源文件内容如下

```java
public class Test{
    public static void Main(String[] args){
        Integer i = 10;
        int a = i;
    }
}
```

在命令行下编译

```bash
javac Test.java
```

为了搞清楚我们上面的源代码被编译器做了什么，我们接下来查看反编译的字节码，使用`javap`命令可以查看，如下

```bash
javap -v Test.class
```

我们可以得到很多信息，下面只展示最重要的部分

```text
0: bipush        10
2: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
5: astore_1
6: aload_1
7: invokevirtual #3                  // Method java/lang/Integer.intValue:()I
10: istore_2
11: return
```

如果您有一定的字节码知识就可以很明显的看到,在将基本类型赋值给包装类时，调用了包装类`Integer`的静态工厂方法`valueOf`方法，这个过程叫做自动装箱。相反的将包装类赋值给基本类型时，调用了包装类对象的`intValue`实例方法，这个过程叫做自动拆箱。

### 9.1.6 IntegerCache

考虑下面代码

```java
Integer a = 10;
Integer b = 10;
Integer c = 200;
Integer d = 200;

System.out.println(a == b);
System.out.println(c == d);
```


你可能会说，根据所学的数学知识，很显然有下面的结果

```text
true
true
```

但是我们要注意的是现在比较的并不是数值是否相同，而是在比较两个对象的引用是不是指向同一个对象。这样的话看起来他们都是不同的对象引用，所以结果是都不同吗？

```text
false
false
```

你可以先停一下，再考虑一下上面代码的输出是什么？

下面给出运行的结果

```text
true
false
```

你可能有所疑惑为什么判断两个Integer对象是否是同一个引用两次返回了不同的值

首先我们要明确两点

1. 我们现在比较相等的是两个对象的引用
2. 根据我们上面的自动装箱，我们得到Integer的对象引用是通过`valueOf`方法实现的

那么我们就有两个新的问题

1. 在什么条件下两个引用是相同的，什么条件下是不同的
2. valueOf方法到底做了什么

第一个问题，两个引用引用的是同一个对象就是相同的返回的就是true，自然的其他情况就是不同的返回的就是false。

第二个问题，也很简单，让我们一起查看一下valueOf的代码实现就可以知道它干了什么，这里我就直接说结果。valueOf接受一个整形变量作为参数，先判断了参数值的大小，如果在一定的范围内，在这个范围内它预先创建好了这个整些整型数的对象，如果参数满足在这个范围内就直接返回预先创建的对象。如果不在这个范围内就创建新的对象，并返回。

答案就近在眼前了，如果一个整数在这个范围内就可以返回同一个引用，如果不在这个范围内，就不是同一个引用。

#### 这有什么好处和坏处

好处是对于一些常用的数字，比如循环的次数，迭代的次数，缓存可以减少对象创建的开销，从而提高程序的性能。

坏处也是显而易见的，我们不能通过`==`直接判断数字的值是否相同（当然对于对象的具体意义是否相同的问题我们应该一直使用equals方法，或者自定义一个判断的方式）

#### 其他的包装类是否有类似的机制

所有整数类都是类似的机制

* ByteCache 用于缓存 Byte 对象
* ShortCache 用于缓存 Short 对象
* LongCache 用于缓存 Long 对象

#### 这个范围是固定的吗

所有这些缓存的默认范围都是-128到127

但只有Integer可以通过参数修改IntegerCache的上限

## 9.2 字符串类

字符串是我们非常常用的东西，就像我们的第一个`Hello world`程序，就向控制台输出了一段字符串。顾名思义字符串就是由一串字符组成的。

### 9.2.1 String不可变字符串

查看String类的源代码可以发现，String类被`final`关键字修饰，所以String类的实例是不可改变的。也就是String对象一旦创建就不能进行更改。那么我们经常用`+`运算符进行字符串的拼接又是怎么一回事呢？

```java
String a = "foo ";
String b = "bar";
String c = a + b;  
```

编译并反编译上面这段代码

### 9.2.2 可变字符串

#### StringBuffer

#### StringBuilder

## 9.3 Scanner类

## 9.4 java.lang.Math类

这个类包含了一些基础的数学运算，包括幂运算，对数运算，求根运算，三角函数等。

这个类下的所有方法都是静态的。

具体函数以及说明可以参考 [java11帮助和文档-java.lang.Math](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Math.html)

## 9.5 日期时间处理类

