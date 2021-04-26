import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { Spacer } from '../../../components/ui/spacer';
import {
  Bubble,
  ChatInput,
  ChatInputWrapper,
  MessagesList,
} from './components/conversation-card.styles';
import { Text } from '../../../components/ui/text';
import { SafeArea } from '../../../components/utility/safe-area';
import {
  getMessages,
  postMessage,
} from '../../../services/conversations/conversations.service';

export const ChatConversationScreen = ({ route }) => {
  const { conversation } = route.params;
  const { user } = useContext(AuthenticationContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const allMessages = await getMessages(conversation.id);
      setMessages(allMessages.sort((a, b) => a.send - b.send));
    } catch (e) {
      console.error(e);
    }
  };

  const onSendMessage = async () => {
    try {
      await postMessage(conversation, message, conversation.recipient.userId);
      setMessage('');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <SafeArea>
      <MessagesList
        data={messages}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="md">
            <Bubble orange={user.uid === item.sender.userId ? true : false}>
              <Text color={user.uid === item.sender.userId ? 'white' : ''} bold>
                {item.sender.firstName}
              </Text>
              <Text color={user.uid === item.sender.userId ? 'white' : ''}>
                {item.content}
              </Text>
            </Bubble>
          </Spacer>
        )}
        keyExtractor={(item) => item.id}
      />
      <ChatInputWrapper>
        <ChatInput
          autoCapitalize="none"
          value={message}
          keyboardType="default"
          onChangeText={(value) => setMessage(value)}
          placeholder="Ecrivez votre message..."
        />
        <TouchableOpacity onPress={onSendMessage}>
          <Ionicons name="ios-send" size={24} color="#fc9e39" />
        </TouchableOpacity>
      </ChatInputWrapper>
    </SafeArea>
  );
};
