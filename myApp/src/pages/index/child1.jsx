import React, { Component } from 'react'
import {View,Text} from "@tarojs/components"

//定义组件
class Child1 extends Component {
  render(){
    let {info1} = this.props;   //es6的解构赋值
    console.log(this.props)
    return (
       //子组件通过props获取父组件传递的username属性
    <View>
      <View>我是Child1组件:{info1.sex}</View>
    </View>
    )
  }
}
//暴露组件
export default Child1;