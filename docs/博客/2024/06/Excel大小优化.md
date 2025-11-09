---
firstCommit: 2024/06/02 21:00
lastUpdated: 2025/11/08 19:00
title: Excel文件大小优化
description: 那段时间啊，太敬业了我，现在想想就有点心累，对待工作还是太年轻了。
tags:
 - WORK
---
# Excel文件大小优化
---

打开Excel特别的慢，要等半天才能出结果，无论怎么清除表格无用的格式，不仅没有缩小反而更大了，这说明你文件里有很多的垃圾信息。

> [!NOTE] excel
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032203609.png"/>


点击【查找】，选择【窗格】，如果里面有很多，就说明存在大量的垃圾信息。

> [!NOTE] wps
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032208010.png"/>

> [!NOTE] &emsp;
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032209912.png"/>

点击【文件】-【另存为】-【MicrosoftExcel文件（*.xlsx)】

> [!NOTE] wps另存为：
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032224092.png"/>

在文件资管管理器，点击【查看】-【文件扩展名】，勾选，将文件扩展名改为.zip格式。
> [!NOTE] 文件资源管理器
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032227545.png"/>

> [!NOTE] &emsp;
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032231970.png"/>

右键对文件进行解压缩，进入xl文件夹，在这里面如果你看到了`activeX`、`drawings`、`media`就将其删除。然后返回上一层目录，将所有文件进行压缩，并将压缩文件后缀名改为.xlsx。可以看到文件大小巨幅缩小。

> [!NOTE] 文件资源管理器
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032234352.png"/>

> [!NOTE] &emsp;
> <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032236009.png"/>