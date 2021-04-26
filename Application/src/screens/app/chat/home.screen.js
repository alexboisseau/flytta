import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { SafeArea } from '../../../components/utility/safe-area';
import { getConversations } from '../../../services/conversations/conversations.service';
import { ConversationCard } from './components/conversation-card.component';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from '../../../components/ui/text';
import { CenterView } from './components/conversation-card.styles';

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

  useFocusEffect(
    useCallback(() => {
      fetchConversations();
    }, [])
  );

  return (
    <SafeArea>
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ChatConversation', {
                    conversation: item,
                  })
                }
              >
                <ConversationCard conversation={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(conversation) => conversation.id}
        />
      ) : (
        <CenterView>
          <Text>Aucun message</Text>
        </CenterView>
      )}
    </SafeArea>
  );
};
