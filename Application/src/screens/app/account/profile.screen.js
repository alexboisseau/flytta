import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utility/safe-area';

export const ProfileScreen = ({ navigation }) => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <TouchableOpacity onPress={onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeArea>
  );
};
