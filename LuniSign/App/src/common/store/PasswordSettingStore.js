import {action, computed, observable} from 'mobx';
import {trimBlankSpace} from '../function/StringUtil';

class PasswordSettingStore {
  @observable passwordInput = '';
  @observable passwordConfirmInput = '';

  @observable isChecked = false;
  @observable isValidateSubmit = true;
  @observable isPasswordInputValidate = false;
  @observable isPasswordConfirmInputValidate = false;
  @observable isVisiblePasswordHelpModal = false;

  @computed get isPasswordLengthValidate() {
    return this.passwordInput.length >= 8 && this.passwordInput.length <= 16;
  }

  @computed get isPasswordRegValidate() {
    const reg = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return this.isPasswordLengthValidate && reg.test(this.passwordInput);
  }

  @computed get isPasswordConfirmValidate() {
    return (
      this.isPasswordRegValidate &&
      this.passwordInput === this.passwordConfirmInput
    );
  }

  @action setIsValidateSubmitFalse = () => {
    this.isValidateSubmit = false;
  };

  @action togglePasswordHelpModal = () => {
    this.isVisiblePasswordHelpModal = !this.isVisiblePasswordHelpModal;
  };

  @action handleChangePassword = input => {
    this.passwordInput = trimBlankSpace(input);
  };

  @action handleChangePasswordConfirm = input => {
    this.passwordConfirmInput = trimBlankSpace(input);
  };

  @action handlePressCheckbox = () => {
    this.isChecked = !this.isChecked;
    this.isValidateSubmit = false;
    if (this.isChecked === false) {
      this.reset();
    }
  };

  @action handleBlurInput = () => {
    this.isValidateSubmit =
      this.isChecked &&
      this.isPasswordLengthValidate === true &&
      this.isPasswordRegValidate === true &&
      this.isPasswordConfirmValidate === true;
  };

  @action reset = () => {
    this.passwordInput = '';
    this.passwordConfirmInput = '';

    this.isChecked = false;
    this.isValidateSubmit = true;
    this.isPasswordInputValidate = false;
    this.isPasswordConfirmInputValidate = false;
  };
}

export default PasswordSettingStore;
