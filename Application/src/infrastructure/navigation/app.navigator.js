import React, { useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

const AppStack = createStackNavigator();

export const AppNavigator = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen
        name="Home"
        component={() => (
          <SafeAreaView>
            <TouchableOpacity onPress={onLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      />
    </AppStack.Navigator>
  );
};
