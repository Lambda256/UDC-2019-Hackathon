import {StyleSheet, Dimensions, Platform} from 'react-native';
import DefaultColors from './DefaultColors';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#f9f9f9',
    paddingTop: 50,
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
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    color: '#2a2a2a',
    fontWeight: 'bold',
  },
  descText: {
    fontSize: 13,
    marginVertical: 8,
    color: '#454545',
  },
  errorText: {
    fontSize: 13,
    marginTop: 15,
    color: '#9d302d',
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
  },
  passwordWrapper: {
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderRadius: 4,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 4,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 15,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
  },
  submitContainer: {
    width: '100%',
    bottom: 0,
  },
  submitButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#bfbfbf',
    borderRadius: 0,
  },
  validateText: {
    color: '#4aa15d',
  },
  submitButtonTitle: {
    color: 'white',
  },
});
