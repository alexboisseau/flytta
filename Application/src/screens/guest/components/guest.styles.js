import styled from 'styled-components/native';

export const GuestBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const AuthContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
`;

export const AppTitle = styled.Text`
  position: absolute;
  text-align: center;
  width: 100%;
  top: 100px;
  font-family: ${(props) => props.theme.fonts.roboto};
  font-size: ${(props) => props.theme.fontSizes.xxxxl};
  color: ${(props) => props.theme.colors.white};
`;

export const AuthInput = styled.TextInput.attrs({
  placeholderTextColor: 'gray',
})`
  width: 300px;
  border-radius: 3px;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const AuthButton = styled.TouchableOpacity.attrs({ activeOpacity: 0.6 })`
  width: 300px;
  padding: 15px;
  align-items: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors[props.color || 'base']};
`;

export const AuthButtonText = styled.Text`
  color: ${(props) => props.theme.colors[props.color || 'base']};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const Separator = styled.View`
  width: 300px;
  height: 1px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const SeparatorBlack = styled.View`
  width: 300px;
  height: 1px;
  background-color: #000;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
`;
