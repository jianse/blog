---
title: "第三章 流程控制"
date: 2019-07-20T12:19:59+08:00
draft: false
categories: javase
categories_weight: 3
toc: true
---

# 第三章 流程控制

## 3.1 块与作用域

在深入学习控制结构之前, 需要了解块(block)的概念.

块(即复合语句)是指由一对大括号括起来的若干条简单的Java语句. 块确定了变量的作用域. 一个块可以嵌套在另一个块中.

``` java
public static void main(String[] args){
    //这是main函数块
    {
        //这个块嵌套在mian函数内
        int a;
        //a的作用域就在这个块内
    }
}
```

> **扩展阅读**
>  
> 常见的块有:
>
> 1. 类定义后跟的块: 这个块是我们常见的最大的作用域
> 2. 函数后跟的块
> 3. 条件/循环语句后跟的块
>  
> 其中条件/循环语句后跟的块如果块内只有一条语句则可以省略块标识符, 即省略 `{}`

## 3.2 顺序结构

顺序结构是程序中最基本, 最简单, 最常见的结构, 程序的执行顺序就是从上至下依次执行的

![order](https://s2.ax1x.com/2019/08/15/mViUAO.png)

## 3.3 条件结构

### 3.3.1 if else 语句

#### 单if分支

![if_single_branch](https://s2.ax1x.com/2019/08/15/mViDgA.png)

``` java
if(conditions){
    //some code
}
```

#### if/else双分支

![if_else](https://s2.ax1x.com/2019/08/15/mVi09H.png)

``` java
{
    //some code
    if(conditions){
        //this branch when true
        branch one
    }else{
        //this branch when false
        branch two
    }
    //some code
}
```

#### if/else if/else 多分支

![if_muti_branch](https://s2.ax1x.com/2019/08/15/mViyut.png)

``` java
if(conditons1){
    code1;
}else if(conditions2){
    code2;
}else if(conditionsn){
    coden;
}else{
    else code;
}
```

### 3.3.2 switch 语句

在处理多个选项时, 使用if/else结构显得有些笨重. Java有一个和C/C++完全一样的switch语句.

``` java
{
    switch(choice){
        case 1:
            ...
            break;
        case 2:
            ...
            break;
        default:
            //not a compatitive case
            ...
            break;
    }
}
```

switch语句将从与选项值相匹配的 `case` 标签处开始执行直到遇到 `break` 语句, 或者执行到switch语句的结束处为止。如果没有相匹配的case标签, 而有default 子句, 就执行这个子句。

## 3.4 循环结构

### 3.4.1 while 循环

当条件为true时, while循环执行其后的语句块. 一般格式为

``` java
while(conditions) {statement}
```

![while](https://s2.ax1x.com/2019/08/15/mVicHf.png)

> **实例**: 计算1-100的和
>  
>
> ``` java
> int sum=0;
> int temp=1;
> while(temp<=100){
>     sum+=temp;
>     temp++;
> }
> ```

### 3.4.2 do while 循环

do while 循环是后置判断循环, 就是先执行循环体一次, 再进行条件的判断. 它的语法格式是:

``` java
do {
    statement
}while(conditions);
```

![do_while](https://s2.ax1x.com/2019/08/15/mVirjI.png)

> **实例**: 为用户显示菜单
>
> **分析**: 当用户启动我们的应用程序时, 我们应该呈现给用户我们的用户界面, 并且开始一个循环, 等待用户的指令再进行下一步的响应
>  
>
> ``` java
> do{
>    //显示用户界面
>    showUserInterface();
>    //等待用户的指令
>    waitingForUserCommand();
>    //处理用户指令
>    handleCommand();
>    //更新用户界面
>    updateUserInterface();
>    //当程序还在运行时继续循环
> }while(isRunning())
> ```
>
> 当然真正的应用程序可能没有这么简单, 但是逻辑是这样的.

### 3.4.3 for 循环

for循环语句是支持迭代的一种通用结构, 利用每次迭代之后更新的计数器或者类似的变量来控制迭代次数

``` java
for(int i=0;i<10;i++){
    System.out.println(i);
}
```

流程图同while循环, 所以for循环和while循环可以相互转化.

### 3.4.4 中断控制流语句

#### break

break语句可以中断程序的执行流, 将程序的执行流重新定向到块的结束位置

##### 不带标签的break

与用于退出switch语句的break语句一样, 它也可以用于退出循环语句.

**例如**: 寻找大于1000的第一个质数, 当我们找到第一个满足条件的数就可以停止了.

``` java
int i=1000;
while(true){
    if(isPrimeNumber(i)){
        System.out.println(i);
        break;
    }
    i++;
}
```

##### 带标签的break

与 C++ 不同，Java 还提供了一种带标签的 break语句，用于跳出多重嵌套的循环语句。 有时候，在嵌套很深的循环语句中会发生一些不可预料的事情。此时可能更加希望跳到嵌套 的所有循环语句之外。通过添加一些额外的条件判断实现各层循环的检测很不方便。

``` java
Scanner in=new Scanner(System.in);
int n;
read_data:
while(...){
    for(...){
        System.out.println("Enter a number >=0: ");
        n=in.nextInt();
        if(n<0)
            break read_data:
    }
}
```

**扩展**带标签的break语句还可以用在语句块上如:

``` java
label:
{
    ...
    if(condition)
        break label;//exits block
    ...
}
//jumps here when the break statement executes
```

**注意**只能跳出语句块, 不能跳入语句块

#### continue

与break相似, continue也能中断程序流, 与break不同的是continue将程序流重定向到块的开始位置

##### 不带标签的continue

不带标签的continue只能跳到当前循环的首部

**实例**: 输出100以内除4的倍数外剩下的数

``` java
for(int i=0;i<100;i++){
    if(i%4==0){
        continue;
    }
    System.out.println(i);
}
```

##### 带标签的continue

带标签的continue语句可以跳到循环的开始处

``` java
label:
for(...){
    for(...){
        if(...){
            continue label;
        }
        ...
    }
}
```

**注意**: 和break不同continue并不能用在任意的块上, 只能用在循环语句中.

### 3.4.5 循环的嵌套

当解决一些复杂问题时常常需要在一次循环中执行另一个循环, 这就是循环的嵌套

**例如** 计算1!+2!+... +n!

``` java
int n=10;

int sum=0;
for(int i = 1;i=<n;i++){
    //For a factorial operation, the result must be initialized to 1,
    //because zero is multiplied by any number to get zero
    int temp=1;
    for(int j=1;j<=i;j++){
        temp*=j;
    }
    sum+=temp;
}
```

**注意** 这个例子的实现方法显然不够高效, 事实上我们只需要一层循环就可以解决以上问题.

``` text
通过观察我们可以看到

2!=1!*2
3!=2!*3
...
n!=(n-1)!*n
```

然后上面的算法就得到了简化

``` java
int sum=0;
int temp=1;
for(int i=1;i<=n;i++){
    temp*=i;
    sum+=temp;
}
```

