import {StyleSheet, Platform} from 'react-native';
import DefaultColors from './DefaultColors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
  },
  settingContainer: {
    width: '100%',
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  communityContainer: {
    width: '100%',
    height: Platform.OS === 'ios' ? 40 : 35,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  settingTitleContainer: {
    flex: 1,
  },
  settingTitle: {
    color: '#474747',
  },
  settingBar: {
    height: 45,
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 7,
  },
  settingIconContainer: {
    width: 35,
    marginLeft: 0,
    marginRight: 8,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityTitle: {
    fontSize: 12,
  },
  modalContainer: {
    flex: 0,
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  writeIcon: {
    width: 40,
    height: 40,
  },
  modalTitle: {
    color: '#414141',
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
  },
  mnemonicWords: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap', // 줄바꿈
  },
  mnemonicWordContainer: {
    marginRight: 10,
    marginBottom: 10,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10,

    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  mnemonicWord: {
    textAlign: 'center',
    color: '#2a2a2a',
    fontSize: 17,
    fontWeight: 'bold',
  },
  descriptionTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 3,
  },
  descriptionContent: {
    fontSize: 11,
    color: '#2a2a2a',
  },
  buttons: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    padding: 15,
    height: 55,
    marginVertical: 0,
    borderRadius: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
    backgroundColor: DefaultColors.mainColorToneDown,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  footerContainer: {
    width: '100%',
    marginVertical: 20,
    alignItems: 'center',
  },
  versionText: {
    marginRight: 10,
  },
});
