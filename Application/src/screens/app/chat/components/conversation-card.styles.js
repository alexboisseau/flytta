import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const ConversationCardContainer = styled.View`
  background-color: white;
  padding: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ConversationCardWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ConversationCardAvatarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Bubble = styled.View`
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) =>
    props.orange ? props.theme.colors.primary : 'white'};
  max-width: 80%;
  align-self: ${(props) => (props.orange ? 'flex-end' : 'flex-start')};
`;

export const MessagesList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 10,
  },
})``;

export const ChatInputWrapper = styled.View`
  margin-left: 10px;
  margin-right: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ChatInput = styled.TextInput`
  width: 90%;
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 10px;
  padding: 10px;
`;
