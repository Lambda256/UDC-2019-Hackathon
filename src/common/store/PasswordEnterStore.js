import {action, computed, observable} from 'mobx';
import {trimBlankSpace} from '../function/StringUtil';

class PasswordEnterStore {
  @observable passwordInput = '';
  @observable isLoading = false;
  @observable isShowErrorMessage = false;

  @action setIsLoadingTrue = async () => (this.isLoading = true);
  @action setIsLoadingFalse = async () => (this.isLoading = false);
  @action setErrorMessageShow = () => (this.isShowErrorMessage = true);
  @action setErrorMessageHide = () => (this.isShowErrorMessage = false);
  @action handleChangePassword = input =>
    (this.passwordInput = trimBlankSpace(input));

  @computed get isValidatePasswordSubmit() {
    return this.passwordInput !== '';
  }

  @action reset = () => {
    this.passwordInput = '';
    this.isLoading = false;
    this.isShowErrorMessage = false;
  };
}

export default PasswordEnterStore;
