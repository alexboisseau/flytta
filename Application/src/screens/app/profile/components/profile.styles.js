import styled from 'styled-components/native';

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: 16px;
`;

export const Avatar = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 9999px;
`;

export const ButtonsWrapper = styled.View`
  flex-direction: row;
`;

export const ButtonEditOutline = styled.TouchableOpacity`
  border: 2px ${(props) => props.theme.colors.blue} solid;
  border-radius: 3px;
  padding: 5px 10px 5px 10px;
`;
export const ButtonLogoutOutline = styled.TouchableOpacity`
  border: 2px ${(props) => props.theme.colors.red} solid;
  border-radius: 3px;
  padding: 5px 10px 5px 10px;
`;
