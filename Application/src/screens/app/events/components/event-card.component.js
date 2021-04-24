import React from 'react';

import { Spacer } from '../../../../components/ui/spacer';
import { Text } from '../../../../components/ui/text';
import {
  EventCardCategory,
  EventCardCategoryText,
  EventCardContainer,
  EventCardHeader,
  EventCardInfos,
  EventCardInfosItem,
  EventCardInfosItemIcon,
  EventCardInfosItemText,
  Separator,
  EventCardFooter,
  PaddingX,
} from './event-card.styles';
import { Avatar } from '../../../../components/ui/avatar';

export const EventCard = ({ event = {} }) => {
  return (
    <EventCardContainer>
      <PaddingX>
        <EventCardHeader>
          <Text bold>{event.name}</Text>
          <EventCardCategory color={event.category.color}>
            <EventCardCategoryText>{event.category.name}</EventCardCategoryText>
          </EventCardCategory>
        </EventCardHeader>
      </PaddingX>
      <Spacer position="top" size="md">
        <Separator />
      </Spacer>
      <Spacer position="top" size="md">
        <PaddingX>
          <EventCardInfos>
            <EventCardInfosItem>
              <EventCardInfosItemIcon
                name="ios-calendar"
                size={16}
                color="gray"
              />
              <EventCardInfosItemText>{event.startDate}</EventCardInfosItemText>
            </EventCardInfosItem>
            <EventCardInfosItem>
              <EventCardInfosItemIcon name="ios-time" size={16} color="gray" />
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
      <Spacer position="top" size="md">
        <Separator />
      </Spacer>
      <Spacer position="top" size="md">
        <PaddingX>
          <EventCardFooter>
            <Text md bold>
              {event.maxPeople} places restantes
            </Text>
            <EventCardInfosItem>
              <Spacer position="right" size="md">
                <Avatar
                  size={35}
                  source={
                    event.creator.avatar
                      ? { uri: event.creator.avatar }
                      : require('../../../../../assets/user-avatar-default.png')
                  }
                />
              </Spacer>
              <EventCardInfosItemText>
                {event.creator.firstName} {event.creator.lastName}
              </EventCardInfosItemText>
            </EventCardInfosItem>
          </EventCardFooter>
        </PaddingX>
      </Spacer>
    </EventCardContainer>
  );
};
