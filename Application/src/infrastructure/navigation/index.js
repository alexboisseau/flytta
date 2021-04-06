import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { GuestNavigator } from './guest.navigator';

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? null : <GuestNavigator />}
    </NavigationContainer>
  );
};
