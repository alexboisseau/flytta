import React, { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

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
  ErrorContainer,
} from './components/guest.styles';
import { Text } from '../../components/ui/text';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, isLoading, error, clearError } = useContext(
    AuthenticationContext
  );

  return (
    <GuestBackground>
      <AppTitle>Flytta</AppTitle>
      <SafeArea>
        <AuthContainer>
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
              textContentType="emailAddress"
              onChangeText={(value) => setEmail(value)}
              placeholder="Email"
            />
            <Spacer size="lg">
              <AuthInput
                autoCapitalize="none"
                value={password}
                textContentType="password"
                onChangeText={(value) => setPassword(value)}
                secureTextEntry
                placeholder="Mot de passe"
              />
            </Spacer>
            {error && (
              <Spacer size="lg">
                <ErrorContainer>
                  <Text color="red" bold>
                    {error}
                  </Text>
                </ErrorContainer>
              </Spacer>
            )}
          </Spacer>
          <Spacer position="top" size="xl">
            <Separator />
          </Spacer>
          <Spacer position="top" size="lg">
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text color="white">Mot de passe oublié</Text>
            </TouchableOpacity>
          </Spacer>
          <Spacer position="top" size="lg">
            <AuthButton
              color="primaryLight"
              onPress={() => onLogin(email, password)}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <AuthButtonText color="white">Connexion</AuthButtonText>
              )}
            </AuthButton>
            <Spacer size="lg">
              <AuthButton
                color="white"
                onPress={() => {
                  clearError();
                  navigation.navigate('Register');
                }}
              >
                <AuthButtonText color="primary">Inscription</AuthButtonText>
              </AuthButton>
            </Spacer>
          </Spacer>
        </AuthContainer>
      </SafeArea>
    </GuestBackground>
  );
};
