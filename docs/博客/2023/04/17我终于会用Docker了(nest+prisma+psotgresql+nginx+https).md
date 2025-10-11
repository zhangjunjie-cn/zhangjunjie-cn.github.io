# 我终于会用Docker了(nest+prisma+psotgresql+nginx+https)

## 前言

这次自己有一个NestJS后端服务需要自己部署了，之前部署node服务可能更多是pm2那一套，自己的项目可以尝试各种各样的技术，所以这次就尝试一下早就想用的docker来实际部署一下

本文会讲什么：对于docker的理解，docker必知必会的命令，以及最后是笔者的实战部署，和一些踩坑记录；
本文不会讲什么：docker更深层次的原理，即本文更多是一篇应用性文章，欢迎继续阅读后续章节；

## 基本概念介绍

### 简介

如果是计算机专业的学生，那么是肯定学过操作系统的，而学这门课程有一门操作系统实验，需要自己在linux上通过模拟器再运行一个非常低版本的linux，笔者隐约记得好像是0.11那个版本，因为这个版本代码相对来说都是比较核心主要的功能，用来学习是非常不错的。

在操作系统运行一个可以运行其他环境的"系统环境"，这不就是Docker的概念吗。或者如果你没有上述的经历，那总在本机运行过VM吧，甚至说win11中的wsl总知道吧。

**基本概念就是这个：在linux系统上运行一个"系统环境"，官方叫做容器。**

那这个所谓的"系统环境"可以做什么呢，当然是运行一些我们常用的东西，如node、mysql、redis以及我们自己的应用程序等。

![](https://oss.justin3go.com/blogs/Pasted%20image%2020230417094610.png)
[图片来源](https://www.docker.com/resources/what-container/)

### 优点

好，问题又来了，为什么不直接在该linux系统上运行这些环境：这个问题用Docker的主要优势就能回答：

**1）简化应用程序部署和依赖管理**

Docker是将应用程序和其依赖项打包在一个容器中，避免了复杂的依赖管理和手动安装，因此可以快速部署和更新应用程序。

怎么理解：

- python打包exe用过吧：它会将其依赖的所有环境一起打包最后成为一个可执行文件，形成了这样一个可执行文件，是不是用户只需要双击就能打开，不需要像程序员一样安装各种复杂的依赖
- 前端的electron用过吧：它也将应用程序与浏览器环境打包在一起了，用户也可以直接使用你的应用程序了
- 这么理解：有了它，我们就可以直接把这个"软件包"进行部署，而没有它，我们就需要到用户的主机，去干什么`pip install`之类的，真累~

**2）跨平台和环境可移植性**

Docker容器可以在任何操作系统、云平台和虚拟化环境中运行，保证了应用程序在不同环境下的稳定性和可靠性。

也是第一点所讲到的，既然都打包成了一个软件包，那么就可以非常方便地运行在各个环境之中了：

- 想想Java虚拟机JVM，Java刚出的时候主打的就是一个可移植性，其就是通过先编译成字节码，也就是那个`.class`文件，然后该文件就可以在任何安装了JVM的系统上运行了。
- Docker也是，只要该环境安装了Docker，那么由其打包的"软件包"也就能直接运行了

### 一些关键词及概念

想入门某个领域，第一步就是得先了解该领域特有的关键热词，下面是Docker中常用的一些关键词及概念简介：

1.  **Docker镜像(Image)**: Docker镜像是一个轻量级的、可移植的、自包含的软件包，其中包含了运行某个应用程序所需的所有文件、配置和依赖项。
2. **Docker容器(Container)**: Docker容器是由Docker镜像创建的运行实例，容器中包含了所有运行应用程序所需的文件、配置和依赖项，以及运行时环境。

> 镜像与容器的概念就和程序与进程的概念是一致的，一个是乐谱，另外一个就是正在演奏的音乐了

4. **Docker仓库(Registry)**: Docker仓库是一个用于存储和共享Docker镜像的中央存储库，Docker Hub是一个公共的Docker仓库。
5. **Dockerfile**: Dockerfile是一个文本文件，其中包含了一组指令，用于自动化构建Docker镜像。就和C语言中的Makefile差不多。
6. **Docker Compose**: Docker Compose是一个工具，用于定义和运行多个Docker容器组成的应用程序，并管理它们之间的交互。
7. **Docker网络(Network)**: Docker网络是一种机制，用于在多个Docker容器之间建立网络连接，以实现容器之间的通信。
8. **Docker数据卷(Volume)**: Docker数据卷是一种机制，用于在Docker容器和主机之间共享数据。
9. **Docker daemon**：是Docker的核心组件之一，也称为Docker引擎。它是一个长期运行的后台进程，负责管理Docker镜像、容器、网络和存储卷等资源。

![](https://oss.justin3go.com/blogs/Pasted%20image%2020230417094716.png)
[图片来源](https://algodaily.com/lessons/what-is-a-container-a-docker-tutorial)

*相关概念如果不理解也没关系，后续实战时看看这些东西到底长啥样，就自然而然就明白了*

## 常用命令

这里简单索引并介绍一下笔者自己常用的一些关于docker及docker-compose相关的命令，希望对你所有帮助：

|命令|作用|备注|
|-|-|-|
|`docker ps -n 5`|查看正在运行的前5个容器|数字代表前几个，也可以不加-n，就是所有；就和`ps -ef`查看正在运行的进程一样|
|`docker rm $(docker ps -a -q)`|删除所有已经停止的容器|无|
|`docker tag [镜像id] [新镜像名称]:[新镜像标签]`|根据id为某个镜像添加名称及标签|偶尔镜像名字显示`<none>`时极其有用|
|略|容器/镜像的导入与导出|[参考链接](https://zhuanlan.zhihu.com/p/619626619)|
| `docker-compose up -d`| 启动并后台运行|无|
|`docker exec -i -t containerId /bin/bash`|进入到容器内部，并启动一个bash shell，开始交互式操作|CTRL+D退出|

Docker与Docker-compose：构建镜像

|命令|作用|备注|
|-|-|-|
|`docker build -t nest-api .`|在当前目录`.`构建镜像，默认使用Dockerfile文件|-f 指定任一Dockerfile文件；-t代表镜像名|
|`docker-compose build`|在当前目录，通过默认的docker-compose.yml文件进行构建|略|

一般一个Dockerfile对应一个容器，如果我们要部署多个容器，就需要每次运行各个不同的Dockerfile，为了简化docker的复杂操作，就有了dcoekr-compose，它就可以在其yml文件上写多个镜像进行部署容器

还有就是这里有一个shell脚本，后续会使用该`setup.sh`，作用就是每次更新部署时在对应目录运行就可以了：

```shell
#!/usr/bin/env bash
#image_version=`date +%Y%m%d%H%M`;

# 关闭容器
docker-compose stop || true;
# 删除容器
docker-compose down || true;
# 构建镜像
docker-compose build;
# 启动并后台运行
docker-compose up -d;
# 查看日志
docker logs nodejs;
# 对空间进行自动清理
docker system prune -a -f
```

## 实战

现在，你已经了解了Docker的相关概念以及Docker的一些常用操作了，下面就进入实战让你练练手并加深理解。

我的项目文件目录如下：

```txt
nest-api
├─ .dockerignore
├─ .eslintrc.js
├─ .github
│  └─ workflows
│     └─ ci.yml
├─ .gitignore
├─ .graphqlconfig
├─ .node-version
├─ .prettierrc.json
├─ .vscode
│  └─ extensions.json
├─ docker-compose.db.yml
├─ docker-compose.migrate.yml
├─ docker-compose.yml
├─ Dockerfile
├─ Dockerfile.alpine
├─ LICENSE
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ pull-env.sh
├─ .env
├─ README.md
├─ run.sh
├─ setup.sh
├─ src[略]
略...
```

### prisma+nest应用的Dockerfile

编写自己的NestJS应用需要的Dockerfile：

```txt
FROM node:16-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
```

这些英文单词都是一看就差不多懂得命令这里就不过多赘述了，其中`FROM node:16-alpine`代表该镜像继承自node镜像，毕竟是个node应用嘛；`apline`版本更加轻量，打包体积更小，一般来说不去编写哪些C++扩展都是够用的。

![](https://oss.justin3go.com/blogs/Pasted%20image%2020230417111640.png)

[图片来源](https://juejin.cn/post/6844904006184091662#heading-6)

### nest应用+postgresql+niginx的yml配置

此时相当于我们就有我们自己应用的镜像文件了，但其依赖的环境还没有，比如postgresql；还有就是我需要的nginx，这些都是有现成的，所以就不用自己构建了，直接使用；但想要将它们弄在一起，就需要编写`docker-compose.yml`文件，如下：

```yaml
version: '3.8'
services:
  nest-api:
    container_name: nest-api
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    depends_on:
      - postgres
    env_file:
      - .env

  postgres:
    image: postgres:13
    container_name: postgres
    restart: always
    ports:
      - '5432:5432'
    env_file:
      - .env
    volumes:
      - postgres:/var/lib/postgresql/data

  nginx:
    image: nginx:stable-alpine      # 指定服务镜像
    container_name: nginx    # 容器名称
    restart: always                 # 重启方式
    ports:                          # 映射端口
      - "80:80"
      - "443:443"
    volumes:                        # 挂载数据卷
      - /etc/localtime:/etc/localtime
      - /home/ubuntu/work/nginx/conf.d:/etc/nginx/conf.d
      - /home/ubuntu/work/nginx/logs:/var/log/nginx
      - /home/ubuntu/work/nginx/cert:/etc/nginx/cert
    depends_on:                     # 启动顺序
      - nest-api

volumes:
  postgres:
    name: nest-db

```

其中`volumes`的意思就是让容器中的某个文件与操作系统中的某个文件进行对应，从而做到持久化存储。

### 配置niginx

上述中的：

```yaml
      - /home/ubuntu/work/nginx/conf.d:/etc/nginx/conf.d
      - /home/ubuntu/work/nginx/logs:/var/log/nginx
      - /home/ubuntu/work/nginx/cert:/etc/nginx/cert
```

冒号前面的路径是我自己在操作系统环境中创建的路径，你也可以根据自己的习惯进行创建，然后对应到容器的路径就可以了

**1）conf.d配置**

```sh
vim /home/ubuntu/work/nginx/conf.d/default.conf
```

该文件内容如下：

```txt
server {
  listen 443 ssl http2;
  server_tokens off;

  root /var/www/html;
  index index.html index.htm;

  # 修改为自己的域名
  server_name api.example.com;

  client_max_body_size 4M;
  # ssl证书存放位置
  ssl_certificate /etc/nginx/cert/api.example.com.pem;
  ssl_certificate_key /etc/nginx/cert/api.example.com.key;
  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;

  # 访问 / 路径时执行反向代理
  location / {
    # 这里 nodejs 是 node 容器名
    proxy_pass http://nest-api:3000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    # 后端的Web服务器可以通过 X-Forwarded-For 获取用户真实 IP
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # 允许客户端请求的最大单文件字节数
    client_max_body_size 15M;
    # 缓冲区代理缓冲用户端请求的最大字节数
    client_body_buffer_size 128k;
  }
}
server {
   listen 80;
   #请填写绑定证书的域名
   server_name api.example.com; 
   #把http的域名请求转成https
   return 301 https://$host$request_uri; 
}
```

2）cert文件夹

记得放入你下载的ssl证书就可以了。

3）logs

对应的日志，有问题就就`cat`一下，看里面有error不

### prisma的一个踩坑

这是prisma需要的databaseURL：

```txt
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
```

其中`DB_HOST`在nest运行在本地的时候，比如你启动了postgresql，然后`npm run start:dev`，这时候`DB_HOST=localhost`

而当你nest运行在容器中，比如部署的时候`docker-compose up -d`，就需要改为对应容器的名字`postgres`

我确实忘改了😭😭😭

## 最后

笔者在本文主要叙述了如下部分，也可以当作自检清单：

1. docker是什么
2. docker的优势，为什么要使用它
3. docker相关的关键词及概念
4. 常用命令
5. 最后用了现在比较新的一些技术栈部署实践

本文实战部分没有每步都截图演示，假的理由是因为自己试试比啥都好，真实原因是懒得再去运行截图了...

最后希望本文对你有所帮助，如果本文中理解有误或者操作配置不当，也希望互帮互助，在评论区中友善指出...

## 参考

- [前端全栈之路 - 玩转 Docker (基础)](https://juejin.cn/post/7147483669299462174)
- [如何通过Dockerfile优化Nestjs镜像大小](https://juejin.cn/post/7132533610707419173)
- [使用 Jenkins + Docker + Nginx + MySQL + Redis 自动部署 Node 项目](https://juejin.cn/post/6844904006184091662)
- [给前端写的Docker+Node+Nginx+Mongo的本地开发+部署实战](https://juejin.cn/post/6844904004296638478)
- [使用 GitHub Actions 完成 Nest 项目自动打包并发布到服务器](https://juejin.cn/post/7169485484568084510)
- [Nestjs | 实践：如何编写生产环境下的Dockerfile?](https://juejin.cn/post/7205508171523604540)
- [Nest系列（八）一路坎坷，我实现了最简便的方式打包部署nestjs+prisma应用](https://juejin.cn/post/7175937839069134903)
- [Running docker compose up -d (strconv.Atoi: parsing "": invalid syntax)](https://github.com/docker/compose-cli/issues/1537)
- [Nginx 服务器 SSL 证书安装部署](https://cloud.tencent.com/document/product/400/35244)
- [Docker Nginx 配置安装 SSL 证书（支持 Https 访问）](https://www.quanxiaoha.com/docker/docker-nginx-install-ssl.html)
- [Prisma Migrate: Deploy Migration with Docker](https://notiz.dev/blog/prisma-migrate-deploy-with-docker)

