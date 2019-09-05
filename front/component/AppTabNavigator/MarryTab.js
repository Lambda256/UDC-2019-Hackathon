import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Alert, ScrollView, Image, TouchableOpacity, AsyncStorage, Keyboard, } from 'react-native';
import { Icon } from 'native-base';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class MarryTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            HallJSON: '',
            DressJSON: '',
            MakeupJSON: '',
            StudioJSON: '',

            time: '',
            marryTime: '',
            marryDay: '',
            dateSelected: '',
            // hall_num: '',
            hall_title: '',
            hall_cost: 0,
            // dress_num: '',
            dress_title: '',
            dress_cost: 0,
            // makeup_num: '',
            makeup_title: '',
            makeup_cost: 0,
            // studio_num: '',
            studio_title: '',
            studio_cost: 0,
            total_cost: 0,
        };
        this.updateTime = this.updateTime.bind(this)
    }

    saveData = async () => {
        const { marryDay, marryTime, hall_title, hall_cost, dress_title, dress_cost, makeup_title, makeup_cost, studio_title, studio_cost, total_cost } = this.state;

        this.setState({total_cost: (Number(hall_cost) + Number(dress_cost) + Number(makeup_cost) + Number(studio_cost))});

        let Detail = {
            marryDay: marryDay,
            marryTime: marryTime,
            package: {
                hall: {
                    title: hall_title,
                    cost: hall_cost,
                },
                dress: {
                    title: dress_title,
                    cost: dress_cost,
                },
                makeup: {
                    title: makeup_title,
                    cost: makeup_cost,
                },
                studio: {
                    title: studio_title,
                    cost: studio_cost,
                },
            },
        }

        const marryJSON = JSON.stringify(Detail);
        Keyboard.dismiss();
        // this.props.navigation.navigate('MarryDetail', { marryJSON: marryJSON })
        this.props.navigation.navigate('MarryDetail', { marryDate: (marryDay + " " + marryTime), hall_title: hall_title, hall_cost: hall_cost, dress_title: dress_title, dress_cost: dress_cost, makeup_title: makeup_title, makeup_cost: makeup_cost, studio_title: studio_title, studio_cost: studio_cost, total_cost: total_cost});
    }

    updateTime(time) {
        switch (time) {
            case 0:
                this.setState({ marryTime: '11:00:00', time: time });
                break;
            case 1:
                this.setState({ marryTime: '13:00:00', time: time });
                break;
            case 2:
                this.setState({ marryTime: '15:00:00', time: time });
                break;
            default:
                break;
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
        headerLeft: (<Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} style={{ paddingLeft: 10 }} />),
        title: '이어줄개',
        headerRight: (<Text style={{ color: '#fff' }}> </Text>),
    }

    render() {
        const buttons = ['오전 11시', '오후 1시', '오후 3시']
        const { time } = this.state
        return (
            <View style={style.container}>
                <ScrollView>
                    <Calendar
                        style={{ marginLeft: 20, marginRight: 20, marginBottom: 25 }}
                        minDate={Date()}
                        onDayPress={(day) => {
                            this.setState({
                                dateSelected: { [day.dateString]: { selected: true, selectedColor: '#466A8F' } }
                                , marryDay: day.dateString
                            })
                        }}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        markedDates={this.state.dateSelected}
                    />

                    <Text style={{ fontSize: 22, marginRight: 20, paddingLeft: 25, marginBottom: 15, }}>시간대 선택</Text>
                    <ButtonGroup
                        onPress={this.updateTime}
                        selectedIndex={time}
                        buttons={buttons}
                        containerStyle={{ width: '80%', height: 50, marginBottom: 25, alignSelf: 'center' }}
                    />

                    <Text style={{ fontSize: 22, marginTop: 20, paddingLeft: 25 }}>장소 선택</Text>
                    <ScrollView
                        horizontal={true}
                        style={{ marginBottom: 5 }}>
                        <TouchableOpacity onPress={() => { this.setState({ hall_title: 'Hawaii', hall_cost: '300000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_1.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ hall_title: 'Mauritius', hall_cost: '400000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_2.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ hall_title: 'Jeju', hall_cost: '300000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 20, borderRadius: 20 }} source={require('../../assets/marry_place_3.jpg')}></Image>
                        </TouchableOpacity>
                    </ScrollView>
                    <Text style={{ fontSize: 22, marginTop: 20, paddingLeft: 25 }}>예복 선택</Text>
                    <ScrollView
                        horizontal={true}
                        style={{ marginBottom: 5 }}>
                        <TouchableOpacity onPress={() => { this.setState({ dress_title: 'Adela', dress_cost: '200000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_1.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ dress_title: 'Beatrice', dress_cost: '200000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_2.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ dress_title: 'Irene', dress_cost: '200000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 20, borderRadius: 20 }} source={require('../../assets/marry_place_3.jpg')}></Image>
                        </TouchableOpacity>
                    </ScrollView>
                    <Text style={{ fontSize: 22, marginTop: 20, paddingLeft: 25 }}>메이크업 선택</Text>
                    <ScrollView
                        horizontal={true}
                        style={{ marginBottom: 5 }}>
                        <TouchableOpacity onPress={() => { this.setState({ makeup_title: 'Adela', makeup_cost: '200000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_1.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ makeup_title: 'Beatrice', makeup_cost: '200000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_2.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ makeup_title: 'Irene', makeup_cost: '200000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 20, borderRadius: 20 }} source={require('../../assets/marry_place_3.jpg')}></Image>
                        </TouchableOpacity>
                    </ScrollView>
                    <Text style={{ fontSize: 22, marginTop: 20, paddingLeft: 25 }}>스튜디오 선택</Text>
                    <ScrollView
                        horizontal={true}
                        style={{ marginBottom: 5 }}>
                        <TouchableOpacity onPress={() => { this.setState({ studio_title: 'Adela', studio_cost: '400000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_1.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ studio_title: 'Beatrice', studio_cost: '400000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 20 }} source={require('../../assets/marry_place_2.jpg')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ studio_title: 'Irene', studio_cost: '400000', }); }}>
                            <Image style={{ width: 155, height: 185, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 20, borderRadius: 20 }} source={require('../../assets/marry_place_3.jpg')}></Image>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity>
                        <Button containerStyle={{
                            marginTop: 30,
                            marginBottom: 20,
                            alignItems: 'stretch',
                            paddingLeft: 30,
                            paddingRight: 30,
                        }} onPress={this.saveData} title='운명의 상대 선택하기' type='solid' size={10} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    }
});