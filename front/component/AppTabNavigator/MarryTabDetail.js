import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Alert, ScrollView, Image, TouchableOpacity, AsyncStorage, Keyboard, } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Icon } from 'native-base';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class MarryTabDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            title: '',
            content: '',
            sender_gender: '',
            sender_name: '',
            hall_title: '',
            hall_cost: '',
            dress_title: '',
            dress_cost: '',
            makeup_title: '',
            makeup_cost: '',
            studio_title: '',
            studio_cost: '',
            total_cost: '',
        }
    }

    saveData = () => {
        const { name, title, content } = this.state;

        let Detail = {
            propose: {
                sender: 98,
                receiver: 97,
                date: `${this.props.navigation.getParam('marryDate')}`,
                package: {
                    hall: {
                        title: `${this.props.navigation.getParam('hall_title')}`,
                        cost: `${this.props.navigation.getParam('hall_cost')}`,
                    },
                    studio: {
                        title: `${this.props.navigation.getParam('studio_title')}`,
                        cost: `${this.props.navigation.getParam('studio_cost')}`,
                    },
                    dress: {
                        title: `${this.props.navigation.getParam('dress_title')}`,
                        cost: `${this.props.navigation.getParam('dress_cost')}`,
                    },
                    makeup: {
                        title: `${this.props.navigation.getParam('makeup_title')}`,
                        cost: `${this.props.navigation.getParam('makeup_cost')}`,
                    }
                },
                cost: `${this.props.navigation.getParam('total_cost')}`
            },
        };

        const marryJSON = JSON.stringify(Detail);

        alert(marryJSON);
        this.props.navigation.navigate('Home');
    }

    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
            shadowOpacity: 0,
            shadowOffset: {
                height: 0,
            },
            shadowRadius: 0,
            elevation: 0,
        },
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            flexGrow: 1,
        },
        headerLeft: (<Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} style={{ paddingLeft: 10 }} />),
        title: '이어줄개',
        headerRight: (<Text style={{ color: '#fff' }}> </Text>),
    }

    render() {
        return (
            <View style={{ flex: 1, backgrounColor: '#fff', }}>
                <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 20, }}>선택한 옵션</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 날짜 및 시간 : {this.props.navigation.getParam('marryDate', '선택한 날짜가 없습니다.')}</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 장소 : {this.props.navigation.getParam('hall_title', '선택한 옵션이 없습니다.')}</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 장소 비용 : {this.props.navigation.getParam('hall_cost', '0')} 원</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 예복 : {this.props.navigation.getParam('dress_title', '선택한 옵션이 없습니다.')}</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 예복 비용 : {this.props.navigation.getParam('dress_cost', '0')} 원</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 메이크업 : {this.props.navigation.getParam('makeup_title', '선택한 옵션이 없습니다.')}</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 메이크업 비용 : {this.props.navigation.getParam('makeup_cost', '0')} 원</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 스튜디오 : {this.props.navigation.getParam('studio_title', '선택한 옵션이 없습니다.')}</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f' }}> - 스튜디오 비용 : {this.props.navigation.getParam('studio_cost', '0')} 원</Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 30, color: '#1f1f1f', fontStyle: 'bold' }}> - 총 비용 : {this.props.navigation.getParam('total_cost', '0')} 원</Text>
                <Input containerStyle={{
                    width: 300,
                    alignItems: 'center',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    marginTop: 30,
                    marginLeft: 30,
                    borderWidth: 0.5,
                    borderRadius: 25,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: '#3c7bfe',
                }}
                    underlineColorAndroid='transparent'
                    onChangeText={(name) => this.setState({ name })}
                    onSubmitEditing={() => this.title.focus()}
                    placeholder='운명의 상대 닉네임' />

                <Input containerStyle={{
                    width: 300,
                    alignItems: 'center',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    marginTop: 25,
                    marginLeft: 30,
                    borderWidth: 0.5,
                    borderRadius: 25,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: '#3c7bfe',
                }}
                    underlineColorAndroid='transparent'
                    onChangeText={(title) => this.setState({ title })}
                    onSubmitEditing={() => this.content.focus()}
                    ref={(input) => this.title = input}
                    placeholder='프로포즈 제목' />

                <Input containerStyle={{
                    width: 300,
                    alignItems: 'center',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    marginTop: 25,
                    marginLeft: 30,
                    borderWidth: 0.5,
                    borderRadius: 25,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: '#3c7bfe',
                }}
                    underlineColorAndroid='transparent'
                    onChangeText={(content) => this.setState({ content })}
                    ref={(input) => this.content = input}
                    placeholder='프로포즈 내용' />

                <TouchableOpacity>
                    <Button containerStyle={{
                        marginTop: 35,
                        marginBottom: 20,
                        margin: 10,
                        alignItems: 'stretch',
                        paddingLeft: 30,
                        paddingRight: 30,
                    }} onPress={this.saveData} title='프로포즈 보내기' type='solid' size={10} />
                </TouchableOpacity>
            </View>
        );
    }
}