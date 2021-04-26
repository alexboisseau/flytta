import React from 'react';
import { Button } from 'react-native';
import { useTheme } from 'styled-components';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

import { Spacer } from '../../components/ui/spacer';
import { ProfileScreen } from '../../screens/app/profile/profile.screen';
import { ProfileEditScreen } from '../../screens/app/profile/profile-edit.screen';

const ProfileStack = createStackNavigator();

export const ProfileNavigator = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
      <ProfileStack.Screen
        name="ProfileEdit"
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerLeft: (props) => (
            <Spacer position="left" size="md">
              <HeaderBackButton {...props} />
            </Spacer>
          ),
          headerBackTitleVisible: false,
        }}
        component={ProfileEditScreen}
      />
    </ProfileStack.Navigator>
  );
};
