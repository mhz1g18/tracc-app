
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AppContainer from './src/containers/AppContainer'
import ProvideAuth from './src/auth/ProvideAuth'



const App = () => {

  return (
   <NavigationContainer>
     <ProvideAuth>
      <AppContainer/>
     </ProvideAuth>
   </NavigationContainer>
  );
};



export default App;
