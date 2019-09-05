import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class BoardTabItems extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: '#fff', alignItems: 'stretch' }}>
                <View style={styles.container}>
                    <View style={styles.inContainer}>
                        <Text style={[styles.textTitle, { flex: 1, fontSize: 20, marginTop: 11, paddingLeft: 20, paddingRight: 25, flexWrap: 'wrap'}]}>{this.props.name || 'Title'}</Text>
                        <View style={{ flexDirection: 'row', flex: 0.8 }}>
                            <Text style={[styles.text, { fontSize: 16, paddingLeft: 20, paddingTop: 2 }]}>누가썼개</Text>
                            <Text style={[styles.text, { fontSize: 16, paddingLeft: 5, paddingTop: 1 }]}>{this.props.rdn || 0}</Text>
                            <Text style={[styles.text, { fontSize: 16, paddingLeft: 10, }]}>|</Text>
                            <Text style={[styles.text, { fontSize: 16, paddingLeft: 10, paddingTop: 1, }]}>{this.props.req_date || '23:59'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, marginTop: 8, backgroundColor: '#e1e1e1' }}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'space-around',
    },
    inContainer: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
    text: {
        paddingRight: 5,
        color: '#615050'
    },
    textRank: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#615050'
    }
});