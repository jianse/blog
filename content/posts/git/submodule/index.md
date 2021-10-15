---
title: "Submodule的使用"
date: 2021-09-28T14:29:21+08:00
draft: false
toc: true
categories: "git"
---

# submodule的使用

## 为什么要用submodule

当一个项目要包含另一个项目时，也许是第三方库，或者独立开发的子项目，想要做独立的项目又要包含在其他项目中时。就可以使用submodule。

## 为项目添加子模块

由一个例子开始，使用hugo搭建一个博客

前面安装hugo，等步骤省略详情请看[hugo-quickstart](https://gohugo.io/getting-started/quick-start/)

下面直接从新建站点开始

```bash
$ hugo new site quickstart
Congratulations! Your new Hugo site is created in G:\quickstart.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>\<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```

使用git将刚创建的站点管理起来。

```bash
$ cd quickstart
$ git init
Initialized empty Git repository in G:/quickstart/.git/
```

将初始的文件进行提交

```bash
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        archetypes/
        config.toml

nothing added to commit but untracked files present (use "git add" to track)

$ git add *
warning: LF will be replaced by CRLF in archetypes/default.md.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in config.toml.
The file will have its original line endings in your working directory
$ git commit -m "init"
[master (root-commit) 56a4caf] init
 2 files changed, 9 insertions(+)
 create mode 100644 archetypes/default.md
 create mode 100644 config.toml
```

> [info]
> 上面`git add` 中的警告消息是对我们文件中的行分隔符进行了替换，并不影响实际结果，也可以在配置中进行设置。

hugo要求我们添加一个主题`theme`才能生成静态站点文件，这时就可以使用`submodule`进行添加

```bash
$ git submodule add https://github.com/jianse/blog-theme.git themes/diary
Cloning into 'G:/quickstart/themes/diary'...
remote: Enumerating objects: 1434, done.
remote: Counting objects: 100% (1434/1434), done.
remote: Compressing objects: 100% (497/497), done.
remote: Total 1434 (delta 768), reused 1410 (delta 744), pack-reused 0Receiving objects:  96% (1377/1434), 5.06 MiB | 509.00 KiB/s
Receiving objects: 100% (1434/1434), 5.09 MiB | 505.00 KiB/s, done.
Resolving deltas: 100% (768/768), done.
warning: LF will be replaced by CRLF in .gitmodules.
The file will have its original line endings in your working directory
```

> [info]
> 默认情况下，子模块会将子项目放到与仓库名相同的目录下，本例中`git submodule add` 的最后一个参数`themes/diary`指定了将子模块放置在该相对路径下。

这时运行`git status` 你会注意到

```bash
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitmodules
        new file:   themes/diary

```

首先时`.gitmodules`文件，该文件保存了项目url与已经拉取的本地目录之间的映射，如果有多个子模块该文件中会有多条记录。

```text
[submodule "themes/diary"]
    path = themes/diary
    url = https://github.com/jianse/blog-theme.git

```

另一个是`themes/diary`这个文件，你可能会有疑问说这并不是一个文件而是一个文件夹，实际中`git`将这个路径当作一个特殊的文件其中记录了子模块的一个具体提交

```bash
$ git diff --cached themes/diary
diff --git a/themes/diary b/themes/diary
new file mode 160000
index 0000000..134c8fa
--- /dev/null
+++ b/themes/diary
@@ -0,0 +1 @@
+Subproject commit 134c8fae904ca9a49099ea32ffa4600e76dca4f9
```

提交我们的更改

```bash
$ git commit -am 'add themes/diary module'
[master 488947b] add themes/diary module
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 themes/diary
```

注意 DbConnector 记录的 160000 模式。 这是 Git 中的一种特殊模式，它本质上意味着你是将一次提交记作 一项目录记录的，而非将它记录成一个子目录或者一个文件。

最后，推送这些更改：

```bash
git push origin master
```

## 克隆含有子模块的项目

以上面提交的代码为例

### 分步拉取子模块

```bash
$ git clone https://github.com/jianse/hugo-quickstart.git
Cloning into 'hugo-quickstart'...
remote: Enumerating objects: 9, done.
remote: Counting objects: 100% (9/9), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 9 (delta 0), reused 9 (delta 0), pack-reused 0
Receiving objects: 100% (9/9), done.
```

其中有`themes/diary`目录，不过是空的。这时你可以使用`git submodule init`来初始化本地配置，`git submodule update`从子项目抓取数据并检出父项目需要的提交。

```bash
$ git submodule init
Submodule 'themes/diary' (https://github.com/jianse/blog-theme.git) registered for path 'themes/diary'
$ git submodule update
Cloning into 'G:/hugo-quickstart/themes/diary'...
Submodule path 'themes/diary': checked out '134c8fae904ca9a49099ea32ffa4600e76dca4f9'
```

> [info]
> 可以运行 `git submodule update --init` 将 `git submodule init` 和 `git submodule update` 合并成一步。如果还要初始化、抓取并检出 任何嵌套的子模块， 请使用简明的 `git submodule update --init` --recursive。

现在我们就把父项目和它的子模块都拉取到本地了。

### 同时拉取项目与子模块

在`git clone`的同时可以传递`--recurse-submodules`选项，它就会自动初始 化并更新仓库中的每一个子模块， 包括可能存在的嵌套子模块。

