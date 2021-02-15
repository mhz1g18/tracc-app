
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AppContainer from './src/containers/AppContainer'
import ProvideAuth from './src/auth/ProvideAuth'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { Provider } from 'react-redux';
import store from './src/redux/store/store';



const App = () => {

  return (
      <Provider store={store}>
        <NavigationContainer>
          <AppContainer/>
        </NavigationContainer>
      </Provider>
  );
};



export default App;
