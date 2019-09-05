import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Icon } from 'native-base';

export default class ProfileTab extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>Profile</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});