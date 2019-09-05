import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';

export default class MenuScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.menus}>
          <Text style={{fontSize:25}}>반갑습니다 {this.state.name}님!</Text>
        </View>
        <View style={styles.menus}>
          <Text>회원정보수정</Text>
        </View>
        <View style={styles.menus}>
          <Text>설정</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#eee',
      paddingTop:20,
    },
    menus: {
      width:'100%',
      padding:10,
      borderBottomWidth:0.5,
      borderColor:'#444',
    }
});