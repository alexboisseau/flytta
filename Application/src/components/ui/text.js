import styled from 'styled-components/native';

const defaultTextStyles = (theme) => `
  font-weight: ${theme.fontWeights.base};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ color, theme }) => `color: ${theme.colors[color]};`}
  ${({ center }) => center && 'text-align: center;'}
  ${({ right }) => right && 'text-align: right;'}
  ${({ sm, theme }) => sm && `font-size: ${theme.fontSizes.sm}`}
  ${({ lg, theme }) => lg && `font-size: ${theme.fontSizes.lg}`}
  ${({ bold, theme }) => bold && `font-weight: ${theme.fontWeights.bold};`}
`;

Text.defaultProps = {
  color: 'base',
};
