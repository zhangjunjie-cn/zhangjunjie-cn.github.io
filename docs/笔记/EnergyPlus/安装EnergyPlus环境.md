## 1.安装Openstudio

安装 `OpenStudioApplication-1.7.0+b070178884-Ubuntu22.04`，会报缺少依赖

> dpkg: 依赖关系问题使得 openstudioapplication-1.7.0 的配置工作不能继续：
 openstudioapplication-1.7.0 依赖于 libwxgtk3.0-0v5 (>= 3.0.0) | libwxgtk3.0-0 (>= 3.0.0) | libwxgtk3.0-gtk3-0v5 (>= 3.0.0)；然而：
  未安装软件包 libwxgtk3.0-0v5。
  未安装软件包 libwxgtk3.0-0。
  未安装软件包 libwxgtk3.0-gtk3-0v5。
 openstudioapplication-1.7.0 依赖于 libxcb-cursor0；然而：
  未安装软件包 libxcb-cursor0。

**Ubuntu20.04中安装wxWidgets库**

在ubuntu中通过apt 直接安装wxWidgets 开发套件：
```
sudo apt install libwxgtk3.0-gtk3-dev
```
随后通过wx-config对源文件进行编译：
```
g++ wxDemo.cpp -o wxDemo `wx-config --cxxflags --libs`
```
参考：https://packages.ubuntu.com/focal/libwxgtk3.0-gtk3-dev

