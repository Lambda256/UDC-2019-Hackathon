import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import ProposeItem from './ProposeTabItem';

export default class ProposeTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: '',
            content: '',
            sender_name: '',

            proposeItems: [
                { name: '001', title: '패키지', content: '강남', sender_name: '나단ㄹ' },
                { name: '002', title: '12323', content: '서초', sender_name: '나ㅇ단' },
                { name: '003', title: '패키지3', content: '5잉6', sender_name: '나단' },
                { name: '004', title: '패키지5', content: '한ㅁ', sender_name: '나단ㅁ' },
            ],
            isLoading: false,
        };
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

    _getProposeDatas = async(limit) => {
        this.setState({
            isLoading: true,
        });

        await this.setState({
            isLoading: false,
        });
    }

    _renderItem = ({item}) => {
        const {no, name, rdn} = item;
        return (
            <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('ProposeDetail', {title: name})}}
            >
            <ProposeItem
                no={no}
                name={name}
                rdn={rdn}
            />
            </TouchableOpacity>
        );
    }

    componentDidMount() {
        this._getProposeDatas(10);
    }

    render() {
        return (
            <View style={style.container}>
                <FlatList
                    style={{backgroundColor: '#fff'}}
                    contentContainerStyle={this.props.contentContainer}
                    data={this.state.proposeItems}
                    keyExtractor={(item) => item.name}
                    renderItem={this._renderItem}
                    refreshing={this.state.isLoading}
                    onRefresh={this._getProposeDatas}
                />
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
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 45,
    },
    contentContainer: {
        backgroundColor: '#fff'
    },
});