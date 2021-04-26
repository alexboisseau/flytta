import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export const SpinnerView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const Spinner = () => (
  <SpinnerView>
    <ActivityIndicator size="large" />
  </SpinnerView>
);
