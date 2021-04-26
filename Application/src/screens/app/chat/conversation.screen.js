import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { Bubble } from './components/conversation-card.styles';
import { Text } from '../../../components/ui/text';
import { SafeArea } from '../../../components/utility/safe-area';
import { getMessages } from '../../../services/conversations/conversations.service';

export const ChatConversationScreen = ({ route }) => {
  const { conversation } = route.params;
  const { user } = useContext(AuthenticationContext);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const allMessages = await getMessages(conversation.id);
      setMessages(allMessages);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <SafeArea>
      {messages.map((message) => {
        return (
          <Bubble orange={user.uid === message.sender.userId ? true : false}>
            <Text bold>{message.sender.firstName}</Text>
            <Text>{message.content}</Text>
          </Bubble>
        );
      })}
    </SafeArea>
  );
};
