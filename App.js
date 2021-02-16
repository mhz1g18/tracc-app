
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppContainer from './src/containers/AppContainer'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { Provider } from 'react-redux';
import store from './src/redux/store/store';



const App = () => {

  return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <AppContainer/>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
  );
};



export default App;
