import styled from 'styled-components/native';

const defaultTextStyles = (theme) => `
  font-weight: ${theme.fontWeights.base};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const base = (theme) => `
  font-size: ${theme.fontSizes.base};
`;

const white = (theme) => `
  color: ${theme.colors.white};
`;

const variants = { base, white };

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ color, theme }) => variants[color](theme)}
  ${({ center }) => center && 'text-align: center;'}
  ${({ right }) => right && 'text-align: right;'}
`;

Text.defaultProps = {
  color: 'base',
};
