import {Dimensions, StyleSheet, Platform} from 'react-native';
import DefaultColors from './DefaultColors';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
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
    backgroundColor: 'transparent',
  },
  checkBoxAgreementContainer: {
    borderWidth: 0,
    margin: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
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
  passwordWrapper: {
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderColor: '#e6e6e6',
  },
  editable: {
    backgroundColor: '#efefef',
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 15,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
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
    paddingTop: 4,
  },
  validateText: {
    color: DefaultColors.mainColorToneUp,
  },

  modalContainer: {
    flex: 0,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: width * 0.8,
    height: 280,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  modalHeader: {
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 15,
    color: '#474747',
    marginTop: 15,
    fontWeight: '400',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDetailText: {
    fontSize: 11,
  },
  modalButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 45,
    marginVertical: 0,
    borderRadius: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: width * 0.8 * 0.9,
    backgroundColor: DefaultColors.mainColorToneDown,
  },
});
