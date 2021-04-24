import React from 'react';
import { useTheme } from 'styled-components';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

import { Spacer } from '../../components/ui/spacer';
import { ChatHomeScreen } from '../../screens/app/chat/home.screen';
import { ChatConversationScreen } from '../../screens/app/chat/conversation.screen';

const ChatStack = createStackNavigator();

export const ChatNavigator = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatHome"
        component={ChatHomeScreen}
        options={{
          title: 'Conversations',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
      <ChatStack.Screen
        name="ChatConversation"
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
        component={ChatConversationScreen}
      />
    </ChatStack.Navigator>
  );
};
