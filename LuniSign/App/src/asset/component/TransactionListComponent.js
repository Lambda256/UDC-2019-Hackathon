import React from 'react';
import {FlatList, View} from 'react-native';
import TransactionItemComponent from './TransactionItemComponent';
import {Text} from 'react-native-elements';
import messageProvider from '../../common/MessageProvider';
import styled from 'styled-components';

const TransactionListComponent = () => {
  const renderTransaction = transaction => {
    return (
      <TransactionItemComponent
        {...transaction.item}
        onPress={this.props.onPress}
      />
    );
  };

  const renderEmptyTransaction = () => {
    return (
      <EmptyContainer>
        <Text>{messageProvider.asset.transactions_empty}</Text>
      </EmptyContainer>
    );
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <View>
      <FlatList
        data={this.props.transactionList}
        showsVerticalScrollIndicator={false}
        renderItem={renderTransaction}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={renderEmptyTransaction}
      />
    </View>
  );
};

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  height: 200px;
  margin-top: 50px;
`;

export default TransactionListComponent;
