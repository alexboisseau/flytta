import React, { useContext, useState } from 'react';
import { Spacer } from '../../components/ui/spacer';
import { Text } from '../../components/ui/text';
import { SafeArea } from '../../components/utility/safe-area';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import {
  AuthButton,
  AuthButtonText,
  AuthContainer,
  AuthInput,
  ErrorContainer,
  GuestBackground,
} from './components/guest.styles';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { onPasswordUpdate } = useContext(AuthenticationContext);

  const handlePasswordResetPress = async () => {
    setError(null);

    try {
      await onPasswordUpdate(email);
      navigation.navigate('Login');
    } catch (e) {
      setError(e.toString());
    }
  };

  return (
    <GuestBackground>
      <SafeArea>
        <AuthContainer>
          <Text color="white" lg bold>
            Mot de passe oublié
          </Text>
          <Spacer position="top" size="xl">
            <AuthInput
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(value) => setEmail(value)}
              placeholder="Votre adresse email"
            />
          </Spacer>
          {error && (
            <Spacer size="xl" position="top">
              <ErrorContainer>
                <Text color="red" bold>
                  {error}
                </Text>
              </ErrorContainer>
            </Spacer>
          )}
          <Spacer position="top" size="xl">
            <AuthButton color="primaryLight" onPress={handlePasswordResetPress}>
              <AuthButtonText color="white">
                Envoyer un mail de récupération
              </AuthButtonText>
            </AuthButton>
          </Spacer>
        </AuthContainer>
      </SafeArea>
    </GuestBackground>
  );
};
