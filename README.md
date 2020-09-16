# Taro使用

拓展：命令cls： 清屏（清除命令框的东西）

京东凹凸实验室打造的一款Taro框架	

taro是一款一次编码，多端运行的技术框架

​	遵循react的语法规范，可以用jsx语法规范开发小程序的应用

​	支持TypeSctipt语言开发

​	微信小程序

​	百度小程序

​	支付支付宝小程序

​	web（h5）

​	reactNative等



​	准备技术：

​		html/css/js

​		MVVM模型

​		es6语法特性   promise   异步   class ...

​		jsx语法



## 一.项目创建

​	核心转换图

​	![image-20200916144718803](C:\Users\Hg-huazai\AppData\Roaming\Typora\typora-user-images\image-20200916144718803.png)

### 1.Taro的安装

##### 	1.安装Taro开发工具@tarojs/cli

##### 	2.使用npm全局安装  （npm install -g  @tarojs/cli）  

​		注意：npm的服务器是在国外的，翻墙下载会因为网络原因使依赖下载失败

​		推荐国内： cnpm（淘宝镜像）

​		安装完后会在node安装包的node_modules有@tarojs文件生产，（主要看你的路径）

​		

### 2.Taro初始化项目

![image-20200916150314812](C:\Users\Hg-huazai\AppData\Roaming\Typora\typora-user-images\image-20200916150314812.png)

2.1使用命令创建模版

```
taro init myApp
```

2.2 开发期启用的命令

```
npm run dev:h5      WEB
npm run dev:weapp  微信小程序
npm run dev:alipay  支付宝小程序
npm run dev:swan    百度小程序
npm run dev:rn      ReactNative
```

如果运行的是H5，跳转到浏览器是空白的话，就要给config文件夹的index.js的H5添加如下内容

```
port 端口号， host 域名（本地）
devServer:{port:8080,host:"localhost"},
```

运行成功是出现hello word

运行微信小程序的话会生成 dist文件夹，用微信开发工具引入dist打开即可

可以在dist的文件夹找到project.config.json 修改appid

2.3项目目录

![image-20200916155828014](C:\Users\Hg-huazai\AppData\Roaming\Typora\typora-user-images\image-20200916155828014.png)



```
1.项目目录

​	1.1dist(编辑结果的目录)

​	1.2config(配置目录)

​		1.2.1 dev.js(开发时配置)

​		1.2.2 index.js(默认配置)

​		1.2.3 prod.js(打包时配置)

​	1.3 src(源码目录)

​		1.3.1 pages(页面文件目录)

​			1.3.1.1 index(页面目录)

​				1.3.1.1.1 index.jsx(页面逻辑)

​				1.3.1.1.2 index.less(页面样式)

​		1.3.2 app.jsx(项目入口文件)

​		1.3.3 app.less(项目总通用样式)

​	1.4 package.json

​	1.5 project.config.json(小程序)
```





## 二.生命周期与state

