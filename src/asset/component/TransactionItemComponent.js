import React from 'react';
import {View} from 'react-native';
import {NumberWithCommas} from '../../common/function/NumberUtil';
import {inject, observer} from 'mobx-react';
import TimestampToDatetime from '../../common/function/TimestampToDatetime';
import LineSeparator from '../../common/component/LineSeparator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import messageProvider from '../../common/MessageProvider';
// import styles from '../style/TransactionComponent.style';
import styled from 'styled-components';

const TransactionItemComponent = ({}) => {
  const store = this.props.isSend
    ? this.props.assetDetailStore.sendTransactionModalOption
    : this.props.assetDetailStore.receiveTransactionModalOption;
  const isBitcoinPending =
    this.props.confirmations !== undefined &&
    this.props.confirmations.toString() === '0';
  const hideAddress = s => s.slice(0, 10) + '...' + s.slice(-11, -1);

  return (
    <View>
      <Container onPress={() => this.props.onPress(this.props.txid)}>
        <LeftContainer>
          <Icon
            name={store.iconName}
            size={25}
            color={store.transactionColor}
          />
          <TitleContainer>
            <TransactionId>
              {hideAddress(
                this.props.isSend
                  ? this.props.toAddress
                  : this.props.fromAddress,
              ) +
                (!this.props.isSend && this.props.code === 'BITCOIN'
                  ? ' 외 ' + this.props.fromMore
                  : '')}
            </TransactionId>
            {!isBitcoinPending && !this.props.isPending && (
              <Timestamp>{TimestampToDatetime(this.props.timestamp)}</Timestamp>
            )}
          </TitleContainer>
        </LeftContainer>
        <RightContainer>
          {(isBitcoinPending || this.props.isPending) && (
            <PendingContainer>
              <Icon name={'progress-clock'} size={15} color={'#959595'} />
              <Pending> {messageProvider.asset.processing}</Pending>
            </PendingContainer>
          )}
          <BalanceContainer>
            <Balance style={{color: store.transactionColor}}>
              {store.transactionOperator +
                ' ' +
                NumberWithCommas(this.props.amount, 5)}
            </Balance>
            <Unit>{this.props.assetDetailStore.assetInfo.symbol}</Unit>
          </BalanceContainer>
        </RightContainer>
      </Container>
      <LineSeparator />
    </View>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60;
`;
const LeftContainer = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  padding: 10;
`;
const RightContainer = styled.View`
  flex-direction: column;
  align-items: flex-end;
  padding: 10;
`;
const TitleContainer = styled.View`
  flex-direction: column;
  margin-horizontal: 10;
`;
const TransactionId = styled.Text`
  color: #474747;
  font-size: 12;
`;
const Timestamp = styled.Text`
  color: #707070;
  font-size: 11;
`;
const PendingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Pending = styled.Text`
  font-size: 12;
`;
const BalanceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Balance = styled.Text`
  font-size: 13;
`;
const Unit = styled.Text`
  font-size: 11;
  color: #868686;
`;

export default inject('assetDetailStore')(observer(TransactionItemComponent));
