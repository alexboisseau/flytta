import React, { useContext } from 'react';
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
import { BgWhite } from '../../../components/ui/bg';
import { ButtonGreen } from '../../../components/ui/button';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

import { addEventJoinRequest } from '../../../services/events/events.service';

import waiting from '../../../../assets/waiting.js';
import { ImageBoxCenter } from '../../../components/ui/image';

export const EventsShow = ({ navigation, route }) => {
  const { event } = route.params;
  const { user } = useContext(AuthenticationContext);

  const onEventJoin = async () => {
    try {
      await addEventJoinRequest(event);
      navigation.navigate('HomeIndex');
    } catch (e) {
      console.error(e);
    }
  };

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
                <EventCardInfosItem>
                  <EventCardInfosItemIcon
                    name="ios-person-circle"
                    size={32}
                    color="gray"
                  />
                  <EventCardInfosItemText>Thomas Ln</EventCardInfosItemText>
                </EventCardInfosItem>
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

        <Spacer position="top" size="lg">
          <PaddingX>
            {event.members.hasOwnProperty(user.uid) ? (
              <>
                <ImageBoxCenter>
                  <SvgXml xml={waiting} width={200} height={200} />
                </ImageBoxCenter>
                <Text center bold>
                  En attente d'approbation...
                </Text>
              </>
            ) : (
              <ButtonGreen onPress={onEventJoin}>
                <Text color="white" bold center>
                  Demander à rejoindre l'événement
                </Text>
              </ButtonGreen>
            )}
          </PaddingX>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
