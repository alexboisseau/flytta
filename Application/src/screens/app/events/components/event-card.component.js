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
  EventCardInfosDescription,
  EventCardFooter,
  PaddingX,
} from './event-card.styles';

export const EventCard = ({ navigation, event = {} }) => {
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
    </EventCardContainer>
  );
};
