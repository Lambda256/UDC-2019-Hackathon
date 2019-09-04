import React from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';
import {inject, observer} from 'mobx-react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/EvilIcons';
import LineSeparator from '../../common/component/LineSeparator';
import TimestampToDatetime from '../../common/function/TimestampToDatetime';
import DefaultColors from '../../common/style/DefaultColors';
import messageProvider from '../../common/MessageProvider';
import styled from 'styled-components';
const {width} = Dimensions.get('window');

const TransactionModalComponent = ({assetDetailStore, navigation}) => {
  const store = assetDetailStore;
  const props = navigation.state.params;
  return (
    <Modal isVisible={store.isVisibleTransactionModal}>
      <Container>
        <CloseButton>
          <TouchableOpacity onPress={() => store.closeModal()}>
            <Icon name="close" size={25} color="#bbb" />
          </TouchableOpacity>
        </CloseButton>
        {store.transactionModal.isSend ? (
          <Header>
            <Icon name="arrow-up" size={50} color="#6B7EBF" />
            <HeaderText>{messageProvider.asset.send_breakdown}</HeaderText>
          </Header>
        ) : (
          <Header>
            <Icon name="arrow-down" size={50} color="#65BF77" />
            <HeaderText>{messageProvider.asset.receive_breakdown}</HeaderText>
          </Header>
        )}
        <LineSeparator />
        <Content>
          <DetailContainer>
            <DetailTitle>
              <DetailTitleText>
                {messageProvider.asset.send_address}
              </DetailTitleText>
            </DetailTitle>
            <DescContainer>
              <DescText>{store.transactionModal.toAddress}</DescText>
            </DescContainer>
          </DetailContainer>
          <DetailContainer>
            <DetailTitle>
              <DetailTitleText>
                {messageProvider.asset.receive_address}
              </DetailTitleText>
            </DetailTitle>
            <DescContainer>
              <DescText>{store.transactionModal.fromAddress}</DescText>
            </DescContainer>
          </DetailContainer>
          <DetailContainer>
            <DetailTitle>
              <DetailTitleText>
                {messageProvider.asset.transaction_amount}
              </DetailTitleText>
            </DetailTitle>
            <DescContainer>
              <DescText>
                {store.transactionModal.amount} {props.symbol}
              </DescText>
            </DescContainer>
          </DetailContainer>
          <DetailContainer>
            <DetailTitle>
              <DetailTitleText>{messageProvider.asset.fee}</DetailTitleText>
            </DetailTitle>
            <DescContainer>
              <DescText>
                {store.transactionModal.fee} {props.symbol}
              </DescText>
            </DescContainer>
          </DetailContainer>
          {!store.transactionModal.isPending && (
            <DetailContainer style={{marginBottom: 0}}>
              <DetailTitle>
                <DetailTitleText>
                  {messageProvider.asset.transaction_time}
                </DetailTitleText>
              </DetailTitle>
              <DescContainer>
                <DescText>
                  {TimestampToDatetime(store.transactionModal.timestamp)}
                </DescText>
              </DescContainer>
            </DetailContainer>
          )}
        </Content>
        <LineSeparator />
        <Footer>
          {props.code === 'BITCOIN' ? (
            <TouchableOpacity onPress={store.searchBitcoinTransaction}>
              <HyperlinkText style={{color: DefaultColors.mainColorToneDown}}>
                {messageProvider.asset.search_bitcoin_transaction}
              </HyperlinkText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={store.searchEtherscanTransaction}>
              <HyperlinkText style={{color: DefaultColors.mainColorToneDown}}>
                {messageProvider.asset.search_ethereum_transaction}
              </HyperlinkText>
            </TouchableOpacity>
          )}
        </Footer>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  flex: 0;
  background-color: white;
  padding: 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
  width: ${width * 0.8}px;
  height: 350px;
`;

const CloseButton = styled.View`
  align-self: flex-end;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const HeaderText = styled.View`
  font-size: 15px;
  margin-top: 10px;
  color: #474747;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 15px;
  justify-content: center;
`;

const DetailContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DetailTitle = styled.View`
  width: 30%;
`;

const DetailTitleText = styled.Text`
  font-size: 13px;
  color: #474747;
`;

const DescContainer = styled.View`
  width: 70%;
  align-items: flex-end;
`;

const DescText = styled.Text`
  font-size: 12px;
  color: #757575;
`;

const Footer = styled.View`
  margin-top: 10px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

const HyperlinkText = styled.Text`
  font-size: 11;
`;

export default inject('assetDetailStore')(observer(TransactionModalComponent));
