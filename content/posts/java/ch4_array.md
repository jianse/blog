---
title: "第四章 数组与数组操作"
date: 2019-07-23T12:19:59+08:00
draft: false
categories: javase
categories_weight: 4
toc: true
---

# 第四章 数组与数组操作

## 4.1 数组

数组是一种数据结构， 用来存储同一类型值的集合。通过一个整型下标可以访问数组中 的每一个值。例如， 如果 a 是一个整型数组， a[i] 就是数组中下标为 i 的整数。

在声明数组变量时， 需要指出数组类型 （数据元素类型紧跟 []) 和数组变量的名字。下 面声明了整型数组 a:

``` java
int[] a;
```

不过， 这条语句只声明了变量 a， 并没有将 a 初始化为一个真正的数组。应该使用 new 运算 符创建数组。

``` java
int[] a = new int[100];
```

这条语句创建了一个可以存储 100 个整数的数组。数组长度不要求是常量： `new int[n]` 会创建 一个长度为 n 的数组。

> **注意**
>
> 可以使用下面两种形式声明数组
>  
>
> ``` java
> int[] a;
> ```
>
> 或
>  
>
> ``` java
> int a[];
> ```
>
> 两种形式都是正确的, 但第一种更明确一些, 因为它将类型 `int[]` 与变量名分开了.

## 4.2 数组的初始化以及匿名数组

### 4.2.1 数组的初始化

在Java中, 提供了一种创建数组对象并同时赋予初始值的简化书写形式。下面是一 例子：

``` java
String[] names={"James","Jhon","Mecheal","Sarah"}
```

**注意** 在使用这种语句时, 不需要调用 `new` .

### 4.2.2 匿名数组

匿名数组就是没有引用的数组

``` java
new String[] {"Tom","Jerry"};
```

这种表示法将创建一个新数组并利用括号中提供的值进行初始化，数组的大小就是初始值的 个数。使用这种语法形式可以在不创建新变量的情况下重新初始化一个数组。例如：

``` java
String[] names= {"James","Sarah","Artanis"};
System.out.println(Arrays.toString(names));
names= new String[] {"Tom","Jerry"};
System.out.println(Arrays.toString(names));
```

运行结果如下:

``` text
[James, Sarah, Artanis]
[Tom, Jerry]
```

这段代码初始化了一个 `names` 变量, 赋值并输出了该变量, 然后用匿名数组重新为 `names` 赋值, 并输出了 `names` 的值.

## 4.3 遍历数组

### 4.3.1 for 循环

``` java
int[] array=...;
for(int i=0;i<array.length;i++){
    ...
    System.out.println(array[i]);
    ...
}
```

### 4.3.2 for each 循环(java 1.5)

``` java
int[] array=...;
for(int item:array){
    ...
    System.out.println(item);
    ...
}
```

> **扩展阅读**
> 有个更加简单的方式打印数组中的所有值，即利用 Arrays 类的 toString 方法。
> 调用 `Arrays.toString(a)` , 返回一个包含数组元素的字符串，这些元素被放置在括号内， 并用逗号分隔，
> 例如:“[2, 3, 5, 7，11，13]”、 要想打印数组， 可以调用  
>
>``` java
> System.out.println(Arrays.toString(a));
> ```

## 4.4 数组拷贝

在 Java中，允许将一个数组变量拷贝给另一个数组变量。这时，++两个变量将引用同一个数组++(即**浅拷贝**)

``` java
String[] scNames={"James","Sarah","Artanis"};
String[] names=scNames;
```

![array_shallow_copy](https://s2.ax1x.com/2019/08/16/mZibTK.png)

如果希望将一个数组的所有值拷贝到一个新的数组中去(即**深拷贝**)， 就要使用 Arrays 类的 copyOf方法：

``` java
String[] names=Arrays.copyOf(scNames,scNames.length);
```

![array_deep_copy](https://s2.ax1x.com/2019/08/16/mZiHw6.png)

## 4.5 数组排序

要想对数组进行排序，可以使用Arrays类中的sort方法：

``` java
int[] a = new[10000];
...
Arrays.sort(a);
```

这个方法使用了优化的快速排序算法。快速排序算法对于大多数数据集合来说都是效率比较高的。

## 4.6 多维数组

多维数组将使用多个下标访问数组元素, 它适用于表示表格或更加复杂的排列形式.

观感上它更像是一个数组的嵌套, 或者说是一些数组组成的数组.

在 Java中， 声明一个二维数组相当简单。例如：

``` java
double[][] balances;
```

与一维数组一样， 在调用 new 对多维数组进行初始化之前不能使用它。在这里可以这样初始化：

``` java
balances = new double[NYEARS][NRATES];
```

另外， 如果知道数组元素， 就可以不调用 new， 而直接使用简化的书写形式对多维数组 进行初始化。例如：

``` java
int[][] magicSquare = {
    {16, 3, 2, 13},
    {5, 10, 11, 8},
    {9, 6, 7, 12},
    {4, 15, 14, 1}
};
```

一旦数组被初始化， 就可以利用两个方括号访问每个元素， 例如，

``` java
balances[i][j];
```

> **不规则数组**
>  
> 到目前为止，读者所看到的数组与其他程序设计语言中提供的数组没有多大区别。但实际存在着一些细微的差异， 而这正是 Java 的优势所在：Java 实际上没有多维数组，只有一维 数组。多维数组被解释为"**数组的数组**"。
>
> ![irregular_array](https://s2.ax1x.com/2019/08/16/mZi7ex.png)
>  
> 上图是一个杨辉三角形的例子
>
> 具体代码如下:
>  
>
> ``` java
>
> public class IrregularArrayTest {
> public static void main(String[] args) {
>     int[][] array = new int[10][];
>         for (int i = 0; i < 10; i++) {
>             array[i] = new int[i + 1];
>             for (int j = 0; j <= i; j++) {
>                 if (i == 0) {
>                     array[i][j] = 1;
>                     continue;
>                 }
>                 if (j == 0) {
>                     array[i][j] = array[i - 1][j];
>                     continue;
>                 }
>                 if (i == j) {
>                     array[i][j] = array[i - 1][j - 1];
>                     continue;
>                 }
>                 array[i][j] = array[i - 1][j] + array[i - 1][j - 1];
>             }
>         }
>         for (int i = 0; i < array.length; i++) {
>         for (int j = 0; j < array[i].length; j++) {
>             System.out.print(array[i][j] + "\t");
>         }
>         System.out.println("\t" + array[i].length);
>     }
> }
> }
>
>```

