import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'
//引入组件Child
import Child from './child.jsx'
import Child1 from './child1.jsx'

export default class Index extends Component {
  
  state = {
    name: '张三',
    age: 20,
    info: {
      sex: 'man',
      age: 30
    },
    info1: {sex: 'wan'},
  }

  componentWillMount () { 
    console.log('挂载前');
    let {id} = getCurrentInstance().router.params  //获取路由跳转的参数
    let {age} = getCurrentInstance().router.params  //获取路由跳转的参数    推荐使用结构赋值
    console.log('id:'+id);  //3
    console.log('age:'+age);  //25
  }

  componentDidMount () { 
    console.log('可以访问到真是的dom结构了');
    //更改组件的状态
    //this.state.name = '李四' 此方法不行
    // this.setState({
    //   name: '李四'
    // })
    //注意：this.setState 是异步的
    //如果想要获取最新的状态，需要在steState的第二个参数函数内部获取；
    this.setState({
      name:'李四',
    },()=>{
      console.log('更新后的状态：'+this.state.name);  //李四
    })
    console.log('还是更新前的状态： '+this.state.name);  //张三
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
  
  shouldComponentUpdate(nextProps,nextState){
    //组件状态（state）被更改是进入  默认返回true， 如果返回true就会执行render()函数，
    //即便状态 更改了，如果是返回flase的话，render()也不会重新渲染；
    //shouldComponentUpdate  有两个参数(第二个参数是最新的状态)
    //检查此次setState是否进行render调用
    //一般用来多次的setState调用时，提升render的性能
    console.log("shouldComponentUpdate",nextState.name)
    // return true;
    if(nextState.name == '李四') return true;
    else return false;
  }

  componentWillReceiveProps(){
    console.log('父组件给子组件传递信息是才会调用')
  }

  render () {
    console.log('render')
    return (
      <View className='index'>
        {/* 使用child组件 */}
        <Child username={this.state.name} info={this.state.info} info1={this.state.info1}></Child>
        {/* 使用child1组件 */}
        <Child1 info1={this.state.info1}></Child1>
      </View>
    )
  }
}
