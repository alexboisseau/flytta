import styled from 'styled-components/native';

export const ButtonOrange = styled.TouchableOpacity`
  width: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px 5px 10px 5px;
  font-weight: bold;
`;

export const ButtonGreen = styled.TouchableOpacity`
  width: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.green};
  padding: 10px 5px 10px 5px;
  font-weight: bold;
`;

export const ButtonRed = styled.TouchableOpacity`
  width: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.red};
  padding: 10px 5px 10px 5px;
  font-weight: bold;
`;
