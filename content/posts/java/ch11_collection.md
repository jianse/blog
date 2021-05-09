---
title: "[Java笔记]第十一章 集合框架"
date: 2019-08-15T12:19:59+08:00
draft: false
categories:
    - "javase"
toc: true
---

# 第十一章 集合框架

像C++的STL一样, java也有提供给我们的容器. 它存放在java.util包下, 以Collection和Map为根的两族接口和他们的实现类为主的泛型容器

如下图:

![collection_framework](https://s2.ax1x.com/2019/08/16/mZ0zgU.png)

## 11.1 Collection

Collection接口定义了所有Collection的公共行为

主要的方法有:

|        方法名        |            操作            |
| :------------------: | :------------------------: |
| `isEmpty()` |   判断Collection是否为空   |
| `contains(Object o)` | 判断元素是否在Collection中 |
| `add(T item);` |   向Collection中添加元素   |
| `remove(T item)` |   移除Collection中的元素   |
| `iterate();` |   获得Collection的迭代器   |

## 11.2 List

List接口是Collection接口下的一支, List是Collection的更具体的一类

### 11.2.1 List的特点

1. 元素(逻辑上)以线性方式存储
2. 可以存放重复对象
3. 元素是有序的
4. 可以进行随机存取

### 11.2.2 Vector

Vector是java 1.0 版本时就引入的集合实现类, 它实现了一个可以同台增长的数组, 可以根据所存入的元素动态的伸缩.

Vector是线程安全的, 所以Vector可以在多线程场景下安全的使用, 但也因为线程安全使其效率有所限制

如果不需要线程安全的使用可伸缩的数组可以使用[ArrayList](#1124-arraylist)

### 11.2.3 Stack

Stack是一种先进后出(LIFO)的容器, 它是Vector的子类, 这意味着Stack也是线程安全的.

Stack类为自身提供独立的操作方法

|       方法名       |          操作          |
| :----------------: | :--------------------: |
| `empty()` |     判断栈是否为空     |
| `peek()` | 查看栈顶元素并且不出栈 |
| `pop()` |  弹栈 : 出栈栈顶元素   |
| `push(E item)` | 压栈 : 将元素压入栈顶  |
| `search(Object o)` |  查询元素与栈顶的距离  |

Stack也是java 1.0 时引入的 , java 1.2 时引入了[Deque](#1143-deque)接口, Deque接口及其实现提供了更完整和一致的LIFO堆栈操作集，应优先使用此类。

### 11.2.4 ArrayList

ArrayList顾名思义就是内部有数组实现的List, 它为我们封装了一系列数组操作, 让我们不必考虑增删改查时数组怎样变化, 数组如何扩展, 如何缩小, 然后向我们提供增删改查的接口.

ArrayList实现了RandomACcess接口, 这是一个标记接口(没有方法的接口), 这意味着ArrayList支持常数时间复杂度的随机访问.

ArrayList的访问效率较高, 插入删除效率较低, 适用于多访问少修改的使用场景.

ArrayList 是 java 1.2 时集合框架引入的它与Vector的实现很相似 , 但是ArrayList时线程不安全的. 所以相应的它的效率要比Vector高.

### 11.2.5 LinkedList

LiskedList是List的链表实现, 链表解决了数组插入删除慢的缺点 , Java中所有链表实际上都是双向链接的, 即每个节点同时存放着一个向前的和一个向后的引用 . 所以LinkedList也同时也是Deque接口的实现类.

LinkedList插入删除效率较高, 但是不能进行常数复杂度的随机访问, 所以适用于多增删, 少随机访问的使用场景.

> [info] [LinkedList](#1145-linkedlist) 同时也实现了Deque接口

### 11.2.6 时间复杂度比较

|           操作           | ArrayList时间复杂度 | LinkedList时间复杂度 |
| :----------------------: | :-----------------: | :------------------: |
|      读取get(index)      |        O(1)         |         O(n)         |
|        添加add(E)        |        O(1)         |         O(1)         |
| 指定位置添加add(index, E) |        O(n)         |         O(n)         |
|      删除remove(E)       |        O(n)         |         O(1)         |

## 11.3 Set

Set是Collection接口下的另一支 , 代表了数学上的集合 , 元素是无序的 , 并且不包含重复的元素

### 11.3.1 Set的特点

1. 元素是无序的
2. 没有重复元素

### 11.3.2 HashSet

HashSet 是借助[HashMap](#1152-hashmap) 实现的, 将要插入的值当作HashMap的键, 值是一个固定的Object对象, 因为HashMap的key不能重复所以HashSet的元素就不能重复 .

### 11.3.3 LinkedHashSet

LinkedHashSet继承自HashSet , 源码更少、更简单 , 与HashMap唯一的区别是LinkedHashSet内部使用的是[LinkedHashMap](#1153-linkedhashmap)。这样做的意义或者好处就是LinkedHashSet中的元素顺序是可以保证的 , 也就是说遍历序和插入序是一致的。

### 11.3.4 TreeSet

TreeSet实现了NavigableSet接口 , 该接口定义了一些搜索目标的方法 , 并且该接口扩展了 SortedSet接口 , 所以TreeSet是一个可排序并且可以搜索的集合.

TreeSet包装了一个TreeMap其中Set中的元素是[TreeMap](#1154-treemap)的键, 而值是一个常量. 所有的方法都委托给了TreeMap

因为TreeSet要实现对元素的排序所以元素必须实现Comparable接口以便对元素进行比较.

## 11.4 Queue

Queue接口是Collection接口的子类, 也是集合框架的一员 . Queue接口通常(但不一定)定义了一种先进先出(LIFO)的数据结构

Queue提供了两种操作Queue的方式

1. 出错时抛出异常
2. 出错时返回特殊值

### 队列方法总结

| &nbsp; | 抛出异常  | 返回特殊值 |
| :----: | :-------: | :--------: |
|  插入  |  add(e)   |  offer(e)  |
|  删除  | remove()  |   poll()   |
|  检查  | element() |   peek()   |

Queue实现通常不允许插入 `null` 元素, 即使允许也不应该被插入到Queue中, 因为在poll()方法中返回null用来指示队列为空.

### 11.4.1 Queue的特点

1. 先进先出(LIFO)
2. 一般上不允许插入 `null`
3. 一般不支持随机访问

### 11.4.2 PriorityQueue

基于优先级堆的无界优先级队列。优先级队列的元素根据其 自然顺序排序，或者根据使用的Comparator 构造函数在队列构造时提供。优先级队列不允许null元素。依赖于自然排序的优先级队列也不允许插入不可比较的对象（这样做可能导致 ClassCastException）。

> [warn] **此实现不是同步的** , PriorityQueue 如果任何线程修改队列，则多个线程不应同时访问实例。相反，使用线程安全PriorityBlockingQueue类。

### 11.4.3 Deque

Deque接口扩展了Queue接口提供了一个双端队列, 即既可以从队列的两端出入队的队列

<!-- markdownlint-disable MD033 -->

<table>
 <caption>Summary of Deque methods</caption>
  <thead>
  <tr>
    <td rowspan="2"></td>
    <th scope="col" colspan="2"> First Element (Head)</th>
    <th scope="col" colspan="2"> Last Element (Tail)</th>
  </tr>
  <tr>
    <th scope="col" style="font-weight:normal; font-style:italic">Throws exception</th>
    <th scope="col" style="font-weight:normal; font-style:italic">Special value</th>
    <th scope="col" style="font-weight:normal; font-style:italic">Throws exception</th>
    <th scope="col" style="font-weight:normal; font-style:italic">Special value</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <th scope="row">Insert</th>
    <td><code>addFirst(e)</code></td>
    <td><code>offerFirst(e)</code></td>
    <td><code>addLast(e)</code></a></td>
    <td><code>offerLast(e)</code></td>
  </tr>
  <tr>
    <th scope="row">Remove</th>
    <td><code>removeFirst()</code></td>
    <td><code>pollFirst()</code></td>
    <td><code>removeLast()</code></td>
    <td><code>pollLast()</code></td>
  </tr>
  <tr>
    <th scope="row">Examine</th>
    <td><code>getFirst()</code></td>
    <td><code>peekFirst()</code></td>
    <td><code>getLast()</code></td>
    <td><code>peekLast()</code></td>
  </tr>
  </tbody>
 </table>

<!-- markdownlint-enable MD033 -->

Deque扩展了Queue. 当deque用作队列时，会产生FIFO（先进先出）行为。元素在双端队列的末尾添加并从头开始删除。从Queue接口继承的Deque方法与下表中指示的方法完全等效 ：

#### Queue与Deque方法比较

| Queue方法 |   Deque方法   |
| :-------: | :-----------: |
|  add(e)   |  addLast(e)   |
| offer(e)  | offerLast(e)  |
| remove()  | removeFirst() |
|  poll()   |  pollFirst()  |
| element() |  getFirst()   |
|  peek()   |  peekFirst()  |

同时Deque也可以当作Stack使用

#### Stack与Deque方法比较

| Stack方法 |   Deque方法   |
| :-------: | :-----------: |
|  push(e)  |  addFirst(e)  |
|   pop()   | removeFirst() |
|  peek()   |  peekFirst()  |

### 11.4.4 ArrayDeque

ArrayDeque是一个可变大小的无界双端队列, 它的底层使用数组实现. 他们不是线程安全的, 禁止使用空元素

### 11.4.5 LinkedList

上面提到了List接口下的[LinkedList](#1125-linkedlist) , 现在我们要重新提起它 , 它同时实现了Deque 接口 , 这意味着它同时也是一个双端队列 , 并且LinkedList允许插入 `null` 值.

## 11.5 Map

Map 是一种键-值对（key-value）集合，Map 集合中的每一个元素都包含一个键对象和一个值对象。其中，键对象不允许重复，而值对象可以重复，并且值对象还可以是 Map 类型的，就像数组中的元素还可以是数组一样。

### 11.5.1 Map特点

1. Map存储的是一对值(键值对)
2. Map的key是唯一的
3. 不同的key可以对应同一个值

### 11.5.2 HashMap

HashMap是使用散列表(哈希表)实现的, 是Map的非同步实现 , 此实现提供所有可选的映射操作 , 并允许使用 `null值` 和 `null键` . 此类不保证映射的顺序 , 特别是它不保证该顺序恒久不变 .

> [warn] _TODO_ 添加链接到数据结构 , hashCode(), equals()

### 11.5.3 LinkedHashMap

LinkedHashMap是HashMap的子类它扩展了HashMap的内部结构Entry , 让Entry包含了一个向前的和一个向后的引用, 这样插入的Entry就可以构成一个链表

### 11.5.4 TreeMap

TreeMap 是一个有序的key-value集合，它是通过红黑树实现的。

TreeMap 继承于AbstractMap，所以它是一个Map，即一个key-value集合。

TreeMap 实现了NavigableMap接口，意味着它支持一系列的导航方法。比如返回有序的key集合。

TreeMap 实现了Cloneable接口，意味着它能被克隆。

TreeMap 实现了java.io. Serializable接口，意味着它支持序列化。

TreeMap基于红黑树（Red-Black tree）实现。该映射根据其键的自然顺序进行排序，或者根据创建映射时提供的 Comparator 进行排序，具体取决于使用的构造方法。

TreeMap的基本操作 containsKey、get、put 和 remove 的时间复杂度是 log(n) 。

另外，TreeMap是非同步的。 它的iterator 方法返回的迭代器是fail-fastl的。

?> _TODO_ 添加链接到数据结构

### 11.5.5 Hashtable

Hashtable类可以看作HashMap类的前身, 它在java1.1时被引入, 而HashMap产生于JDK 1.2

> [info] [HashMap和HashTable的不同](https://www.cnblogs.com/xinzhao/p/5644175.html)

### 11.5.6 Properties

Properties (Java.util. Properties) 是Hashtable类的子类 , 该类并不是集合框架的一员 , 该类主要用于读取Java的配置文件 , 不同的编程语言有自己所支持的配置文件 , 配置文件中很多变量是经常改变的 , 为了方便用户的配置 , 能让用户够脱离程序本身去修改相关的变量设置。就像在Java中 , 其配置文件常为.properties文件，是以键值对的形式进行参数配置的。

## 11.6 集合、泛型、多态与面向接口

### 11.6.1 集合与泛型

之前我们使用集合时一般是这样的

``` java
ArrayList list = new ArrayList();
list.add("hello");
list.add("world");
```

但是这样的使用有什么坏处吗?

让我们考虑一下这样的场景 , 你使用一个ArrayList来存放一个学生列表.

``` java
Student s1 = ...;
Student s2 = ...;

ArrayList students = new ArrayList();

students.add(s1);
students.add(s2);
```

emm 看起来不错~

你决定为学生录入一些成绩.

``` java
Student s1 = ...;
Student s2 = ...;

ArrayList students = new ArrayList();

students.add(s1);
students.add(s2);

Steudnt stu = (Student)students.get(0);
stu.setScore(100);
```

看起来也还不错 . 那么现在让我们往学生列表里面添加一些奇怪的东西 .

``` java
Student s1 = ...;
Student s2 = ...;

ArrayList students = new ArrayList();

students.add(s1);
students.add(s2);
students.add("hello");

Student stu = (Student)students.get(0);
stu.setScore(100);
```

编译并运行 , 你会发现这段代码通过了编译并且可以运行了 , 这显然并不合理 , 我们希望的是学生列表内只能存储学生信息 , 并且它在我们犯错误前可以给我们一些提示 , 如发生异常或给出一些提示 . 并不是无限的包容.

泛型给我们提供了这样的特性 , 我们对上面的代码进行这样的改动

``` java
Student stu1 = new Student();
Student stu2 = new Student();

ArrayList<Student> students = new ArrayList<>();
students.add(stu1);
students.add(stu2);

Student stu = students.get(0);
stu.setScore(100);
```

可以看到在创建ArrayList类型后面加上了一对尖括号 , 其中的Student表示的是ArrayList所接受的类型 .

这样我们就指定了ArrayList可以容纳的类型 , 同时 ArrayList 的get方法的返回值就变成了返回尖括号中指定的类型 , 也就免去了强制类型转换的麻烦 .

这时我们再向学生列表中加入一些其他类型的元素.

``` java
students.add("hello");
```

编译, 这时候编译器报错了

``` java
Error:(47, 22) java: 不兼容的类型: java.lang.String无法转换为cn.ntboy.Student
```

### 11.6.2 泛型集合的好处

1. **类型安全** . 泛型的主要目标是提高 Java 程序的类型安全。通过知道使用泛型定义的变量的类型限制，编译器可以在一个高得多的程度上验证类型假设。没有泛型，这些假设就只存在于程序员的头脑中（或者如果幸运的话，还存在于代码注释中）。

2. **消除强制类型转换**。 泛型的一个附带好处是，消除源代码中的许多强制类型转换。这使得代码更加可读，并且减少了出错机会。

3. **潜在的性能收益**。 泛型为较大的优化带来可能。在泛型的初始实现中，编译器将强制类型转换（没有泛型的话，程序员会指定这些强制类型转换）插入生成的字节码中。但是更多类型信息可用于编译器这一事实，为未来版本的 JVM 的优化带来可能。由于泛型的实现方式，支持泛型（几乎）不需要 JVM 或类文件更改。所有工作都在编译器中完成，编译器生成类似于没有泛型（和强制类型转换）时所写的代码，只是更能确保类型安全而已。

### 11.6.3 使用泛型集合

像上面的ArrayList一样 , Collection接口都有泛型参数 , 我们可以通过泛型参数指定容器内元素的类型

如下:

``` java
ArrayList<Student> students = new ArrayList<>();
HashSet<Integer> odd = new HashSet<>();
HashMap<String,Student> nameMap = new HashMap<>();
```

### 11.6.4 集合与多态

考虑下面场景 , 还是上面的学生列表

``` java
ArrayList<Student> students = new ArrayList<>();
```

有一天你觉得ArrayList不好用决定改成LinkedList

``` java
LinkedList<student> students = new LinkedList<>();
```

这样以来，用到你的list的地方都得更改类型声明。更重要的是，用到你的list的人，他们写自己的代码的时候是基于“你的这个list是一个ArrayList ”这样的前提来写的，你突然把它改成了LinkedList，很可能导致他们的程序出错或者需要重写。

那么就有了这样一个问题 , 如何修改自己的实现而不影响别人使用呢?

多态性给了我们答案 , 当你声明一个变量的时候，把它的类型声明得越笼统越好，越具体越糟糕。笼统对修改是友好的，具体对修改不友好。

``` java
List<Student> students = new ArrayList<>();
```

或者

``` java
List<Student> students = new LinkedList<>();
```

### 11.6.5 面向接口

> [info] [详见](https://www.cnblogs.com/iceb/p/7093884.html)

## 11.7 Collections和Arrays工具类

### 11.7.1 Collections工具类

集合框架中的工具类：特点：该工具类中的方法都是静态的。

### 11.7.2 Arrays工具类

用于对数组操作的工具类

## 11.8 遍历容器

### 11.8.1 List的遍历

* List 接口中有按照索引取元素的方法

``` java
List<E> list = ...;
for(int i = 0; i < list.size(); i++){
    E item = list.get(i);
    //...
}
```

* foreach 是java编译器提供的语法糖 , 它在处理实现了Iterable接口的类上使用Iterator进行迭代 , 对数组则使用简单for循环迭代

``` java
List<String> list = new ArrayList<>();
list.add("hello");
list.add("world");

for(String item:list){
    System.out.println(item);
}
```

* Iterator迭代器

``` java
List<String> list = new ArrayList<>();
list.add("hello");
list.add("world");

Iterator it = list.iterator();
while(it.hasNext()){
    System.out.println(it.next());
}
```

### 11.8.2 Set的遍历

1. foreach
2. Iterator迭代器

这两个遍历方式本质上是一样的foreach语法糖会被编译为迭代器版本

### 11.8.3 Map的遍历

* **keySet**

``` java
Map<String, String> map = new HashMap<>();
map.put("hello", "world");
map.put("goodbye", "world");

Set<String> keySet = map.keySet();
for (String key : keySet) {
    System.out.printf("key=%s,value=%s%n", key, map.get(key));
}
```

* **entrySet**

``` java
Map<String, String> map = new HashMap<>();
map.put("hello", "world");
map.put("goodbye", "world");

Set<Map.Entry<String, String>> entrySet = map.entrySet();

for (Map.Entry<String, String> entry : entrySet) {
    System.out.printf("key=%s,value=%s%n",entry.getKey(),entry.getValue());
}
```

## 11.9 java.util.concurrent包

J. U. C并发包，即java.util.concurrent包，是JDK的核心工具包，是JDK1.5之后，由 Doug Lea实现并引入。

整个java.util.concurrent包，按照功能可以大致划分如下：

* juc-locks 锁框架
* juc-atomic 原子类框架
* juc-sync 同步器框架
* juc-collections 集合框架
* juc-executors 执行器框架

其中juc-collections包含了许多在多线程框架下常用的集合类

> [info] **详见**[java多线程进阶](https://segmentfault.com/a/1190000015558984)
>
> **扩展**[跟着动画学多线程](https://sourceforge.net/projects/javaconcurrenta/)

