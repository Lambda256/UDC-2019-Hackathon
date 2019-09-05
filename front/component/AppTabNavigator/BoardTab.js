import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { Icon } from 'native-base';

import BoardItem from './BoardTabItem';

export default class BoardTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardItems: [
                { no: '001', name: 'Munchkin', rdn: '19' },
                { no: '002', name: 'Jjangchkin', rdn: '43' },
                { no: '003', name: 'Munchking', rdn: '56' },
                { no: '004', name: 'Munchkitty아아아아앙아아아아이슨ㅁ으른ㅇ름니아라ㅣ낭아아아아ㅏ', rdn: '11' },
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

    _getBoardDatas = async (limit) => {
        this.setState({
            isLoading: true,
        });

        await this.setState({
            isLoading: false,
        });
    }

    _renderItem = ({ item }) => {
        const { no, name, rdn } = item;
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BoardDetail', { title: name })}
                style={{ width: '100%', alignItems: 'stretch', }}
            >
                <BoardItem
                    no={no}
                    name={name}
                    rdn={rdn}
                />
            </TouchableOpacity>
        );
    }

    componentDidMount() {
        this._getBoardDatas(10);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    contentContainerStyle={this.props.contentContainer}
                    data={this.state.boardItems}
                    keyExtractor={(item) => item.name}
                    renderItem={this._renderItem}
                    refreshing={this.state.isLoading}
                    onRefresh={this._getBoardDatas}
                />
                <TouchableOpacity>
                    <Button containerStyle={{
                        marginTop: 30,
                        marginBottom: 20,
                        alignItems: 'stretch',
                        paddingLeft: 30,
                        paddingRight: 30,
                    }} onPress={()=>{this.props.navigation.navigate('BoardNew')}} title='글 작성하기' type='solid' size={10} />
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
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