import {StyleSheet, Dimensions} from 'react-native';
import DefaultColors from '../../common/style/DefaultColors';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'white',
    backgroundColor: '#f9f9f9',
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descContainer: {
    paddingRight: 25,
  },
  checkBoxContainer: {
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 15,
    fontWeight: '400',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  editable: {
    backgroundColor: '#efefef',
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 15,
  },
  lastPasswordInput: {
    borderBottomWidth: 0,
  },
  validationAlertContainer: {
    flex: 1,
    paddingTop: 13,
    paddingLeft: 20,
    width: '100%',
  },
  validationAlertText: {
    fontSize: 12,
  },
  submitContainer: {
    width: width - 30,
    marginBottom: 15,
  },
  submitButton: {
    width: '100%',
    height: 55,
    borderRadius: 25,
    backgroundColor: '#bfbfbf',
  },
  validateText: {
    color: '#4aa15d',
  },
  submitButtonTitle: {
    color: 'white',
  },
});
