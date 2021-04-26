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
                    {conversation.lastMessage &&
                      `${conversation.lastMessage.slice(0, 25)}...`}
                  </Text>
                </Spacer>
              </View>
            </Spacer>
          </ConversationCardAvatarWrapper>
          <Text>
            {new Date(conversation.lastSend.seconds * 1000).getHours() < 10
              ? `0${new Date(conversation.lastSend.seconds * 1000).getHours()}`
              : new Date(conversation.lastSend.seconds * 1000).getHours()}
            :
            {new Date(conversation.lastSend.seconds * 1000).getMinutes() < 10
              ? `0${new Date(
                  conversation.lastSend.seconds * 1000
                ).getMinutes()}`
              : new Date(conversation.lastSend.seconds * 1000).getMinutes()}
          </Text>
        </ConversationCardWrapper>
      </ConversationCardContainer>
      <Separator />
    </>
  );
};
