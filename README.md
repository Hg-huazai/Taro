# Taro使用

拓展：命令cls： 清屏（清除命令框的东西）

京东凹凸实验室打造的一款Taro框架	

taro是一款一次编码，多端运行的技术框架

​	遵循react的语法规范，可以用jsx语法规范开发小程序的应用

​	支持TypeSctipt语言开发

​	微信小程序、百度小程序、支付支付宝小程序、web(h5)、reactNative等



​	准备技术：

​		html/css/js、MVVM模型、es6语法特性(promise   异步   class ...)、jsx语法



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

#### 1.生命周期

```js
  componentWillMount () { 
  	console.log('组件渲染前，或者挂载前')
  }

  componentDidMount () { 
  	console.log('可以访问到真是的dom结构了')
  }

  componentWillUnmount () { 
  	console.log('组件被销毁')
  }

  componentDidShow () { 
  	// react里面是不存在该钩子函数的
    console.log('页面显示时触发')
  }

  componentDidHide () { 
      // react里面是不存在该钩子函数的
  	console.log('页面隐藏式触发')
  }

 componentWillUpdate(){
    console.log('state数据将要更新时')
  }

  componentDidUpdate(){
    console.log('state 数据更新过后')
  }

	//这个很重要
 shouldComponentUpdate(nextProps,nextState){
    //组件状态（state）被更改是进入  默认返回true， 如果返回true就会执行render()函数，
    //即便状态 更改了，如果是返回flase的话，render()也不会重新渲染；
    //shouldComponentUpdate  有两个参数(第二个参数是最新的状态)
    //检查此次setState是否进行render调用
    //一般用来多次的setState调用时，提升render的性能
    //console.log("shouldComponentUpdate",nextState.name)
    // return true;
    if(nextState.name == '李四') return true;
    else return false;
  }

  componentWillReceiveProps(){
    console.log('父组件给子组件传递信息是才会调用')
  }
```

#### 2.state

```js
state = {
	name: '张三'
}

//修改状态
//this.state.name = '李四' 此方法不行（vue）

//this.setState ({
//    name = '李四'
//})

//注意：this.setState 是异步的
//如果想要获取最新的状态，需要在steState的第二个参数函数内部获取；
    this.setState({
      name:'李四',
    },()=>{
      console.log('更新后的状态：'+this.state.name);  //李四
    })
    console.log('还是更新前的状态： '+this.state.name);  //张三


//页面获取
{this.state.name}
```

#### 3.总结

状态更新一定是异步的，

同react一致，更新数据必须调用setState方法，若直接赋值是不会更新组件的

这样this.state.name = '李四'    无效

改为 this.setState.name ({name = '李四'}) 才可以

想要拿最新的状态需要在setState的第二个参数的函数才可以拿到