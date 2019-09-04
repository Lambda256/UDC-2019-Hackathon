import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../style/PasswordSettingComponent.style';
import messageProvider from '../MessageProvider';
import PasswordValidateType from '../PasswordValidateType';
import PasswordHelpModal from './PasswordHelpModal';
import styled from 'styled-components';
import DefaultColors from '../style/DefaultColors';

class PasswordSettingComponent extends React.Component {
  componentWillUnmount() {
    this.props.passwordSettingStore.reset();
  }

  renderValidateAlert = ({validateName, warningMessage}) => {
    const store = this.props.passwordSettingStore;
    return (
      <Text
        key={validateName}
        style={[
          styles.validationAlertText,
          styles[store[validateName] ? 'validateText' : ''],
        ]}>
        {`${warningMessage} `}
        {store[validateName] && (
          <Icon
            name={'check'}
            size={13}
            color={DefaultColors.mainColorToneUp}
          />
        )}
      </Text>
    );
  };

  render() {
    const store = this.props.passwordSettingStore;
    return (
      <>
        <View style={styles.headerContainer}>
          <CheckBox
            title={messageProvider.common.password_setting_title}
            onPress={store.handlePressCheckbox}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkboxText}
            checked={store.isChecked}
            size={20}
            checkedColor="#465D7F"
          />
          <TouchableOpacity
            style={styles.descContainer}
            onPress={store.togglePasswordHelpModal}>
            <Icon name={'help-circle'} size={25} color={'#919191'} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.passwordWrapper}>
            <View
              style={[
                styles.passwordRow,
                styles[store.isChecked ? '' : 'editable'],
              ]}>
              <Icon name={'lock'} size={20} color={'#c1c1c1'} />
              <TextInput
                placeholder={messageProvider.common.enter_password}
                value={store.passwordInput}
                onChangeText={store.handleChangePassword}
                onBlur={store.handleBlurInput}
                secureTextEntry={true}
                editable={store.isChecked}
                style={styles.passwordInput}
              />
            </View>
            <View
              style={[
                styles.passwordRow,
                styles[store.isChecked ? '' : 'editable'],
                styles.lastPasswordInput,
              ]}>
              <Icon name={'lock-alert'} size={20} color={'#c1c1c1'} />
              <TextInput
                placeholder={messageProvider.common.enter_confirm_password}
                value={store.passwordConfirmInput}
                onChangeText={store.handleChangePasswordConfirm}
                onBlur={store.handleBlurInput}
                secureTextEntry={true}
                editable={store.isChecked}
                style={styles.passwordInput}
              />
            </View>
          </View>
        </View>
        <View style={styles.validationAlertContainer}>
          {PasswordValidateType.map(validate =>
            this.renderValidateAlert(validate),
          )}
        </View>
        <PasswordHelpModal
          isVisible={store.isVisiblePasswordHelpModal}
          onPress={store.togglePasswordHelpModal}
        />
      </>
    );
  }
}

export default inject('passwordSettingStore')(
  observer(PasswordSettingComponent),
);
