import React, {PureComponent} from 'react';
import styles from '../style/ModalStyles';
import {Text, View} from 'react-native';

class MnemonicWordsComponent extends PureComponent {
  render() {
    return this.props.mnemonicWords.map((word, i) => {
      return (
        <View style={styles.mnemonicWordContainer} key={i}>
          <Text style={styles.mnemonicWord}>{word}</Text>
        </View>
      );
    });
  }
}

export default MnemonicWordsComponent;
