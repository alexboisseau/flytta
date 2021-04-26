import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

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
import { getUserRequest } from '../../../services/authentication/authentication.service';
import { createConversation } from '../../../services/conversations/conversations.service';

export const ProfileScreen = ({ navigation, route }) => {
  const { user, onLogout } = useContext(AuthenticationContext);
  const userId = route.params ? route.params.userId : user.uid;
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const uData = await getUserRequest(userId);
      if (uData.exists) {
        setUserData({ ...uData.data() });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onNewMessage = async () => {
    try {
      await createConversation(userData.userId.trim());
      navigation.navigate('Messages', { screen: 'ChatHome' });
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [user])
  );

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
                  <ButtonEditOutline onPress={onNewMessage}>
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
