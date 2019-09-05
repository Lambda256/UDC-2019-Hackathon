import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Image, AsyncStorage, Keyboard, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import { Icon } from 'native-base';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pw: '',
            index: '',
        }
    }

    // 로그인
    saveData = async() => {
        const {id, pw, index} = this.state;

        var Details = {
            id: id,
            pw: pw,
            index: index
        }
        console.log(Details)
        try{
            const response = await fetch('http://ch-4ml.iptime.org:3000/login/',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Details)
            }).then((response) => response.json())
            .then((responseJson)=>{
                return responseJson;
            })
            if (response["result"]==true){
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Main'})],
                });
                console.log(response)
                console.log(response["index"])
                AsyncStorage.setItem('Details', JSON.stringify(Details));
                AsyncStorage.setItem('ForSession', JSON.stringify(response["index"]));
                AsyncStorage.getItem('ForSession', (err,result)=>{
                    console.log(result)
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                // 여기에서 작업 처리 (fetch로 전송 또 보내고 if 문으로 처리
                
                Keyboard.dismiss();
                alert('1: ' + id + '2: ' + pw);
                this.props.navigation.navigate('routeTwo');
            }
            // console.log(response)
            // console.log(Details)
            // console.log(JSON.stringify(Details))
        } catch (error) {
            console.error('saveData',error)
        }
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
        tabBarOptions: { showLabel: false, visible: false, },
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    {/* 이미지 바꾸기 */}
                    <Image style={{ width: 292, height: 430, }} source={require('../assets/loginLogo.jpg')} />
                </View>
                <View style={styles.idPw}>
                    {/* 밑에 줄 없애는거 찾기 */}
                    <Input containerStyle={{
                        width: 300,
                        alignItems: 'center',
                        borderStyle: 'solid',
                        overflow: 'hidden',
                        marginBottom: 10,
                        borderWidth: 0.5,
                        borderRadius: 25,
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: '#3c7bfe',
                    }} autoCorrect={false}
                        onChangeText={(id) => this.setState({ id })}
                        onSubmitEditing={() => this.pw.focus()}
                        placeholder='아이디' />

                    <Input containerStyle={{
                        width: 300,
                        alignItems: 'center',
                        borderStyle: 'solid',
                        overflow: 'hidden',
                        marginTop: 10,
                        borderWidth: 0.5,
                        borderRadius: 25,
                        borderColor: '#3c7bfe',
                    }} autoCorrect={false}
                        onChangeText={(pw) => this.setState({ pw })}
                        ref={(input) => this.pw = input}
                        placeholder='비밀번호' secureTextEntry={true} />
                </View>
                <View style={styles.login}>
                    {/* 버튼 크기 조절 */}
                    <TouchableOpacity>
                        <Button containerStyle={{
                            margin: 10,
                            alignItems: 'stretch',
                            paddingLeft: 30,
                            paddingRight: 30,
                        }} onPress={this.saveData} title='로그인' type='solid' size={10} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 18, color: '#2d5ff4', marginTop: 25, textAlign: 'center', }} onPress={() => { navigation.navigate('Register') }}>아직 회원이 아니신가요?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50,
    },
    image: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    idPw: {
        flex: 0.7,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        flex: 0.8,
        backgroundColor: '#fff',
    },
});