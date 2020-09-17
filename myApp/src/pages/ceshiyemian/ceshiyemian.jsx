import React , { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text ,Button,Image} from '@tarojs/components'
import {setData} from '../../util.js'
import img from '../../img/one.png'

export default class Ceshiyemian extends Component {
  
  state = {
    name: '张三',
    age: 20,
    isshow:false,
    list: [
      {id:1, name:'ZS'},
      {id:2, name:'LX'},
      {id:3, name:'WW'},
      {id:4, name:'ZL'},
    ]
  }

  componentWillMount () { 
    console.log('挂载前')
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

    setData();
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

  componentWillReceiveProps(){
    console.log('父组件给子组件传递信息是才会调用')
  }

  navindex(){
    Taro.navigateTo({
      url: '../index/index?id=3&age=25'
    })
  }
  handleClick(par,event){
    // 第一个参数是传过来的参数，第二个是事件本身的
    console.log(par,event)

    //event.stopPropagatio()   //阻止事件的冒泡
  }

  render () {
    console.log('render')
    let {isshow} = this.state
    let {list} = this.state
    return (
      <View>
        测试页面!!{this.state.name}
        <Button onClick={this.navindex}>跳转index页面</Button>
        <Button onClick={this.handleClick.bind(this,this.state.name)}>测试点击拿参数</Button>
        <Image src={img}></Image>
        {isshow ? <View>三元运算符</View> : null}
        {
          list.map((item,index)=>{
            return (<View key={item.id}>{item.name}</View>)
          })
        }
    
      </View>
    )
  }
}
