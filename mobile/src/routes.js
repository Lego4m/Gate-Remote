import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="New" component={New} />
        <AppStack.Screen name="Edit" component={Edit} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
