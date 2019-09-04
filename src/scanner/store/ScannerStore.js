import {action, observable} from 'mobx';

class ScannerStore {
  @observable isAuthorized = false;

  @action setIsAuthorizedTrue = () => (this.isAuthorized = true);
  @action setIsAuthorizedFalse = () => (this.isAuthorized = false);
}

export default ScannerStore;
