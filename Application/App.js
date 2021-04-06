import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { Navigation } from './src/infrastructure/navigation';

import { theme } from './src/infrastructure/theme';
import {
  useFonts,
  RobotoSlab_400Regular,
} from '@expo-google-fonts/roboto-slab';

export default function App() {
  const [robotoSlabLoaded] = useFonts({ RobotoSlab_400Regular });

  if (!robotoSlabLoaded) return null;

  return (
    <>
      <StatusBar style="auto" />
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}
