import {Dimensions, StyleSheet} from 'react-native';
import DefaultColors from '../../common/style/DefaultColors';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  indicatorText: {
    zIndex: -1,
    top: 20,
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 80,
    fontSize: 14,
    fontWeight: '400',
    borderRadius: 4,
    backgroundColor: DefaultColors.indicatorBackground,
    color: '#474747',
    overflow: 'hidden',
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    color: '#737373',
    fontWeight: '500',
  },
  logoImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
  },
  buttonContainer: {
    width: '100%',
  },
  createButton: {
    width: '100%',
    height: 60,
    backgroundColor: DefaultColors.mainColor,
    borderRadius: 30,
  },
  createButtonTitle: {
    color: 'white',
  },
  importButton: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: DefaultColors.mainColor,
    borderRadius: 30,
  },
  importButtonTitle: {
    color: DefaultColors.mainColor,
  },
});
