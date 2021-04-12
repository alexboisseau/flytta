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

export const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [birthdayDate, setBirthdayDate] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  return (
    <GuestBackground>
      <SafeArea>
        <AuthContainer>
          <Spacer position="top" size="xl">
            <Text center color="white">
              Rejoignez une communauté de sportifs sur Flytta
            </Text>
          </Spacer>
          <Spacer position="top" size="xl">
            <AuthInput
              autoCapitalize="none"
              value={firstName}
              keyboardType="default"
              textContentType="name"
              onChangeText={(value) => setFirstName(value)}
              placeholder="Prénom"
            />
            <Spacer size="lg">
              <AuthInput
                autoCapitalize="none"
                value={lastName}
                keyboardType="default"
                textContentType="familyName"
                onChangeText={(value) => setLastName(value)}
                placeholder="Nom"
              />
            </Spacer>
            <Spacer size="lg">
              <AuthInput
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={(value) => setEmail(value)}
                placeholder="Email"
              />
            </Spacer>
            <Spacer size="lg">
              <AuthInput
                autoCapitalize="none"
                value={city}
                keyboardType="default"
                textContentType="addressCity"
                onChangeText={(value) => setCity(value)}
                placeholder="Ville"
              />
            </Spacer>
            <Spacer size="lg">
              <AuthInput
                autoCapitalize="none"
                value={birthdayDate}
                keyboardType="default"
                textContentType="none"
                onChangeText={(value) => setBirthdayDate(value)}
                placeholder="Date de naissance"
              />
            </Spacer>
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
            <Spacer size="lg">
              <AuthInput
                autoCapitalize="none"
                value={repeatedPassword}
                textContentType="password"
                onChangeText={(value) => setRepeatedPassword(value)}
                secureTextEntry
                placeholder="Retapez votre mot de passe"
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
          <Spacer position="top" size="xl">
            <AuthButton
              color="primaryLight"
              onPress={() =>
                onRegister(
                  firstName,
                  lastName,
                  city,
                  birthdayDate,
                  email,
                  password,
                  repeatedPassword
                )
              }
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <AuthButtonText color="white">S'inscrire</AuthButtonText>
              )}
            </AuthButton>
          </Spacer>
        </AuthContainer>
      </SafeArea>
    </GuestBackground>
  );
};
