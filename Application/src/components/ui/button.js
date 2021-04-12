import styled from 'styled-components/native';

export const ButtonOrange = styled.TouchableOpacity`
  width: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px 5px 10px 5px;
  font-weight: bold;
`;
