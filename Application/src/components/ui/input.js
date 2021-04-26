import styled from 'styled-components/native';

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'gray',
})`
  width: 100%;
  border-radius: 3px;
  padding: 15px;
  border: 1px rgba(0, 0, 0, 0.1) solid;
  background-color: ${(props) => props.theme.colors.white};
`;

export const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`;
