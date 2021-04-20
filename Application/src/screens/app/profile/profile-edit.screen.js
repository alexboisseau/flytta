import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { SafeArea } from '../../../components/utility/safe-area';
import { Spacer } from '../../../components/ui/spacer';
import {
  AuthContainer,
  AuthInput,
  AuthButton,
  AuthButtonText,
  ErrorContainer,
  SeparatorBlack,
} from '../../guest/components/guest.styles';
import { Text } from '../../../components/ui/text';
import {
  getUserRequest,
  updateUserAvatarRequest,
} from '../../../services/authentication/authentication.service';
import { Avatar, ScrollViewContainer } from './components/profile.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProfileEditScreen = ({ navigation }) => {
  const { user, error, isLoading, onUpdateProfile } = useContext(
    AuthenticationContext
  );

  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const uData = await getUserRequest(user.uid);
        if (uData.exists) {
          const newUser = uData.data();
          setUserData(newUser);
          setFirstName(newUser.firstName);
          setLastName(newUser.lastName);
          setDescription(newUser.description);
          setCity(newUser.city);
          setEmail(newUser.email);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, [user]);

  return (
    <SafeArea>
      <ScrollViewContainer>
        <TouchableOpacity onPress={pickImage}>
          <Avatar
            source={require('../../../../assets/user-avatar-default.png')}
          />
        </TouchableOpacity>
        <AuthContainer>
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
                value={description}
                keyboardType="default"
                textContentType="none"
                onChangeText={(value) => setDescription(value)}
                placeholder="Description"
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
            <SeparatorBlack />
          </Spacer>
          <Spacer position="top" size="xl">
            <AuthButton
              color="primaryLight"
              onPress={() =>
                onUpdateProfile(
                  userData,
                  firstName,
                  lastName,
                  email,
                  city,
                  description,
                  image
                )
              }
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <AuthButtonText color="white">Modifier</AuthButtonText>
              )}
            </AuthButton>
          </Spacer>
        </AuthContainer>
      </ScrollViewContainer>
    </SafeArea>
  );
};
