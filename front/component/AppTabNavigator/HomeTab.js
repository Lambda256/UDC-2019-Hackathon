import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Navigator } from 'react-navigation';
import { Icon } from 'native-base';
import Carousel, { Pagination } from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;

const images = [require('../../assets/banner1.jpg'), require('../../assets/banner2.jpg'), require('../../assets/banner3.jpg')];

export default class HomeTab extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation })  => {
        return {
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
    }

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: 260 }} source={image} />
            </View>
        );
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => this.renderPage(image, index))}
                    </Carousel>
                </View>
                <View style={styles.notice}>
                    <Text style={{ padding: 2, backgroundColor: '#e1e1e1', marginTop: 10, alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10}}>공지사항말머리 결혼까지 단 10일!</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                    <TouchableOpacity style={styles.marry} onPress={() => { this.props.navigation.navigate('MarryTab') }}>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', flex: 1, marginTop: 30, marginLeft: 10, marginRight: 10, marginBottom: 15, }}>
                            <Image style={{ width: 116, height: 76, marginTop: 57, alignSelf: 'center' }} source={require('../../assets/view_1.jpg')}></Image>
                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', backgroundColor: '#fff', height: 80, width: 80, borderRadius: 100 / 2, marginTop: 5, alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
                            <Image style={{ width: 50, height: 50, marginTop: 12, alignSelf: 'center' }} source={require('../../assets/main_1.jpg')}></Image>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.party}>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', flex: 1, marginTop: 30, marginLeft: 10, marginRight: 10, marginBottom: 15, }}>
                            <Image style={{ width: 111, height: 85, marginTop: 53, alignSelf: 'center' }} source={require('../../assets/view_2.jpg')}></Image>
                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', backgroundColor: '#fff', height: 80, width: 80, borderRadius: 100 / 2, marginTop: 5, alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
                            <Image style={{ width: 50, height: 50, marginTop: 12, alignSelf: 'center' }} source={require('../../assets/main_2.jpg')}></Image>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <TouchableOpacity style={styles.board} onPress={() => { this.props.navigation.navigate('Board') }}>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', flex: 1, marginTop: 25, marginLeft: 10, marginRight: 10, marginBottom: 15, }}>
                            <Image style={{ width: 120, height: 85, marginTop: 54, alignSelf: 'center' }} source={require('../../assets/view_3.jpg')}></Image>
                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', backgroundColor: '#fff', height: 80, width: 80, borderRadius: 100 / 2, alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
                            <Image style={{ width: 50, height: 50, marginTop: 12, alignSelf: 'center' }} source={require('../../assets/main_3.jpg')}></Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.propose} onPress={() => { this.props.navigation.navigate('Propose') }}>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', flex: 1, marginTop: 25, marginLeft: 10, marginRight: 10, marginBottom: 15, }}>
                            <Image style={{ width: 115, height: 79, marginTop: 57, alignSelf: 'center' }} source={require('../../assets/view_4.jpg')}></Image>
                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#e1e1e1', backgroundColor: '#fff', height: 80, width: 80, borderRadius: 100 / 2, alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
                            <Image style={{ width: 50, height: 50, marginTop: 10, alignSelf: 'center' }} source={require('../../assets/main_4.jpg')}></Image>
                        </View>
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
    },
    banner: {
        flex: 1.2,
        backgroundColor: '#fff',
    },
    notice: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    menu: {
        flex: 1.2,
        flexDirection: 'row',
    },
    marry: {
        flex: 1,
        backgroundColor: '#fff'
    },
    party: {
        flex: 1,
        backgroundColor: '#fff',
    },
    board: {
        flex: 1,
        backgroundColor: '#fff'
    },
    propose: {
        flex: 1,
        backgroundColor: '#fff'
    }
});