import React from 'react';
import * as firebase from 'firebase';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { Navigation } from './src/infrastructure/navigation';

import { theme } from './src/infrastructure/theme';
import {
  useFonts,
  RobotoSlab_400Regular,
} from '@expo-google-fonts/roboto-slab';

const firebaseConfig = {
  apiKey: 'AIzaSyA6tHLZ8KZOFjVNFfzwBL4JAmYTZa6lhbQ',
  authDomain: 'mon-projet-test-5146e.firebaseapp.com',
  projectId: 'mon-projet-test-5146e',
  storageBucket: 'mon-projet-test-5146e.appspot.com',
  messagingSenderId: '385213710178',
  appId: '1:385213710178:web:70e4dcbc120d85cf6a763b',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
