import {Dimensions, StyleSheet, Platform} from 'react-native';
import DefaultColors from '../../common/style/DefaultColors';

const {width} = Dimensions.get('window');

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
  warningContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 35,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  warningText: {
    marginLeft: 10,
    fontSize: 12,
  },
  inputContainer: {
    width: width - 30,
    height: 130,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 10 : 4,
    overflow: 'hidden',
  },
  mnemonicInput: {
    justifyContent: 'flex-start',
    lineHeight: 33,
    textAlignVertical: 'top',
    fontSize: 19,
    paddingHorizontal: 13,
  },

  passwordSubmitContainer: {
    width: width - 30,
    marginBottom: 15,
  },

  submitContainer: {
    flex: 1,
    width: width - 30,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  submitButton: {
    width: '100%',
    height: 55,
    borderRadius: 25,
    backgroundColor: '#bfbfbf',
    overflow: 'hidden',
  },

  submitButtonTitle: {
    color: 'white',
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
    height: 150,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDetailText: {
    fontSize: 13,
    textAlign: 'center',
  },
  modalButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    padding: 10,
    borderRadius: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: width * 0.8 * 0.9,
    backgroundColor: DefaultColors.mainColorToneDown,
  },
  validate: {
    backgroundColor: DefaultColors.mainColorToneDown,
  },
});
