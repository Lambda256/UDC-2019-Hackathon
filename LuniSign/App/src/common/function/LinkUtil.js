import {Linking} from 'react-native';

const openBrowser = url => Linking.canOpenURL(url) && Linking.openURL(url);

export default openBrowser;
