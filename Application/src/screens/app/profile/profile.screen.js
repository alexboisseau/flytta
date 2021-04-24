import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utility/safe-area';
import {
  ButtonEditOutline,
  ButtonLogoutOutline,
  ButtonsWrapper,
  ScrollViewContainer,
} from './components/profile.styles';
import { Avatar } from '../../../components/ui/avatar';
import { Text } from '../../../components/ui/text';
import { Spacer } from '../../../components/ui/spacer';
import {
  getAvatarUser,
  getUserRequest,
} from '../../../services/authentication/authentication.service';

export const ProfileScreen = ({ navigation, route }) => {
  const { user, onLogout } = useContext(AuthenticationContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const uData = await getUserRequest(user.uid);
        const avatarUser = await getAvatarUser(user.uid).catch((e) =>
          console.log('no avatar')
        );
        if (uData.exists) {
          setUserData({ ...uData.data(), avatar: avatarUser });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, [user]);

  console.log(userData);

  return (
    <SafeArea>
      <ScrollViewContainer>
        <Avatar
          size={150}
          source={
            userData.avatar
              ? { uri: userData.avatar }
              : require('../../../../assets/user-avatar-default.png')
          }
        />
        <Spacer position="top" size="md">
          <Text bold lg>
            {userData.firstName} {userData.lastName}
          </Text>
        </Spacer>
        <Spacer position="top" size="sm">
          <Text center>{userData.description}</Text>
        </Spacer>
        <Spacer position="top" size="lg">
          <ButtonsWrapper>
            {route.params ? (
              <>
                <Spacer position="right" size="md">
                  <ButtonEditOutline
                    onPress={() => navigation.navigate('ProfileEdit')}
                  >
                    <Text color="blue">Message</Text>
                  </ButtonEditOutline>
                </Spacer>
                <ButtonEditOutline onPress={onLogout}>
                  <Text color="blue">Follow</Text>
                </ButtonEditOutline>
              </>
            ) : (
              <>
                <Spacer position="right" size="md">
                  <ButtonEditOutline
                    onPress={() => navigation.navigate('ProfileEdit')}
                  >
                    <Text color="blue">Modifier</Text>
                  </ButtonEditOutline>
                </Spacer>
                <ButtonLogoutOutline onPress={onLogout}>
                  <Text color="red">Déconnexion</Text>
                </ButtonLogoutOutline>
              </>
            )}
          </ButtonsWrapper>
        </Spacer>
      </ScrollViewContainer>
    </SafeArea>
  );
};
