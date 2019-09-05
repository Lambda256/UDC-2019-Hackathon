import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { Icon } from 'native-base';

export default class Main extends Component {
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
        headerLeft: (<Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} style={{paddingLeft: 10}}/>),
        title: '네비게이션이요네이게이션',
        headerRight: (<Icon name={Platform.OS === 'ios' ? 'ios-paw' : 'md-paw'} style={{paddingRight: 10}}/>),
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>야호</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});;