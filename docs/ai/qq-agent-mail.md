---
title: 腾讯Agent Mail开测！速抢ID
date: 2026-07-07
updated: 2026-07-01
# 供主题的「最后更新于」使用；带时区才能得到与源站一致的 2026/7/1 17:31:13
lastUpdated: 2026-07-01T17:31:13+08:00
description: 腾讯 Agent Mail 的实测接入与使用体验，涵盖申请邮箱、安装 CLI、授权验证、Codex 等 Agent 发邮件流程，以及二次确认和自动化工作流场景。关键词：Agent Mail, AI 邮箱, Codex, Agent 工作流
tags:
  - AI
  - Tencent
icon: aiChat
---

# 腾讯Agent Mail开测！速抢ID

<PostMeta />

腾讯 QQ 邮箱团队最近开始测试一个很有意思的新产品：[**Agent Mail**](https://agent.qq.com/)。

它不是给人用的传统邮箱，而是给 **AI Agent 用的专属邮箱**。简单说，你可以给自己的 Agent 分配一个 `xxx@agent.qq.com` 邮箱地址，让它像一个真正的助理一样收邮件、读邮件、写邮件、发附件，甚至配合定时任务处理工作流。

官方文档里对它的定位很明确：Agent Mail 是 QQ 邮箱团队为 Agent 打造的专属邮箱服务，和个人邮箱隔离，原生适配 Agent，目标是让 Agent 能安全、高效地收发邮件。

## 实际体验

我实际体验下来，最直观的感受是：这不是“给邮箱套一层 AI 总结”，而是把邮箱能力开放给 Agent，让 **Agent 真正拥有一个可操作的通信入口**（高度相似把 Agent 接入微信或者钉钉、飞书等，只不过多了一层邮件的功能）。

![实际体验](/sites/note.weizwz.com-afbb9997/ai-qq-agent-mail-d2812d13/images/20260630_180402_221e6d4e34b36f30.webp)

目前官方文档显示，Agent Mail 已支持 WorkBuddy、QClaw、Marvis、OpenClaw、Claude Code、Kimi Work、豆包超能模式、Codex、Hermes、Cursor 等 Agent。我这次是在 Codex 里接入测试的，完整流程包括安装 CLI、安装 skill、OAuth 授权、验证邮箱地址，以及最后实际发送邮件。

这里我注册的邮箱地址是：

```text
weizwz@agent.qq.com
```

如果你也想要一个好记的 Agent 邮箱 ID，现在应该就是比较适合去抢的时候。官方文档里提到，邮箱地址可以修改，但每个地址仅能修改一次，修改后旧地址会失效。

实际测试，**每个人可以申请两个邮箱，ID 最少 6 位数，且目前没找到修改 ID 的入口**，注销后也不能申请新的邮箱地址，只能恢复之前的地址。所以注册前，请确认好你想要的 ID。

## 接入步骤

官方给出的接入方式很 Agent：你不需要自己记一堆命令，只要把官方提示词发给支持的 Agent，让 Agent 按文档操作即可。

我当时在 Codex 线程里发送的是这句话：

```text
请阅读 https://agent.qq.com/doc/cli-setup.md 文档，按照步骤为我安装并配置 Agent Mail CLI。
```

![接入步骤](/sites/note.weizwz.com-afbb9997/ai-qq-agent-mail-d2812d13/images/20260630_175703_f013c318de74f22b.webp)

从这次实测看，接入速度还是比较慢的（主要卡在沙箱网络限制），完整接入大概分四步。

**第一步，Agent 阅读官方安装文档，并检查本机环境。**

我这边的 Agent 先读取了 `https://agent.qq.com/doc/cli-setup.md`，确认流程是安装 `@tencent-qqmail/agently-cli`，再安装 Agent Mail 对应的 skill，然后进行 OAuth 登录，最后用 `agently-cli +me` 验证。

**第二步，安装 Agent Mail CLI。**

官方 CLI 安装命令是：

```bash
npm install -g @tencent-qqmail/agently-cli
```

我的环境里第一次安装被沙箱网络限制拦了一下，放行后安装成功。安装完成后，CLI 版本显示为 `1.0.6`。

**第三步，安装 Agent Mail skill。**

官方文档里的命令是：

```bash
npx skills add https://agent.qq.com --skill -g -y
```

这一步的作用是让 Agent 知道怎么调用 Agent Mail，比如如何发邮件、读邮件、搜索邮件、下载附件，以及哪些操作必须二次确认。

我的实测里，skill 成功落到了 Codex 可用的位置：

```text
~/.agents/skills/agently-mail
```

**第四步，OAuth 授权。**

Agent 会运行：

```bash
agently-cli auth login
```

然后返回一个授权链接。打开链接后，用微信扫码完成授权。授权成功后，Agent 再运行：

```bash
agently-cli +me
```

我这边最终看到的验证结果是：

```text
邮箱地址 weizwz@agent.qq.com 已授权成功，可以用它来收发邮件了
```

这里有一个小细节：在普通沙箱里读系统钥匙串时，曾出现过 `keychain not initialized`。后来用授权模式重新执行验证命令，就能正常读取凭据。也就是说，如果你在 Agent 环境里遇到类似钥匙串或凭据读取问题，不一定是授权失败，可能只是运行环境权限不够。

## 开始使用

接入完成以后，就不需要记 CLI 命令了。你可以直接用自然语言告诉 Agent 要做什么。

官方文档给的例子包括：

| 场景     | 可以这样说                              |
| -------- | --------------------------------------- |
| 发邮件   | 帮我给 `xxx@mail.com` 发一封邮件，内容是…… |
| 查看收件 | 看看我最近收到了哪些邮件                |
| 检索邮件 | 找一下上周关于项目进度的那封邮件        |
| 删除邮件 | 删除主题为 xxx 的邮件                   |
| 回复邮件 | 回复刚才那封邮件，告诉对方我已收到      |
| 发送附件 | 发邮件给 xxx，并把这份文件作为附件      |
| 下载附件 | 把主题为 xxx 邮件的附件下载到本地       |

我这次测试的是一个比较完整的任务：让 Agent 查西安本周天气，并通过 Agent Mail 发邮件。

我的第一句是：

```text
发一封西安本周天气邮件
```

![开始使用](/sites/note.weizwz.com-afbb9997/ai-qq-agent-mail-d2812d13/images/20260630_180036_2e67004206e015e9.webp)

Agent 先去查询西安未来一周天气。因为天气属于实时信息，它先尝试了内置天气查询，又换到公开天气接口，最后拿到 2026-06-27 到 2026-07-03 的西安天气预报：整体高温，最高约 34-40°C，周日到周三有一定降水或雷阵雨概率，紫外线偏强。

然后 Agent 问我要收件人地址。我回复：

```text
发送给 weizwz.ai@gmail.com，签名是：你的好友 weizwz
```

接下来比较值得夸的一点是，Agent Mail 对写操作有明确的**两阶段确认**。

第一次调用发送命令时，它不会直接把邮件发出去，而是先生成确认摘要。我看到的摘要大概是：

```text
发件人：weizwz@agent.qq.com
收件人：weizwz.ai@gmail.com
主题：西安本周天气预报
附件：无
```

然后 Agent 停下来等我确认。我回复：

```text
发送
```

Agent 才执行第二阶段发送，并返回：

```text
已发送，邮件已进入发送队列。
```

这个流程让我比较放心。因为邮件是对外通信，发错对象、发错内容、误发附件都会很麻烦。Agent Mail 把发送、回复、转发、移到回收站这类写操作都设计成需要确认，避免 Agent 在一次对话里“自问自答”直接执行。

从体验上看，Agent Mail 最适合的不是单纯“帮我发一封邮件”，而是更自动化的工作流，比如：

1. 用 Agent Mail 订阅行业 newsletter，让 Agent 每天整理重点，再发到你的私人邮箱。
2. 让 Agent 定时检索某个主题，把日报、周报通过 Agent Mail 发给你。
3. 把发票邮件转发到 Agent Mail，让 Agent 提取附件或正文里的发票链接，再整理到表格。
4. 把个人邮箱里需要 AI 处理的邮件自动转发到 Agent Mail，让 Agent 做分类、摘要、附件下载和重命名。
5. 给某个项目单独配置一个 Agent Mail 地址，让外部系统、表单、监控告警都发到这里，再由 Agent 统一处理。

这类场景以前也能用脚本拼出来，但门槛比较高。Agent Mail 的价值在于：邮箱地址、授权、CLI、Agent skill、确认机制都被串起来了，普通用户只要用自然语言描述需求就可以开始。

## 其他问题

**会用到我的私人 QQ 邮箱吗？**

不会。官方文档明确说，Agent 使用的是独立创建的专属地址，和个人邮箱完全隔离，互不影响。这一点很重要，因为 Agent Mail 更像是给 Agent 的工作邮箱，而不是把你的私人邮箱直接交给 Agent。

**在哪里管理 Agent 邮箱？**

访问：

```text
https://agent.qq.com
```

可以管理你的 Agent Mail 邮箱地址。

![其他问题](/sites/note.weizwz.com-afbb9997/ai-qq-agent-mail-d2812d13/images/20260630_180431_b2bd6d0ee660a850.webp)

**邮箱地址能改吗？**

官方文档说可以改，且每个邮箱地址仅能修改一次，修改后旧地址会失效。但实测并没有找到修改入口，所以如果你想要一个短一点、好记一点、品牌化一点的 ID，建议注册后尽早想清楚。

**同一台电脑上的多个 Agent 能接不同地址吗？**

按照官方常见问题，目前同一台电脑设备上的多个 Agent 只能共同使用同一个邮箱地址。如果要使用不同地址，需要在不同电脑设备上使用。

**扫码登录失败怎么办？**

官方建议有两点：

1. 把 Agent 给出的授权链接原样复制到浏览器打开，不要改链接内容。
2. 如果链接过期，就让 Agent 重新生成新的授权链接。

你可以直接对 Agent 说：

```text
请帮我生成新的 Agent Mail 的授权链接
```

**Agent 会不会误发邮件？**

从我这次实测看，发送这类写操作不是直接执行，而是会先返回确认摘要，等用户明确回复“确认”或“发送”后才真正发送。这个二次确认机制是我觉得 Agent Mail 比较关键的安全设计。

**现在值不值得开通？**

如果你平时已经在用 Codex、Claude Code、Cursor、Kimi Work、豆包超能模式这类 Agent，我觉得值得。哪怕暂时只用来测试，也可以先把自己的 Agent 邮箱 ID 占住。

邮箱本身看起来只是一个地址，但一旦 Agent 能稳定收发邮件，它就不只是聊天窗口里的助手，而是可以进入真实工作流的协作者了。
