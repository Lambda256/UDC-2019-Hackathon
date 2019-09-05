import React, { Component } from 'react';
import { DatePickerAndroid, DatePickerIOS, StyleSheet, Platform, Text, KeyboardAvoidingView, ScrollView, View, Image, AsyncStorage, Keyboard, TouchableOpacity } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-date-picker';
import { Icon } from 'native-base';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pw: '',
            pw2: '',
            name: '',
            city: '',
            species: '',
            gender: '',
            birthday: '',
            duplicateCheck:'',
        }
        this.updateGender = this.updateGender.bind(this)
    }

    saveData = async () => {
        const { id, pw, pw2, name, city, species, gender, birthday, duplicateCheck } = this.state;
        var DetailsID = {
            id: id
        }
        
        var DetailseName = {
            name: name
        }

        var Details = {
            id: id,
            pw: pw,
            pw2: pw2,
            name: name,
            city: city,
            species: species,
            gender: gender,
            birthday: birthday
        }
        
        try{
            if (pw != pw2) {
                alert('비밀번호 확인해주세요.');
            } else {
                const checkId = await fetch('http://ch-4ml.iptime.org:3000/user/id/',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(DetailsID)
                }).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;
                })
                console.log(checkId)
                if (checkId["result"] === true){
                    const checkName = await fetch('http://ch-4ml.iptime.org:3000/user/name/',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(DetailseName)
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        return responseJson;
                    })
                    Details.name = checkName["name"]
                    const response = await fetch('http://ch-4ml.iptime.org:3000/user/',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Details)
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        return responseJson;
                    })
                    alert("회원가입이 정상적으로 진행되었습니다.")
                    this.props.navigation.goBack();
                } else {
                    console.log("아이디가 중복이다냥 ! 안된다냥!!")
                }
            }
        } catch (error){
            console.error('saveData',error)
        }
    }

    updateGender(gender) {
        this.setState({ gender: gender })
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
        title: '회원가입',
        tabBarOptions: { showLabel: false, visible: false, },
    }

    render() {
        const buttons = ['남자', '여자', '중성화남자', '중성화여자']
        const { gender } = this.state
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>
                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    flexDirection: 'column',
                }}>
                    <View style={styles.text}>
                        <Image style={{ width: 300, height: 100, marginTop: 25, marginBottom: 17, }} source={require('../assets/register.jpg')} />
                    </View>
                    <View style={styles.form}>
                        <Input containerStyle={{
                            width: 300,
                            alignItems: 'center',
                            borderStyle: 'solid',
                            overflow: 'hidden',
                            marginBottom: 25,
                            borderWidth: 0.5,
                            borderRadius: 25,
                            borderTopWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderColor: '#3c7bfe',
                        }}
                            underlineColorAndroid='transparent'
                            onChangeText={(id) => this.setState({ id })}
                            onSubmitEditing={() => this.pw.focus()}
                            placeholder='아이디' />

                        <Input containerStyle={{
                            width: 300,
                            alignItems: 'center',
                            borderStyle: 'solid',
                            overflow: 'hidden',
                            marginBottom: 8,
                            borderWidth: 0.5,
                            borderRadius: 25,
                            borderColor: '#3c7bfe',
                        }}
                            onChangeText={(pw) => this.setState({ pw })}
                            onSubmitEditing={() => this.pw2.focus()}
                            ref={(input) => this.pw = input}
                            placeholder='비밀번호' secureTextEntry={true} />
                        
                        <Image style={{ width: 272, height: 30 }} source={require('../assets/register_2.jpg')} />

                        <Input containerStyle={{
                            width: 300,
                            alignItems: 'center',
                            borderStyle: 'solid',
                            overflow: 'hidden',
                            marginTop: 8,
                            marginBottom: 25,
                            borderWidth: 0.5,
                            borderRadius: 25,
                            borderColor: '#3c7bfe',
                        }}
                            onChangeText={(pw2) => this.setState({ pw2 })}
                            onSubmitEditing={() => this.name.focus()}
                            ref={(input) => this.pw2 = input}
                            placeholder='비밀번호확인' secureTextEntry={true} />

                        <Input containerStyle={{
                            width: 300,
                            alignItems: 'center',
                            borderStyle: 'solid',
                            overflow: 'hidden',
                            marginBottom: 25,
                            borderWidth: 0.5,
                            borderRadius: 25,
                            borderTopWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderColor: '#3c7bfe',
                        }}
                            onChangeText={(name) => this.setState({ name })}
                            onSubmitEditing={() => this.city.focus()}
                            ref={(input) => this.name = input}
                            placeholder='이름' />

                        {/* 검색.... */}
                        <Input containerStyle={{
                            width: 300,
                            alignItems: 'center',
                            borderStyle: 'solid',
                            overflow: 'hidden',
                            marginBottom: 25,
                            borderWidth: 0.5,
                            borderRadius: 25,
                            borderTopWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderColor: '#3c7bfe',
                        }}
                            onChangeText={(city) => this.setState({ city })}
                            onSubmitEditing={() => this.breed.focus()}
                            ref={(input) => this.city = input}
                            placeholder='지역' />

                        <Input containerStyle={{
                            width: 300,
                            alignItems: 'center',
                            borderStyle: 'solid',
                            overflow: 'hidden',
                            marginBottom: 25,
                            borderWidth: 0.5,
                            borderRadius: 25,
                            borderTopWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderColor: '#3c7bfe',
                        }}
                            onChangeText={(species) => this.setState({ species })}
                            ref={(input) => this.species = input}
                            placeholder='견종' />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 10, alignSelf: 'center' }}>성별</Text>
                            <ButtonGroup
                                onPress={this.updateGender}
                                selectedIndex={gender}
                                buttons={buttons}
                                containerStyle={{ width: '80%', height: 50, marginBottom: 25 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 50 }}>생년월일</Text>
                            <DatePicker
                                customStyles={{ marginBottom: 25 }}
                                placeholder='생년월일을 선택'
                                date={this.state.birthday}
                                onDateChange={birthday => this.setState({ birthday })}
                                format='YYYY-MM-DD'
                                mode='date'
                                confirmBtnText='확인'
                                cancelBtnText='취소'
                            />
                        </View>
                        <TouchableOpacity>
                            {/* 버튼 크기 조절 */}
                            <Button containerStyle={{
                                margin: 10,
                                alignItems: 'stretch',
                                paddingLeft: 30,
                                paddingRight: 30,
                            }}
                                onPress={this.saveData}
                                title='확인' type='solid' size={10} />

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexGrow: 1,
        flexDirection: 'column',
    },
    text: {
        flex: 0.2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});;