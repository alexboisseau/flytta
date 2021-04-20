import React, { useContext, useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';

import { SafeArea } from '../../../components/utility/safe-area';
import { Spacer } from '../../../components/ui/spacer';
import { Text } from '../../../components/ui/text';
import {
  EventCardCategory,
  EventCardCategoryText,
  EventCardHeader,
  EventCardInfos,
  EventCardInfosItem,
  EventCardInfosItemIcon,
  EventCardInfosItemText,
  Separator,
  EventCardFooter,
  PaddingX,
} from './components/event-card.styles.js';
import {
  ListItemButtonsContainer,
  ListItemContainer,
} from './components/events-show.styles';
import { BgWhite } from '../../../components/ui/bg';
import { ButtonGreen, ButtonRed } from '../../../components/ui/button';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import {
  changeEventStatusRequest,
  handleEventJoinRequest,
} from '../../../services/events/events.service';

import waiting from '../../../../assets/waiting.js';
import { ImageBoxCenter } from '../../../components/ui/image';
import { getUsersByArray } from '../../../services/authentication/authentication.service';
import { Ionicons } from '@expo/vector-icons';

export const EventsShow = ({ navigation, route }) => {
  const { event, redirectScreen } = route.params;
  const { user } = useContext(AuthenticationContext);
  const [membersData, setMembersData] = useState([]);
  const initialEventMembers =
    user.uid === event.creatorId
      ? Object.fromEntries(
          Object.entries(event.members).filter(
            ([key, status]) => status !== 'refused'
          )
        )
      : Object.fromEntries(
          Object.entries(event.members).filter(
            ([key, status]) => status === 'accepted'
          )
        );
  const [eventMembers, setEventMembers] = useState(initialEventMembers);

  const onEventJoin = async () => {
    try {
      await handleEventJoinRequest(event, true);
      navigation.navigate(redirectScreen);
    } catch (e) {
      console.error(e);
    }
  };

  const onEventRemoveJoin = async () => {
    try {
      await handleEventJoinRequest(event, false);
      navigation.navigate(redirectScreen);
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateEvent = (eventToUpdate) => {
    navigation.navigate('EventsUpdate', { eventToUpdate });
  };

  const onChangeStatusEvent = async (u, isAccepted) => {
    try {
      await changeEventStatusRequest(event, u, isAccepted);
      navigation.navigate(redirectScreen);
    } catch (e) {
      console.error(e);
    }
  };

  const getMembersData = async (mbs) => {
    try {
      const data = await getUsersByArray(mbs);
      setMembersData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (Object.keys(eventMembers).length > 0) {
      getMembersData(eventMembers);
    }
  }, [eventMembers]);

  return (
    <SafeArea>
      <ScrollView>
        <BgWhite>
          <PaddingX>
            <EventCardHeader>
              <Text lg bold>
                {event.name}
              </Text>
              <EventCardCategory color={event.category.color}>
                <EventCardCategoryText>
                  {event.category.name}
                </EventCardCategoryText>
              </EventCardCategory>
            </EventCardHeader>
          </PaddingX>
          <Spacer position="top" size="lg">
            <Separator />
          </Spacer>
          <Spacer position="top" size="lg">
            <PaddingX>
              <EventCardInfos>
                <EventCardInfosItem>
                  <EventCardInfosItemIcon
                    name="ios-calendar"
                    size={16}
                    color="gray"
                  />
                  <EventCardInfosItemText>
                    {event.startDate}
                  </EventCardInfosItemText>
                </EventCardInfosItem>
                <EventCardInfosItem>
                  <EventCardInfosItemIcon
                    name="ios-time"
                    size={16}
                    color="gray"
                  />
                  <EventCardInfosItemText>
                    {event.duration} min.
                  </EventCardInfosItemText>
                </EventCardInfosItem>
                <EventCardInfosItem>
                  <EventCardInfosItemIcon
                    name="ios-barbell"
                    size={16}
                    color="gray"
                  />
                  <EventCardInfosItemText>{event.level}</EventCardInfosItemText>
                </EventCardInfosItem>
              </EventCardInfos>
            </PaddingX>
          </Spacer>
          <Spacer position="top" size="lg">
            <Separator />
          </Spacer>
          <Spacer position="top" size="lg">
            <PaddingX>
              <EventCardFooter>
                <Text md bold>
                  {event.maxPeople} places restantes
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('HomeProfile', {
                      userId: event.creatorId,
                    })
                  }
                >
                  <EventCardInfosItem>
                    <EventCardInfosItemIcon
                      name="ios-person-circle"
                      size={32}
                      color="gray"
                    />
                    <EventCardInfosItemText>Thomas Ln</EventCardInfosItemText>
                  </EventCardInfosItem>
                </TouchableOpacity>
              </EventCardFooter>
            </PaddingX>
          </Spacer>
        </BgWhite>

        <Spacer position="top" size="md">
          <BgWhite>
            <PaddingX>
              <Text sm bold>
                DESCRIPTION
              </Text>
              <Spacer position="top" size="md">
                <Text sm>{event.description}</Text>
              </Spacer>
            </PaddingX>
          </BgWhite>
        </Spacer>

        <Spacer position="top" size="md">
          {event.members.hasOwnProperty(user.uid.trim()) &&
          event.members[user.uid] === 'waiting' ? (
            <>
              <ImageBoxCenter>
                <SvgXml xml={waiting} width={200} height={200} />
              </ImageBoxCenter>
              <Text center bold>
                En attente d'approbation...
              </Text>
              <Spacer position="top" size="lg">
                <PaddingX>
                  <ButtonRed onPress={onEventRemoveJoin}>
                    <Text color="white" bold center>
                      Annuler ma demande
                    </Text>
                  </ButtonRed>
                </PaddingX>
              </Spacer>
            </>
          ) : (event.members.hasOwnProperty(user.uid) &&
              event.members[user.uid] === 'accepted') ||
            event.creatorId === user.uid ? (
            <>
              <BgWhite>
                <PaddingX>
                  <Text sm bold>
                    MEMBRES
                  </Text>
                  <FlatList
                    data={membersData}
                    renderItem={({ item }) => (
                      <Spacer position="top" size="lg">
                        <ListItemContainer>
                          <Text>{item.firstName}</Text>
                          {event.creatorId === user.uid &&
                            eventMembers[item.userId] !== 'accepted' && (
                              <ListItemButtonsContainer>
                                <TouchableOpacity
                                  onPress={() =>
                                    onChangeStatusEvent(item, true)
                                  }
                                >
                                  <Ionicons
                                    name="ios-checkmark-circle"
                                    size={25}
                                    color="green"
                                  />
                                </TouchableOpacity>
                                <Spacer position="left" size="lg">
                                  <TouchableOpacity
                                    onPress={() =>
                                      onChangeStatusEvent(item, false)
                                    }
                                  >
                                    <Ionicons
                                      name="ios-close-circle"
                                      size={25}
                                      color="red"
                                    />
                                  </TouchableOpacity>
                                </Spacer>
                              </ListItemButtonsContainer>
                            )}
                          {eventMembers[item.userId] === 'accepted' && (
                            <Text color="green" bold>
                              Accepté
                            </Text>
                          )}
                        </ListItemContainer>
                      </Spacer>
                    )}
                    keyExtractor={(memberUser) => memberUser.userId}
                  />
                </PaddingX>
              </BgWhite>
              <Spacer position="top" size="md">
                {event.creatorId === user.uid && (
                  <PaddingX>
                    <ButtonGreen onPress={() => onUpdateEvent(event)}>
                      <Text color="white" bold center>
                        Mettre à jour l'évènement
                      </Text>
                    </ButtonGreen>
                  </PaddingX>
                )}
              </Spacer>
              {event.creatorId !== user.uid && (
                <Spacer position="top" size="md">
                  <PaddingX>
                    <ButtonRed onPress={onEventRemoveJoin}>
                      <Text color="white" bold center>
                        Quitter l'événement
                      </Text>
                    </ButtonRed>
                  </PaddingX>
                </Spacer>
              )}
            </>
          ) : event.members.hasOwnProperty(user.uid) &&
            event.members[user.uid] === 'refused' ? (
            <Text>Refusé désolé...</Text>
          ) : (
            <PaddingX>
              <ButtonGreen onPress={onEventJoin}>
                <Text color="white" bold center>
                  Demander à rejoindre l'événement
                </Text>
              </ButtonGreen>
            </PaddingX>
          )}
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
