import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../../screens/guest/login.screen';
import { RegisterScreen } from '../../screens/guest/register.screen';

const GuestStack = createStackNavigator();

export const GuestNavigator = () => {
  return (
    <GuestStack.Navigator headerMode="none">
      <GuestStack.Screen name="Login" component={LoginScreen} />
      <GuestStack.Screen name="Register" component={RegisterScreen} />
    </GuestStack.Navigator>
  );
};
