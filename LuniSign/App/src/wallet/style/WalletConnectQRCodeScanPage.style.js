import {Dimensions, StyleSheet} from 'react-native';
import {Header} from 'react-navigation';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    height: height - Header.HEIGHT,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 80,
  },
  rectangle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
