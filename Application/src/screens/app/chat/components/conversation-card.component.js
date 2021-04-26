import React from 'react';

import { Text } from '../../../../components/ui/text';
import { Avatar } from '../../../../components/ui/avatar';
import { Spacer } from '../../../../components/ui/spacer';
import {
  ConversationCardAvatarWrapper,
  ConversationCardContainer,
  ConversationCardWrapper,
  Separator,
} from './conversation-card.styles';
import { View } from 'react-native';

export const ConversationCard = ({ conversation }) => {
  return (
    <>
      <ConversationCardContainer>
        <ConversationCardWrapper>
          <ConversationCardAvatarWrapper>
            <Avatar
              size={40}
              source={
                conversation.recipient.avatar
                  ? { uri: conversation.recipient.avatar }
                  : require('../../../../../assets/user-avatar-default.png')
              }
            />
            <Spacer position="left" size="md">
              <View>
                <Text sm bold>
                  {conversation.recipient.firstName}{' '}
                  {conversation.recipient.lastName}
                </Text>
                <Spacer>
                  <Text xs>
                    {conversation.lastMessage.content.slice(0, 25)}...
                  </Text>
                </Spacer>
              </View>
            </Spacer>
          </ConversationCardAvatarWrapper>
          <Text>
            {new Date(conversation.lastMessage.send.seconds * 1000).getHours()}:
            {new Date(
              conversation.lastMessage.send.seconds * 1000
            ).getSeconds()}
          </Text>
        </ConversationCardWrapper>
      </ConversationCardContainer>
      <Separator />
    </>
  );
};
