import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';
import DefaultColors from '../common/style/DefaultColors';
import messageProvider from '../common/MessageProvider';
import LineSeparator from '../common/component/LineSeparator';
import SettingTitleComponent from './component/SettingTitleComponent';
import TouchableSettingRowComponent from './component/TouchableSettingRowComponent';
import MnemonicBackupModal from '../common/component/MnemonicBackupModal';

const SettingPage = ({navigate, walletStore, settingStore}) => {
  useEffect(() => {
    settingStore.setSeedPhrase(walletStore);
    return () => {};
  }, [settingStore, walletStore]);

  return (
    <Container>
      <ScrollView>
        <SettingTitleComponent
          title={messageProvider.setting.security_and_auth}
        />
        <LineSeparator />
        <TouchableSettingRowComponent
          iconName="content-duplicate"
          title={messageProvider.setting.mnemonic_backup}
          onPress={settingStore.popModal}
        />
        <LineSeparator />
        <SettingTitleComponent
          title={messageProvider.setting.service_overview}
        />
        <LineSeparator />
        <TouchableSettingRowComponent
          iconName="bullhorn"
          title={messageProvider.setting.notice}
          // onPress={() => navigate({routeName: 'NoticePage'})}
        />
        <LineSeparator />
        <TouchableSettingRowComponent
          iconName="comment-question-outline"
          title={messageProvider.setting.faq}
          // onPress={() => navigate({routeName: 'FAQPage'})}
        />
        <LineSeparator />
        <MnemonicBackupModal parentStore={settingStore} />
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
	flex: 1;
	background-color: white; // ${DefaultColors.mainColor};
`;

export default inject('walletStore', 'memberInfoFormStore', 'settingStore')(
  observer(SettingPage),
);
