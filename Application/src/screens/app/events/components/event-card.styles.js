import styled from 'styled-components/native';

import { Text } from '../../../../components/ui/text';
import { Ionicons } from '@expo/vector-icons';

export const EventCardContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bgWhite};
  border: 1px rgba(0, 0, 0, 0.1) solid;
  border-radius: 3px;
  padding: 10px 0 10px 0;
`;

export const EventCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const EventCardCategory = styled.View`
  background-color: ${(props) => props.color};
  padding: 5px;
  border-radius: 5px;
`;

export const EventCardCategoryText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const EventCardInfos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
`;

export const EventCardInfosItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EventCardInfosItemIcon = styled(Ionicons)`
  margin-right: 3px;
`;

export const EventCardInfosItemText = styled(Ionicons)`
  color: gray;
`;

export const EventCardInfosDescription = styled(Text)`
  padding: 0 10px 0 10px;
`;

export const EventCardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
`;
