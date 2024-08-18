---
createTime: 2024/5/5
tag: '工作,学习,考公'
---
<br/>
<br/>

# 计算机网络进阶

## 1. 起步

## 2. vlan隔离的原因

![](https://gitee.com/zhangjunjiee/article-images/raw/master/images/PixPin_2024-05-05_17-20-33.png)

在三层交换机创建两个Vlan，可有效降低网络广播的消耗

一种是Access类型，一种是trunk 类型。

access:只有1个vlan通过，接口用access

trunk：有多个vlan要通过，接口用trunk

![](https://gitee.com/zhangjunjiee/article-images/raw/master/images/PixPin_2024-05-05_17-54-56.png)

以上 192.168.1.x 和 192.168.2.x 相互是不能访问的。

网关当我们（192.168.1.x）要访问别的网段（192.168.2.x）的时候，要把数据包先交给网关，这里我们用三层交换机充当网关

隔离的是什么，可能引起故障的包连通的是什么，连通的是正常的通信

```ts:no-line-numbers
#创建vlan10
vlan 10  

#配置（并进入）接口
int g0/0/1

#接口配置
port link-type access
port default vlan10

#对交换机配置网关
ip add 192.168.1.254 255.255.255.0 
int vlan20
ip add 192.168.2.254 255.255.255.0
```
> 原本一般是路由器作为连接两个子网、两个vlan的桥梁，但交换机配置可以平替

## 3. DHCP

&emsp;&emsp;DHCP是什么意思? 在路由器设置中都会看到有一项“DHCP服务器”的功能，而很多朋友对这个功能不太了解，也不知道怎么设置。其实，对于普通用户来说无需去单独设置路由器DHCP服务器功能，默认就好。

##### DHCP是什么意思?

&emsp;&emsp;DHCP全称为Dynamic Host Configuration Protocol，中文含义为“动态主机配置协议”，通常被应用在大型的局域网络环境中，主要作用是集中管理、分配IP地址，使网络环境中的主机动态获得IP地址、Gateway地址、DNS服务器地址等信息，并能够提升地址的使用率。

&emsp;&emsp;DHCP协议采用客户端/服务器模型，主机地址的动态分配任务由网络主机驱动。当DHCP服务器接收到来自网络主机申请地址的信息时，才会向网络主机发送相关的地址配置等信息，以实现网络主机地址信息的动态配置。

##### DHCP有三种机制分配IP地址：

&emsp;&emsp;1) 自动分配方式(Automatic Allocation)，DHCP服务器为主机指定一个永久性的IP地址，一旦DHCP客户端第一次成功从DHCP服务器端租用到IP地址后就可以永久性的使用该地址。

&emsp;&emsp;2) 动态分配方式(Dynamic Allocation)，DHCP服务器给主机指定一个具有时间限制的IP地址，时间到期或主机明确表示放弃该地址时该地址可以被其他主机使用。

&emsp;&emsp;3) 手工分配方式(Manual Allocation)，客户端的IP地址是由网络管理员指定的，DHCP服务器只是将指定的IP地址告诉客户端主机。

三种地址分配方式中，只有动态分配可以重复使用客户端不再需要地址。

&emsp;&emsp;电脑IP地址默认是自动获取的，也正式为了配合DHCP

&emsp;&emsp;对于普通用户来说，只要知道，DHCP是一种动态主机配置协议，在路由器中开启此功能，连接路由器的电脑/平板/手机等上网设备就可以自动获取到路由器分配的一个本地IP地址。在路由器设置中，默认是DHCP服务器功能是开启的，这意味着我们电脑无需手动设置IP，即可自动获取局域网IP地址，从而方便管理与联网。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405062248210.png"/>

:::danger  
注意，如果你电脑只开了DHCP，但没有DHCP服务器（路由器）的话，电脑的IP会显示0.0.0.0
:::




<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405052114102.png"/>


- 路由器接口图

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405052116078.png"/>


```md:no-line-numbers
#路由器开启DHCP
dhcp enable

#进入接口
interface g0/0/0
#dhcp select interface
```

&emsp;&emsp;配置完成后，即可让PC电脑分配到路由器子网长度的IP地址。

> DHCP 的动态分配IP 和docker网络自动分配IP类似，先启动，先获取IP，不唯一。

## 4.DHCP服务器

&emsp;&emsp;首先，我们对PC开启了DHCP功能，它们会根据DHCP服务器的IP地址来分配自己的IP地址。此时，我们加了一个server，作为内网服务器，同时配置了域名，但是PC无法获取到它的域名地址，无法解析server服务器本地的映射，所以，需要配置一台DHCP服务器用来解析。



<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405052312793.png"/>

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405052310994.png"/>

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405052309826.png"/>

- 重新获取到了DNS 地址

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405052311839.png"/>

```ts:no-line-numbers
#路由器作为dns解析的功能开启
int g0/0/0
dhcp server dns-list 192.168.1.100
```

::: tip
如果公司的内网服务器项目，需要域名访问，可以在路由器里配置dns解析，首先对mac接口的配置<br/> `dhcp server dns-list 192.168.1.100`
:::

##### DHCP服务器是什么?

&emsp;&emsp;DHCP服务器是指由服务器控制一段IP地址范围，客户机登录服务器时就可以自动获得服务器分配的IP地址和子网掩码。

&emsp;&emsp;通俗点说，DHCP服务器就是自动给电脑分配IP地址和子网掩码的服务器。比如我们设置了路由器的DHCP服务器，让DHCP服务器自动分配IP地址，从192.168.1.100到192.168.1.199(子网掩码会自动设置，我们无需设置)。

::: tip 开启DHCP功能通常需要一个DHCP服务器来管理IP地址的分配
<br/>
&emsp;&emsp;在网络环境中，DHCP（动态主机配置协议）允许设备自动从DHCP服务器获取IP地址、子网掩码和默认网关等网络配置信息。

以下是关于PC开启DHCP和DHCP服务器的相关信息：

1. **DHCP服务器的作用**：DHCP服务器负责在网络中自动分配IP地址给请求的设备，这样设备就无需手动配置网络参数。
2. **配置路由器作为DHCP服务器**：在家庭或小型办公网络中，通常会把路由器配置为DHCP服务器。通过登录路由器的管理界面，可以启用或关闭DHCP服务器功能，并设置地址池的开始和结束地址。
3. **PC开启DHCP**：当PC设置为DHCP客户端时，它会向网络中的DHCP服务器发送请求，以便自动获取IP地址和其他相关配置。如果没有DHCP服务器，那么PC将无法自动获得这些信息，可能需要手动设置静态IP地址。
4. **前提条件**：为了使DHCP正常工作，网络中必须至少有一台计算机或设备充当DHCP服务器。这台服务器需要安装TCP/IP协议，并为其设置静态IP地址、子网掩码、默认网关等内容。
5. **自动与手动分配**：DHCP服务器可以配置为自动分配或手动分配IP地址。自动分配模式下，客户端每次成功获取IP地址后，都会永久使用这个地址；而手动分配则需要管理员为每个客户端手动设置固定的IP地址。
6. **报文类型**：DHCP协议中包含多种报文类型，如DHCP DISCOVER是客户端开始DHCP过程发送的报文，用于发现可用的DHCP服务器。

综上所述，如果希望在PC上开启DHCP功能，确保网络中存在一个可用的DHCP服务器是非常重要的，否则PC将无法自动获取到必要的网络配置信息。在大多数家庭和小型企业网络中，路由器通常会充当DHCP服务器的角色。
:::


## 5.网关

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405062312252.png"/>

&emsp;&emsp;如果我们两个不同的网络，需要相互访问，这个时候就需要用到网关。

网关：用来连接不同的网段。
交换机：用于局域网内交换数据。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405062316737.png"/>

网关就在一个路由器的接口地址。其实PC的网关就是这边局域网边界的接口地址（路由器划分网段），也可以称之为吓一跳地址。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405062319114.png"/>

&emsp;&emsp;就一般来说，下一跳地址（网关），一般是接近广播地址的最大地址。所以显示生活中，一般都是`.254`，`.255`是广播地址了。

&emsp;&emsp;发送包的时候，如果发现不是同一个网络，它就会把数据包交给这个网关地址，然后路由器再转发给另一个网络。这个基于路由表，在计算机网络基础里面有简述。

:::warning


:::


## 6.DNS

&emsp;&emsp;DNS可以配错，但可能访问很慢。还有像QQ等应用程序，就可能是通过IP去访问的，与DNS无关，不需要。但打开一个网址，就必须去做域名解析。


### CDN

通过智能NDS来分担访问服务器的压力。cdn：不同的人，访问www.taobao.com,返回不同的ip地址，之所以是相同的界面，是做了集群处理。

## 7.网络安全

### Vlan 和 cal

```ts:no-line-numbers
#开启路由的access模式
int g0/0/1
port link-type access

#access:用来连接终端
#trunk:用来连接其他的交换机

#划分当前路由接口的虚拟网段
port default vlan 10


```
那我们如何知道终端传过来的数据包，是vlan10还是vlan 20的呢？当我们连接模式为trunk的时候，就会让数据包携带一个标单，显示vlan的信息。原因是为了让其他交换机能识别这个数据包属于哪个网络，这也就是trunk模式的特点和区别。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405072328308.png"/>


```ts:no-line-numbers

int g0/0/1
port link-type trunk

#这个路由器的接口，要允许哪些vlan通过（这里是让所有的vlan通过）
port trunk allow-pass vlan all
```

### Vlan 隔离技术

先用 vlan 把用户隔离开，再用某种技术，把隔离开的用户连起来。

隔离：隔离的是故障（比如感染网络病毒）
连通：是正常通信（比如邮件）
隔离故障的程序，连接正常的程序。

典型的做法就是，用三层交换技术。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405072342662.png"/>

三层交换机的两个接口配置 vlan 10 和 vlan 20 ，设置IP地址为 1.254 和 2.54（这里和路由器的类似，类似于网关作为下一跳），二层交换机就相当于集线器了。

步骤：1. 配置PC1和PC2
     2. 在二层交换机配置access，配置vlan 10和 vlan 20，在int g/0/3配置为 trunk
     3. 在三层交换机 int g0/0/1 设为 trunk

    ```ts:no-line-numbers
    int g0/0/1
    port link-type trunk

    port trunk allow-pass vlan all

    interface vlanif 10  #就是底下PC1的网关的IP

    ip address 1.1.1.254 255.255.255.0

    interface vlanif 20 

    ip address 2.2.2.254 255.255.255.0
    ```

这样配置，就可以做到，正常消息通畅，坏的消息隔离。PC1 ping PC2 可以ping通。

## 8. 单臂路由
就是
```md:no-line-numbers

#设置一个接口的子接口
int g0/0/0.10

#关联vlan 10
dot1q termination vid 10

#允许ARP的广播
...
```

## 9. ACL

通过设置访问控制列表，然后deny 拒绝源地址为某某的数据包，然后其他的报文放行。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405082303067.png"/>

```ts:no-line-numbers
需要让vlan 20 能访问 vlan 30 但vlan 10不能访问 vlan 30，
```


1. 步骤一：创建一个访问控制规则
2. 步骤二：调用这个规则

对LSW1
```ts:no-line-numbers
#起个别名
cal name test

#设置规则(子网反着写)
rule deny ip source 192.168.10.0  0.0.0.255 destination  192.168.30.0  0.0.0.255

#开放其他连接
rule permit ip source any destination any

#查看规则
dis this

#调用规则
int g0/0/1

#报文过滤
traffic-filter inbound acl name test

```


--- 
<br/>
<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405051433983.jpg" />
    </div>
  </a>
</div>




