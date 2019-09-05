import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Alert, ScrollView, Image, TouchableOpacity, AsyncStorage, Keyboard, Picker } from 'react-native';
import { Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class BoardTabNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_index: '',
            title: '',
            category: '',
            contents: '',
            reg_date: '',
        }

        var date = new Date().getDate();
        this.setState({ req_date: date });
    }

    saveData = async () => {
        const { email, password, password2, name, city, breed, gender, date } = this.state;

        let Details = {
            email: email,
            password: password,
            password2: password2,
            name: name,
            city: city,
            breed: breed,
            gender: gender,
            date: date,
        }

        if (password != password2) {
            alert('비밀번호 확인점');
        } else {
            AsyncStorage.setItem('Details', JSON.stringify(Details));
            Keyboard.dismiss();
            alert('1: ' + email + '2: ' + password + '3: ' + name + '4: ' + city + '5: ' + breed + '6: ' + gender + '7: ' + date);

            // this.props.navigation.goBack();
        }
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', margin: 20 }}>
                <Input containerStyle={{
                    width: 300,
                    alignItems: 'center',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    marginBottom: 15,
                    borderWidth: 0.5,
                    borderRadius: 25,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: '#3c7bfe',
                }}
                    underlineColorAndroid='transparent'
                    onChangeText={(title) => this.setState({ title })}
                    onSubmitEditing={() => this.category.focus()}
                    placeholder='글 제목' />

                <Text style={{ fontSize: 16, marginBottom: 5 }}>카테고리 선택</Text>
                <Picker
                    selectedValue={this.state.category}
                    style={{ height: 50, width: 100, marginBottom: 15 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ category: itemValue })
                    }>
                    <Picker.Item label="자유" value="0" />
                    <Picker.Item label="문의" value="1" />
                    <Picker.Item label="후기" value="2" />
                </Picker>

                <Input containerStyle={{
                    width: 300,
                    height: 300,
                    alignItems: 'center',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    marginBottom: 15,
                    borderWidth: 0.5,
                    borderRadius: 25,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: '#3c7bfe',
                }}
                    underlineColorAndroid='transparent'
                    onChangeText={(content) => this.setState({ content })}
                    placeholder='글 내용' />

                <TouchableOpacity>
                    {/* 버튼 크기 조절 */}
                    <Button containerStyle={{
                        margin: 10,
                        alignItems: 'stretch',
                        paddingLeft: 30,
                        paddingRight: 30,
                    }}
                        onPress={this.saveData}
                        title='저장' type='solid' size={10} />

                </TouchableOpacity>
            </View>
        );
    }
}