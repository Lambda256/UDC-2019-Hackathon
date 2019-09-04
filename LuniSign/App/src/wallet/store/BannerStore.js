import {action, observable} from 'mobx';
import {asyncAction} from 'mobx-utils';
// import {findBannerByCode} from "../repository/BannerRepository";
import FastImage from 'react-native-fast-image';
import openBrowser from '../../common/function/LinkUtil';

class BannerStore {
  @observable id = '';
  @observable code = '';
  @observable url = '';
  @observable linkUrl = '';

  @action bannerClick = () => openBrowser(this.linkUrl);

  @asyncAction async *updateBannerInfo(accessToken, where) {
    // const response = yield findBannerByCode(accessToken, where);
    // const data = yield response.json();
    // yield this.setBannerInfo(data);
    // this.preloadBanner();
  }

  @action setBannerInfo = async ({id, code, url, linkUrl}) => {
    this.id = id;
    this.code = code;
    this.url = url;
    this.linkUrl = linkUrl;
  };

  @action preloadBanner() {
    FastImage.preload([
      {
        uri: this.url,
      },
    ]);
  }
}

export default BannerStore;
