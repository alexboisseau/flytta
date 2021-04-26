import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { SafeArea } from '../../../components/utility/safe-area';
import { getConversations } from '../../../services/conversations/conversations.service';
import { ConversationCard } from './components/conversation-card.component';
import { FlatList } from 'react-native-gesture-handler';

export const ChatHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    try {
      const allConversations = await getConversations(user.uid);
      setConversations(allConversations);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <SafeArea>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatConversation', { conversation: item })
            }
          >
            <ConversationCard conversation={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(conversation) => conversation.id}
      />
    </SafeArea>
  );
};
