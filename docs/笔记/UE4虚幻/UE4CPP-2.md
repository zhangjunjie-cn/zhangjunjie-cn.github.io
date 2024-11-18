---

createtime: 2024/1/25
title: UE4蓝图-2
outline: [2,3]
isTop: true
categories:
 - 笔记
tags:
 - UE4虚幻

---
# UE4蓝图
## 7. 类蓝图

Blueprint Class(蓝图类)，一般缩写为 Blueprint(蓝图),是一种允许内容创建者轻松地基于现有游戏性类添加功能的资源。蓝图是在虚幻编辑器中可视化地创建的，不需要书写代码，会被作为类保存在内容包中。实际上，这些类蓝图定义了一种新类别或类型的 Actor，这些Actor 可以作为实例放置到地图中，就和其他类型的 Actor 的行为一样。

演示:新建一个 Cube 蓝图

类蓝图相当于 Unity 中的预制体,但是更为强大,可以实例化同时还可以以组件的方式给蓝图添加组件。

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/be5ed84b-72ee-4394-b8ee-eb2f0d1bfd6f.png" alt="be5ed84b-72ee-4394-b8ee-eb2f0d1bfd6f" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/bf9c0cd0-3d9a-4f2b-9792-abaa32cb308b.png" alt="bf9c0cd0-3d9a-4f2b-9792-abaa32cb308b" style="zoom:100%;">

- 创建一个类蓝图（也可以代码实现），然后可以初始化一个实例对象，到场景中。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/216c8ff0-b0d4-4df2-a4cf-48b98ec6d43b.png" title="" alt="216c8ff0-b0d4-4df2-a4cf-48b98ec6d43b" style="zoom:100%;">

- 如果父类发生了更改，则实例化对象也会发生改变

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/92a8acfa-ec3e-4254-97b9-c82fdd92856c.png" alt="92a8acfa-ec3e-4254-97b9-c82fdd92856c" style="zoom:80%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/9cdced1e-1ee1-47e0-9d21-727ffb954a31.png" title="" alt="9cdced1e-1ee1-47e0-9d21-727ffb954a31" style="zoom:100%;">



## 8.组件

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/dbfba7b3-5a3f-4284-823f-a888bb848f67.png" alt="dbfba7b3-5a3f-4284-823f-a888bb848f67" style="zoom:80%;">

- 之前创建蓝图是在全局中，查找对象，然后建立的。但如果使用类蓝图，放置对象元素，则获取对象方便快捷很多。

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/5a4b4dfc-c8e4-4996-8758-e9ece642a77b.png" alt="5a4b4dfc-c8e4-4996-8758-e9ece642a77b" style="zoom:67%;">

### 作业:

作业:
1.做一个可销毁的 Actor.
2.做一个可隐藏的 Actor.
3.做一个可隐藏的房子,当我接触到房子的时候,房子消失.同时灯亮了.
4.做一个装置,当我在一条路上走着,每往前走一截,后面的路就会消失掉.
5.做一个装置,在一个路上或者平面上有盏灯,当我接触到灯的时候灯熄灭了,然后我脚下的路消失了!

### 题目一:

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/a4bff195-c734-45cf-93e5-5a868cb222e5.png" alt="a4bff195-c734-45cf-93e5-5a868cb222e5" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/787f3e92-f799-47b2-972a-344871664bb5.png" alt="787f3e92-f799-47b2-972a-344871664bb5" style="zoom:100%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/dab0b920-c07a-4833-be93-69c27bb200de.png" alt="dab0b920-c07a-4833-be93-69c27bb200de" style="zoom:80%;">

### 点击F ，控制灯光开关

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/1954be2f-8838-4325-91e5-f227fe0da1d5.png" alt="1954be2f-8838-4325-91e5-f227fe0da1d5" style="zoom:67%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2adc1388-55be-4437-a47d-cb123d2b2049.png" alt="2adc1388-55be-4437-a47d-cb123d2b2049" style="zoom:67%;">

- player index  ，其实就是 玩家0；

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/f02fe3df-823c-4557-ac2a-7d389280e772.png" title="" alt="f02fe3df-823c-4557-ac2a-7d389280e772" style="zoom:100%;">

- 触碰物体消失。
  
  

## 9. 变量的概念

在蓝图中,变量是存放一个值或者世界中的一个0bject和Actor 的一个引用.这些用于界面内部访问,或者通过设置可以在外部进行访问.便于可以在外部修改它的值,我们可以创建任何类型的变量,包括数据类型的变量(整型,布尔型和浮点型)及用于存放 Object,Actor 以及特定类的引用型变量.此外还可以创建对应的数组。

Boolean：代表布尔型变量
Integer：代表整型变量
String：字符串类型
Text：代表显示的文本数据,尤其是在文本需要本地化的地方Name:,用来存储名字的变量,例如类名,名字也是一串文本,只是它可以用来识别游戏中的一些元素。
Vector：代表向量数据,或者代表由3个浮点型数值的元素或者坐标轴构成的数值,如 XYZ 或者 RGB 信息(它是 Structure 类型的变量),Rotator:旋转量数据,这是一组在三维空间中定义了旋转度的数值.(它是 Structure 类型的变量)。

Transform：变换数据,它包括平移(三维位置),旋转和缩放(它是Structure 类型的变量)。

Strutture：结构体是由一系列具有相同类型或者不同类型的数据构成的数据集合,如 Vector 变量存储了 3个同为 float 的数据,而 Transform中存储了 Location,Rotation,scale3 个数据,其中 Location 和 Scale 皆为Vector 类型,Rotation 为Rotator 类型。

Object Types 对象包含了多种多样的可作为对象来调用的蓝图类型,我们在蓝图中创建的任意 Component,当他们需要被调用时,都是作为Object 类型变量存在的.

Enum:是一个被命名的整型常数的集合

### 开枪变颜色

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/0eddbb3f-79f0-4a55-ba81-7a0bbfbb469a.png" alt="0eddbb3f-79f0-4a55-ba81-7a0bbfbb469a" style="zoom:100%;">

- 因为所有对象都继承于actor，所以子弹也是，但我们需要把他转换成一个子类，一个为FirstPersonProjectile的一个类。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2024-02-01-17-48-50.gif" title="" alt="2024-02-01-17-48-50" style="zoom:80%;">

- 如果子弹碰到我就 set red。

在 Event Hit 节点上,Other 引脚代表命中的其他 Actor。使用 Cast To节点可进行检查，确定 LargeCube Blueprint 是否即为命中的其他Actor。如是，即可对其进行访问，并在蓝图中执行事件或函数、变更其中的变量值、或变更蓝图中的组件属性Cast是 C++中父类转换为子类的一种语法格式。



### 给物体添加移动

1.默认情况下，放置在世界中的基本参与者被设置为静态。“静态”意味着对象不能移动或被操作。游戏。静态对象的渲染明显减少了资源消耗，这应该是我们对非交互对象的默认选择，这样我们就可以最大化帧速率。

2.Normalizing是向量数学中一个常见的过程，它确保向量被转换成个单位的长度，这将使它与我们其余的计算兼容。搜紧字段中键入normalize，并选择类别标记为Vector下面的 normalize 节点。这将把您的方向变量连接到一个节点，该节点将自动为我们进行标准化计算。

3.为了使速度值与方向相关，我们首先需要乘以时间。增量时间是基FlipFlop 节点取入执行输出并在两个执行输出间切换。其第一次被调用时，将会输出 A。 第二次被调用时，将会输出 B，然后再是A,然后又是 B，循环往复。该节点同时有布尔变量输出，使您可以追溯输出 A何时被调用。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2024-02-01-18-55-38.gif" title="" alt="2024-02-01-18-55-38" style="zoom:80%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/9179fcf2-b7b0-4b52-87a1-1aa48d6fb905.png" title="" alt="9179fcf2-b7b0-4b52-87a1-1aa48d6fb905" style="zoom:80%;">





### Deltaseconds的作用

FPS=Frames Per Seconds 帧速率
24 帧为图片变为视频。
60FPS=1秒 60 帧。
Tick 的作用是每帧调用.

Get World Delta Seconds 返回值为 Delta Time;

DeltaTime:两帧之间的间隔

50FPS 下 DeltaTime=1/50=0.02 秒;
10FPS 下 DeltaTime=1/10=0.1 秒;
100FPs 下 DeltaTime=1/100=0.01 秒;



假设没有用 DeltaTime移动
Actor1:10FPS 1秒移动 10*1单位
Actor2:100FPS 1秒移动 100*1单位



使用 DeltaTime 移动
Actor1:10*1*0.1=1;1 秒内移动了1个单位
Actor2:100*1*0.01=1;1秒内移动了1个单位,

```cmd
t.maxFPS 120/60/24
```

> 控制fps的帧率



### 作业：

第一道题：当我击中物体的时候，物体第一次变红第二次变蓝。循环往复。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/bb92f8ab-b3b0-4b20-ba06-2a9c978199d2.png" title="" alt="bb92f8ab-b3b0-4b20-ba06-2a9c978199d2" style="zoom:80%;">

第二题：当我击中物体的时候，物体消失掉了但是一盏灯突然亮了。（涉及到两个类之间的交互，可以写在本类，也可以写在全局蓝图，关卡蓝图里）

**此为全局下操作** ：当全局指定的一个cube 销毁的手。

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/1e7968a1-a275-40fc-9dfc-1c924bfbd34e.png" alt="1e7968a1-a275-40fc-9dfc-1c924bfbd34e" style="zoom:100%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/d6e7991d-34cd-4b57-bc70-77e60b73ca8d.png" title="" alt="d6e7991d-34cd-4b57-bc70-77e60b73ca8d" style="zoom:100%;">

> 销毁的时候发出一个通知。

> 注意，在灯的detail 里面要设置 灯初始关闭。



第三题：在场景中设置速度不同移动方向也不同多个物体。形成网状结构，当我人物碰到这些物体的时候，人物死掉了

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/61ec7b53-2d46-4ba5-9970-7b74acea60c3.png" title="" alt="61ec7b53-2d46-4ba5-9970-7b74acea60c3" style="zoom:100%;">

> 然后把类蓝图，多拖出来几个，子类。然后点 e 调整方向即可。

第四题：当我击中物体的时候，物体会出现在另一个固定位置

第五题：当我击中物体的时候，物体会出现在固定的两个位置，假设第一次在 A 点出现第二次会在 B 点出现。第三次在又在 A 点出现。



### 开镜射击

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/949bd2f0-5609-490a-8a41-b936e559aebd.png" title="" alt="949bd2f0-5609-490a-8a41-b936e559aebd" style="zoom:80%;">

> 设置键盘键，操作映射是按键一下一下的操作，轴映射是可以长按的。

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/d0e02754-ae94-4407-8456-ed1219c206b0.png" alt="d0e02754-ae94-4407-8456-ed1219c206b0" style="zoom:100%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/9a7eda7f-308c-46eb-b718-3153193fa117.png" alt="9a7eda7f-308c-46eb-b718-3153193fa117" style="zoom:67%;">

> 按下shit 更改移动速度。注意：是在内容浏览器中找到 FirstPerson 的类蓝图。



### TimeLine节点

时间轴节点(TimelineNodes)是蓝图中的特殊节点，它们允许根据游戏中的事件快速设计和播放基于时间的简单动画。时间轴与简单Matinee 序列有几分类似，因为它们允许对简单值进行动画处理，并允许随着时间的推移触发事件。您可以通过在图表(Graph)选项卡中 或我的蓝图(My Blueprint)选项卡中双击时间轴(Timeline)，在蓝图编辑器中直接编辑这些时间轴。它们经过专门设计，用于处理简单的非电影任务，例如开门、改变光源 或在场景中对 Actor 执行其他以时间为中心的操作。

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2024-02-01-23-13-20.gif" alt="2024-02-01-23-13-20" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2d50d573-cbc3-478c-b3c4-9a75cc11496a.png" alt="2d50d573-cbc3-478c-b3c4-9a75cc11496a" style="zoom:80%;">

### 差值动画

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/324c8175-0772-4395-a69b-2e218bb80374.png" alt="324c8175-0772-4395-a69b-2e218bb80374" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/b51abb4e-e1e6-4c20-8f7a-7a32fc5445c9.png" alt="b51abb4e-e1e6-4c20-8f7a-7a32fc5445c9" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/c21fca76-cef3-4802-a598-45a7a977b33b.png" alt="c21fca76-cef3-4802-a598-45a7a977b33b" style="zoom:80%;">

### 开门

此时您可以看到驱动此行为的蓝图网络，一开始，我们把门的当前位置存储为向量变量，其名称为"DoorInitialLocation"(门体初始位置)。由于和 Matinee 不同，时间轴不会自动做这项工作，我们需要访问该数据，这样我们可以将其添加到动作中来抬起门体。

完成后，我们就可以来设置时间轴。在这种情况下，该时间轴由2个不同的事件所调用，两者都来源于触发空间。在玩家触碰该空间时，我们播放时间轴动画，这样将会升起门体。这是通过从时间轴添加曲线值到初始位置完成的，存储在关卡的起始位置。当玩家退出空间时,我们等待2秒然后反向播放时间轴,这样会把门重新拉下来。

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2024-02-01-23-40-36.gif" alt="2024-02-01-23-40-36" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/b812402f-4b75-487d-ad80-b58bf3a20466.png" alt="b812402f-4b75-487d-ad80-b58bf3a20466" style="zoom:80%;">

### 命中变色

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/31220fa5-ddc0-46f2-ae57-765ebdde0534.png" title="" alt="31220fa5-ddc0-46f2-ae57-765ebdde0534" style="zoom:80%;">
<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2024-02-02-00-34-16.gif" alt="2024-02-02-00-34-16" style="zoom:100%;">
