import styled from 'styled-components/native';

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
  padding: 3px;
  background-color: ${(props) =>
    props.orange ? props.theme.colors.primary : 'white'};
`;
