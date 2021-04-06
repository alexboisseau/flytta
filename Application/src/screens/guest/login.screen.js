import React, { useState } from 'react';

import { SafeArea } from '../../components/utility/safe-area';
import { Spacer } from '../../components/ui/spacer';
import {
  GuestBackground,
  AuthContainer,
  AppTitle,
  AuthInput,
  AuthButton,
  AuthButtonText,
  Separator,
} from './components/guest.styles';
import { Text } from '../../components/ui/text';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <GuestBackground>
      <SafeArea>
        <AuthContainer>
          <AppTitle>Flytta</AppTitle>
          <Spacer position="top" size="xl">
            <Text center color="white">
              Bienvenue sur Flytta
            </Text>
            <Text center color="white">
              Connectez-vous ou inscrivez-vous
            </Text>
          </Spacer>
          <Spacer position="top" size="xl">
            <AuthInput
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
              placeholder="Email"
            />
            <Spacer size="lg">
              <AuthInput
                autoCapitalize="none"
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholder="Mot de passe"
              />
            </Spacer>
          </Spacer>
          <Spacer position="top" size="xl">
            <Separator />
          </Spacer>
          <Spacer position="top" size="xl">
            <AuthButton
              color="primaryLight"
              onPress={() => console.log('pressed!')}
            >
              <AuthButtonText color="white">Connexion</AuthButtonText>
            </AuthButton>
            <Spacer size="lg">
              <AuthButton color="white" onPress={() => console.log('pressed!')}>
                <AuthButtonText color="primary">Inscription</AuthButtonText>
              </AuthButton>
            </Spacer>
          </Spacer>
        </AuthContainer>
      </SafeArea>
    </GuestBackground>
  );
};
