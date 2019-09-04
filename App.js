/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'mobx-react';
import NavigationService from './src/config/nav/NavigationService';
import stores from './src/config/store/RootStore.js';
import AppContainer from './src/config/nav/AppContainer';

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider {...stores}>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};
export default App;
