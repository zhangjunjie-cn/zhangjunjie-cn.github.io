---

createtime: 2024/1/25
title: UE4蓝图-1
outline: [2,3]
isTop: true
categories:
 - 笔记
tags:
 - UE4虚幻
---

# UE4蓝图

## 1. UE4CPP

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/0bf87c45-a90b-4ca7-9efc-8c680cbe3c3a.png" alt="0bf87c45-a90b-4ca7-9efc-8c680cbe3c3a" style="zoom:80%;">

UCLASS 标识一个类，能被虚幻4所识别。



## 2. UE4中Actor、Pawn、Character等各种类的详细了解。

### 1. character

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/cce1b7c7-ed81-4e96-97fd-cb519914add8.png" alt="cce1b7c7-ed81-4e96-97fd-cb519914add8" style="zoom:100%;">

### 2, pawn

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/cce1b7c7-ed81-4e96-97fd-cb519914add8.png" alt="269b81ae-e366-4fa3-8aa0-3d8ca446ab07" style="zoom:100%;">

- Pawn类是一个代表你或者代表电脑的人工智能的游戏对象，它是可以在屏幕上控制的游戏对象。Pawn类是从Actor类中基础的，它可以通过玩家的设备（键盘、鼠标等）控制或者被人工智能脚本控制。如果它是被玩家控制的，我们通常称之为controller（控制器）；如果它是被人工智能脚本控制的，我们通常称之为AI（Artificial Intelligence，人工智能），如果你经常玩游戏，那些NPC（Non-player Characters，非玩家角色）就通常具有AI行为。

### 3, actor

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/6f17142e-2f5b-4458-96e0-0256a1416ba5.png" alt="6f17142e-2f5b-4458-96e0-0256a1416ba5" style="zoom:100%;">

- 一种特殊类型的 Pawn，用于双足类型的角色，并具备一些复杂的功能。

### 4, actor组件

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/f740d9bb-ac4c-4d74-8e03-968dd075fc92.png" alt="f740d9bb-ac4c-4d74-8e03-968dd075fc92" style="zoom:100%;">

### 5, sceneComponent

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/ed191c69-ce77-4a6e-a999-52102164e6d8.png" alt="ed191c69-ce77-4a6e-a999-52102164e6d8" style="zoom:100%;">

- 在[UE4](https://so.csdn.net/so/search?q=UE4&spm=1001.2101.3001.7020)游戏场景中看到的所有对象皆是`Actor`，而`Actor`复杂的功能是由许多不同的`Component`共同实现的。`UActorComponent`提供最一般的功能，`USceneComponent`提供三维的空间变换以及嵌套功能，`UPrimitiveComponent`提供了可视化的功能。因此可以根据需要继承不同的组件类来实现自定义的组件类。

### 6, playerCameraManager

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/d11b741a-2cbf-448d-b7be-63d0720d8e97.png" style="zoom:100%;">

### 7, playerController

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/0ff335c1-7362-4287-a4e3-1c4a54dabe55.png" title="" alt="0ff335c1-7362-4287-a4e3-1c4a54dabe55" style="zoom:100%;">

- Controller - 依附并控制一个 Pawn。通过将 Pawn 和 Controller 的分离，我们可以编写 AI Controller，用于控制 Pawn，并且和玩家控制 Pawn 采用相同的接口。Player Controller则是一个更为特殊的 Controller，用于从玩家的手柄中获得输入信息，或者鼠标键盘中获得殊瑞星纳西，并将这些信息驱动它所控制的 Pawn 或者 Character 的行为。

### 8, gameModeBase

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/1250edc0-c7bb-4e7d-847e-ec9163e76341.png" title="" alt="1250edc0-c7bb-4e7d-847e-ec9163e76341" style="zoom:100%;">

- 游戏[框架](https://so.csdn.net/so/search?q=%E6%A1%86%E6%9E%B6&spm=1001.2101.3001.7020 "框架")的基础是**GameMode**。GameMode设置了游戏的规则，比如“最先经过终点的玩家获胜”，他也处理players的生成。
         在GameMode之外，还有一个GameInstance，这是一个全局的[单例](https://so.csdn.net/so/search?q=%E5%8D%95%E4%BE%8B&spm=1001.2101.3001.7020)，这个单例会在游戏项目开始运行时创建，知道游戏醒目结束时销毁，会记录游戏中的状态值。

### 9, 场景设置

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/1b183911-70be-4d08-9539-66d73858a738.png" title="" alt="1b183911-70be-4d08-9539-66d73858a738" style="zoom:100%;">

### 10, HUD

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/5dcd2e3b-7da6-4585-b747-7dda53a31640.png" title="" alt="5dcd2e3b-7da6-4585-b747-7dda53a31640" style="zoom:100%;">

- HUD 是指"抬头显视"或二维屏幕显示，在许多游戏中较为常用。例如显示血条、弹药指示器、枪准星等。每个玩家控制器通常都配有其中一种显示。

### 11, playerstate

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/050510c9-6cdb-46ad-b9c7-83aa009eeb80.png" title="" alt="050510c9-6cdb-46ad-b9c7-83aa009eeb80" style="zoom:100%;">

12, gameStateBase

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/62fd978f-bf40-43a3-bf75-946f8b1e0420.png" title="" alt="62fd978f-bf40-43a3-bf75-946f8b1e0420" style="zoom:100%;">

### 12, 蓝图函数库

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/fcd9dc09-95b1-48bc-aa3b-24c2b9962ba7.png" title="" alt="fcd9dc09-95b1-48bc-aa3b-24c2b9962ba7" style="zoom:100%;">

### 13, slate控件

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/f4158dac-6b35-4d4e-9d7e-b4724760edb0.png" title="" alt="f4158dac-6b35-4d4e-9d7e-b4724760edb0" style="zoom:100%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/825fbc16-7661-46a0-b204-c739fa51043f.png" title="" alt="825fbc16-7661-46a0-b204-c739fa51043f" style="zoom:100%;">

### 14, unreal接口

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/7505566c-4e7f-42db-b59a-79b25feda6fe.png" title="" alt="7505566c-4e7f-42db-b59a-79b25feda6fe" style="zoom:100%;">

### 15. 摄像机（Camera）

玩家摄像机管理器是玩家的"眼球"，负责管理它的行为。通常情况下，每个玩家控制器也有一个此类型的摄像机。请参见[摄像机工作流程](https://docs.unrealengine.com/4.27/zh-CN/InteractiveExperiences/Framework/Camera)页面，了解更多信息。



### 16. 设置并追踪游戏的规则

| **游戏模式** | "游戏"的概念分为两类。[Game Mode 和 Game State](https://docs.unrealengine.com/4.27/zh-CN/InteractiveExperiences/Framework/GameMode)是游戏的定义，包括游戏规则和获胜条件等内容。它仅存在于服务器上。它通常不应有太多在游戏过程中会发生变化的数据，也绝对不应有客户端需要了解的临时数据。   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **游戏状态** | [GameState](https://docs.unrealengine.com/4.27/zh-CN/InteractiveExperiences/Framework/GameMode#gamestate)包含游戏的状态，其中可以包括联网玩家列表、得分、棋类游戏中棋子的位置，或者在开放世界场景中完成的任务列表。游戏状态存在于服务器和所有客户端上，可以自由复制以保持所有机器处于最新状态。 |
| **玩家状态** | **玩家状态** 是游戏玩家的状态，例如人类玩家或模拟玩家的机器人。作为游戏的一部分而存在的非玩家AI将不会拥有玩家状态。在玩家状态中适当的示例数据包括玩家姓名或得分、比赛中MOBA等的等级，或玩家当前是否在CTF游戏中携带旗帜。所有玩家的玩家状态存在于所有机器上（与玩家控制器不同），并且可以自由复制以保持同步。                                        |

### 17. 框架类关系

此流程图说明了这些Gameplay类是如何相互关联的。游戏由游戏模式和游戏状态组成。加入游戏的人类玩家与玩家控制器相关联。 这些玩家控制器允许玩家在游戏中拥有Pawn，这样他们就可以在关卡中拥有物理代表。玩家控制器还向玩家提供输入控制、抬头显示（HUD）， 以及用于处理摄像机视图的玩家摄像机管理器。

<img src="https://docs.unrealengine.com/4.27/Images/InteractiveExperiences/Framework/QuickReference/GameFramework.webp" title="" alt="" style="zoom:100%;">

| **控制器（Controller）** | [控制器](https://docs.unrealengine.com/4.27/zh-CN/InteractiveExperiences/Framework/Controller)是负责定向Pawn的Actor。它们通常有两种风格：AI控制器和玩家控制器。一个控制器可以"拥有"一个Pawn来控制它。                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **玩家控制器**           | [PlayerController(玩家控制器)](https://docs.unrealengine.com/4.27/zh-CN/InteractiveExperiences/Framework/Controller/PlayerController)是Pawn和控制Pawn的人类玩家之间的界面。玩家控制器基本上代表人类玩家的意愿。 |
| **AI控制器**           | AI控制器和听起来一样；可以控制Pawn的模拟"意愿"。                                                                                                                                              |



# 3. 编辑器鼠键操作

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/e323d36f-178b-497c-a61f-903ca084bf28.png" alt="e323d36f-178b-497c-a61f-903ca084bf28" style="zoom:80%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/a566472c-cf2a-43d9-986c-7e93242dda30.png" title="" alt="a566472c-cf2a-43d9-986c-7e93242dda30" style="zoom:80%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/02ad4102-915f-46bf-b1f3-574bd0c617ad.png" title="" alt="02ad4102-915f-46bf-b1f3-574bd0c617ad" style="zoom:80%;">



# 4. 快捷键

- shit + f1 显示鼠标

- f8   运行时，显示视角控制界面（运行时控制，如果要修改物体，需要点击物体后右键）

- 模拟运行 —— 仅运行简单的物理效果 —— 物体放置时，可选物理效果 —— 保留模拟变更。
  
  

# 5. 场景操作常用快捷键

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/899754aa-d4de-4fb9-9345-c85658ecfe04.png" title="" alt="899754aa-d4de-4fb9-9345-c85658ecfe04" style="zoom:100%;">

# 6. 蓝图

## Event 节点

事件(Events)是从游戏性代码中调用的节点，在事件图表 (EventGraph) 中开始执行个体网络。它们使蓝图执行一系列操作，对游戏中发生的特定事件(如游戏开始、关卡重置、受到伤害等)进行回应。这些事件可在蓝图中访问，以便实现新功能，或覆盖/扩充默认功能。任意数量的Events 均可在单一 EventGraph 中使用，但每种类型只能使用一个。



## EventBeginplay 节点

游戏开始时将在所有 Actor上触发此事件。游戏开始后生成的所有Actor 上均会立即调用此事件。数据引脚:数据引脚被用来输入数据到节点或从节点流出数据.数据引脚为特定类型,可以与相同类型的变量相连接(这些变量也有其相应的数据引脚),或与另一节点的行同类型数据引脚相连。

蓝色的线为数据连线,他们把一个数据引脚链接到同种类的另一个数据引脚上,代表着数据流向.数据连线显示为带颜色的箭头用于可视化的表示数据的转移,箭头的方向代表着数据移动的方向。

GetPointLightcomponent节点的作用是获取Pointlightcomponent的数据同时通过自己调用 ToggleVisibility,节点,从而设置 Pointlight 组件中的 ToggleVisibility,属性来切换可视性.GetPointLightcomponent 这个节点有两个引脚分别位于左右两侧,两个引脚分为用来输入变量和输出返回值.左侧为 Target 引脚,是用来接收 Pointuight 类型变量的输入方.



<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/fadd9d6a-7057-4dae-b487-a05cce7ef3f0.png" alt="fadd9d6a-7057-4dae-b487-a05cce7ef3f0" style="zoom:80%;">

- 数据流向，可以理解为 point light 变量传进 下一个函数方法里面，返回Point Light Component数据，然后又传进toggle visibilisty。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/b58d4abd-4c2c-4cca-b0f6-a136e148a5cf.png" title="" alt="b58d4abd-4c2c-4cca-b0f6-a136e148a5cf" style="zoom:100%;">



## OnActorBeginOverlap 和OnActorEndOverlap

OnActorBeginOverlap：是在两个Actor 的碰撞开始重叠,或两者移动到一起,或其中一个创建时与另一个重叠的情况下会被调用执行的一个碰撞时间类型节点,此外执行的前提是:Actor之间的碰撞响应必须允许冲抵以及执行事件的的两个Actor的generateOverlapEvents生成重叠事件均设为 Ture   (如果想让一个对象生成重叠事件则该标志必须设置为真). 



OnActorBeginOverlap：当两个 Actor 碰撞停止重叠，或者他们将分离，或者其中一个即将销毁的情况下会被执行。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/f99c4720-b509-4637-899f-7057cbb256ad.png" title="" alt="f99c4720-b509-4637-899f-7057cbb256ad" style="zoom:80%;">



## OnActorBeginOverlap和OnActorEndOverlap

OnActorBeginOverlap,是在两个 Actor 的碰撞开始重叠,或两者移动到一起,或其中一个创建时与另一个重叠的情况下会被调用执行的一个碰撞时间类型节点.此外执行的前提是:Actor 之间的碰撞响应必须允许冲抵以及执行事件的的两个Actor的generateOverlap Events生成重叠事件均设为 Ture(如果想让一个对象生成重叠事件则该标志必须设置为真).

OnActorBeginOverlap：当两个 Actor 碰撞停止重叠,或者他们将分离,或者其中一个即将销毁的情况下会被执行。

Delay 节点:相当于C语言中的 sleep 不过是以秒为单位.等待节点。

- 打印碰撞事件的名字

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/d7e2323e-525c-47aa-a003-986b6441937e.png" title="" alt="d7e2323e-525c-47aa-a003-986b6441937e" style="zoom:100%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/20545de6-cdea-4340-9937-21681921a947.png" title="" alt="20545de6-cdea-4340-9937-21681921a947" style="zoom:80%;">

## 作业：

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/910f467f-d1db-4bb9-a26c-ffd1dcfbabc6.png" title="" alt="910f467f-d1db-4bb9-a26c-ffd1dcfbabc6" style="zoom:80%;">



## 题目4：碰撞到一个物体，之后消失，然后灯亮。

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2024-01-31-22-36-06.gif" alt="2024-01-31-22-36-06" style="zoom:80%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/ce5153cd-d2c8-424e-9d27-603521179635.png" title="" alt="ce5153cd-d2c8-424e-9d27-603521179635" style="zoom:80%;">




