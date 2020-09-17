import React, { Component } from 'react'
import {View,Text} from "@tarojs/components"

//定义组件
class Child extends Component {
  //初始化的时候不会执行
  //父组件传递给子组件的属性发生变化的时候，此钩子函数才会执行
  componentWillReceiveProps(nextProps,nextState){
    //假如父组件的username属性改变了    (nextProps.username:  最新的属性状态值)
    console.log(nextProps.username)
  }
  render(){
    let {info} = this.props;   //es6的解构赋值(个人理解：info不能乱取名，一定是this.props的属性)    this.props可以拿到父组件给子组件绑定的所有属性
    console.log(info)
    console.log(this.props)
    return (
       //子组件通过props获取父组件传递的username属性
    <View>
      <View>我是Child组件:{this.props.username}</View>
      <View>我是Child组件:{info.sex}</View>
      <View>我是Child组件:{this.props.name}</View>
      {this.props.children}
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