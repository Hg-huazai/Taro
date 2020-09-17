# Taro使用

拓展：命令cls： 清屏（清除命令框的东西）

京东凹凸实验室打造的一款Taro框架	

taro是一款一次编码，多端运行的技术框架

​	遵循react的语法规范，可以用jsx语法规范开发小程序的应用

​	支持TypeSctipt语言开发

​	微信小程序、百度小程序、支付支付宝小程序、web(h5)、reactNative等



​	准备技术：

​		html/css/js、MVVM模型、es6语法特性(promise   异步   class ...)、jsx语法



​	编译小程序要**微信小程序预览模式**的**注意**：(需要注意微信开发者工具的项目设置)

​		需要设置关闭 ES6 转 ES5 功能，开启可能报错；

​		需要设置关闭上传代码时样式自动补全，开启可能报错；

​		需要设置关闭代码压缩上传，开启可能报错；



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
    //第一个参数：最新的属性； 第二个参数：最新的状态
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



## 三.父组件给子组件传信息

####  1.src的pages的index里面创建子组件(child.jsx)文件

可以模仿index.jsx文件

```jsx
//Child.jsx
import React, { Component } from 'react'
import {View,Text} from "@tarojs/components"

//定义组件
class Child extends Component {
  //初始化的时候不会执行
  //父组件传递给子组件的属性发生变化的时候，此钩子函数才会执行
  componentWillReceiveProps(nextProps,nextState){
      //假如父组件的info属性改变了    (nextProps.info.sex:  最新的属性状态值)
    console.log(nextProps.info.sex)
  }
  render(){
    let {info} = this.props;   //es6的解构赋值(个人理解：info不能乱取名，一定是this.props的属性)    this.props可以拿到父组件给子组件绑定的所有属性
    console.log(info)   //{sex:"man",age: 30}
    console.log(this.props)  //{username:"李四",info:{sex:"man",age: 30}}
    return (
        //子组件获取父组件传递的username属性
        <View>
          <View>我是Child组件:{this.props.username}</View>
          <View>我是Child组件:{info.sex}</View>
          <View>我是Child组件:{this.props.name}</View>    //父组件是没有给子组件添加name这个属性的  所以这里会显示“默认”
        </View>
    )
  }
}
//设置默认属性  如果父组件没有传递属性给子组件
Child.defaultProps = {
  name:'默认'
}
//暴露组件
export default Child;
```



index.jsx文件使用组件Child.jsx

```jsx
//index.jsx
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
//引入组件Child
import Child from './child.jsx'

export default class Index extends Component {
  state = {
    name: '张三',
    age: 20,
    info: {
      sex: 'man',
      age: 30
    },
  }

  componentWillReceiveProps(){
    console.log('父组件给子组件传递信息是才会调用')
  }

  render () {
    console.log('render')
    return (
      <View className='index'>
        {/* 使用child组件 */}
        <Child username={this.state.name} info={this.state.info}></Child>
      </View>
    )
  }
}

```



## 四.taro路由的配置

#### 一.添加页面	

1.添加页面时（例如添加/pages/ceshi/ceshi.jsx ）   

```jsx
pages/ceshi/ceshi.jsx

import React, { Component } from 'react'
import { View, Text ,Button} from '@tarojs/components'    //使用的标签

export default class Ceshiyemian extends Component {
  
  state = {
    name: '张三',
    age: 20,
  }

  render () {
    console.log('render')
    return (
      <View>
        测试页面!!{this.state.name}
      </View>
    )
  }
}

```

注意：我这个项目还必须要添加/pages/ceshi/ceshi.conifg.js才不会报错

```js
pages/ceshi/ceshi.config.js

export default {
	navigationBarTitleText: '测试页面'
}
```

如果你没有pages/ceshi/ceshi.conifg.js这个文件不会报错，那么你只需要在pages/ceshi/ceshi.jsx文件添加如下一样可以配置导航头

```jsx
pages/ceshi/ceshi.jsx

config 是和 state同级的
config = {
	navigationBarTitleText: '测试页面'
}
```





2.入口文件app.jsx      我的是app.config.js文件

```js
export default {
  pages: [
    'pages/ceshi/ceshi',
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}

```

3.浏览器进入即可显示测试页面内容（因为ceshi在index上面）



#### 二.路由点击跳转

```jsx
pages/ceshi/ceshi.jsx

import React, { Component } from 'react'
import Taro from '@tarojs/taro'    //记得导入
import { View, Text ,Button} from '@tarojs/components'    //使用的标签

export default class Ceshiyemian extends Component {
  
  state = {
    name: '张三',
    age: 20,
  }
//跳转事件
 navindex(){
    Taro.navigateTo({
      url: '../index/index?id=3&age=25'
    })
  }

  render () {
    console.log('render')
    return (
      <View>
        <Button onClick={this.navindex}>跳转index页面</Button>  //添加点击事件
      </View>
    )
  }
}
```

获取路由跳转的参数

```jsx
//index.jsx
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'    //获取页面跳转过来的参数时需要用到
import './index.less'
//引入组件Child
import Child from './child.jsx'

export default class Index extends Component {
  state = {
    name: '张三',
    age: 20,
  }

在挂载前钩子可以获取传过来的参数
componentWillMount () { 
    console.log('挂载前');
    let {id} = getCurrentInstance().router.params  //获取路由跳转的参数
    let {age} = getCurrentInstance().router.params  //获取路由跳转的参数    推荐使用结构赋值
    console.log(id);  //3
    console.log(age);  //25
  }

  render () {
    console.log('render')
    return (
      <View className='index'>
        {/* 使用child组件 */}
        <Child username={this.state.name} info={this.state.info}></Child>
      </View>
    )
  }
}

```



## 五.资源的引用

####  1.可以直接通过import语法引用样式文件

####  2.图片引入必须要通过import方式进行引入

####  3.引用js文件方式

```js
import {functionName} from 'path'
import defaultExportName from 'path'
```



方式一：

```js
// util.js
//暴露出来的两个方法
export function setData(){
  console.log('setData')
}
export function getData(){
  console.log('getData')
}


```

index.js 引入 并使用

```js
import {setData,getData} from '../../util.js'

//使用 
setData();  //setData
getData();  //getData

```



方式二：

```js
// util.js
//暴露出来的两个方法
function setData(){
  console.log('setData')
}
function getData(){
  console.log('getData')
}
//导出的是对象
export default ({
    setData,     //setData: setData    es6  简写
    getData
}); 
```

使用

```js
import util from '../../util.js'    //不需要大括号了

//使用 
util.setData();  //setData
util.getData();  //getData
```

  2.图片引入

```jsx
import { View, Text ,Button,Image} from '@tarojs/components'
import img from '../../img/one.png'

render () {
    console.log('render')
    return (
      <View>
        <Image src={img}></Image>
      </View>
    )
  }


```

3.样式文件引入   (注意单位px一定要大写的PX)

```
import './index.less'    


```

## 六.条件渲染和列表和Children

#### 1.条件渲染（三元运算符）方法一

```jsx
export default class Ceshiyemian extends Component {
  
  state = {
    isshow:false
  }

  render () {
    console.log('render')
    let {isshow} = this.state  // 结构赋值
    return (
      <View>
        {isshow ? <View>三元运算符</View> : null}
      </View>
    )
  }
}

```

方法二：

```jsx
export default class Ceshiyemian extends Component {
  
  state = {
    isshow:false
  }

  render () {
    console.log('render')
    let {isshow} = this.state  // 结构赋值
    let dom = isshow ? <View>三元运算符</View> : null;
    return (
      <View>{dom}</View>
    )
  }
}
```

方法三：封装

```jsx
export default class Ceshiyemian extends Component {
  
  state = {
    isshow:false
  }

 getdom(){
     let {isshow} = this.state  // 结构赋值
     return (isshow ? <View>三元运算符</View> : null);
 }

  render () {
    console.log('render')
    return (
      <View>{this.getdom()}</View>
    )
  }
}
```



#### 2.列表

```jsx
export default class Ceshiyemian extends Component {
  
  state = {
    list: [
      {id:1, name:'ZS'},
      {id:2, name:'LX'},
      {id:3, name:'WW'},
      {id:4, name:'ZL'},
    ]
  }

  render () {
    console.log('render')
    return (
      <View>
        {
          list.map((item,index)=>{
            return (<View key={item.id}>{item.name}</View>)
          })
        }
      </View>
    )
  }
}
```

#### 3.children  （类似于插槽）

父组件

```jsx
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'
//引入组件Child
import Child from './child.jsx'

export default class Index extends Component {
  
  state = {
    name: '张三',
    age: 20,
  }

  render () {
    console.log('render')
    return (
      <View className='index'>
        {/* 使用child组件 */}
        <Child username={this.state.name}>你好</Child>
      </View>
    )
  }
}

```



子组件（{this.props.children}    //如果没有这一条的话，上面的“你好”是不会显示出来的    类似于插槽）

```jsx
import React, { Component } from 'react'
import {View,Text} from "@tarojs/components"

//定义组件
class Child extends Component {
  
  render(){
    return (
       //子组件通过props获取父组件传递的username属性
    <View>
      <View>我是Child组件</View>
      {this.props.children}    //如果没有这一条的话，上面的“你好”是不会显示出来的    类似于插槽
    </View>
    )
  }
}
//暴露组件
export default Child;
```



## 七.事件处理

#### 1.Taro事件采用驼峰命名

#### 2.在Taro中阻止事件冒泡，采用e.stopPropagatio

#### 3.事件参数传参的时候，最后面才是事件的对象

```jsx
import React , { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text ,Button,Image} from '@tarojs/components'

export default class Ceshiyemian extends Component {
  
  state = {
    name: '张三',
    age: 20,
  }

  navindex(e){
    //console.log(e)
    console.log(this)  //undefined
  }
	
  handleClick(par, e){
      第一个参数是传过来的参数，第二个是事件本身的
    //console.log(e)
    console.log(par, e)
    console.log(this.state.name)  //'张三'
     e.stopPropagatio()   //阻止事件的冒泡
  }

  render () {
    console.log('render')
    return (
      <View>
        <Button onClick={this.navindex}>跳转index页面</Button>
        <Button onClick={this.handleClick.bind(this,this.state.name)}>跳转index页面</Button>    //bind()改变this的指向
      </View>
    )
  }
}

```

```jsx
const h5 = process.env.TARO_ENV;
当前的运行环境

const isH5 = process.env.TARO_ENV === "h5"
如果是h5的话，那个isH5为true

运用
if(isH5){
    console.log("现在是h5环境")
    require("./h5.less");
}else {
    console.log("现在是微信小程序环境")
    require("./wx.less")
}
```

