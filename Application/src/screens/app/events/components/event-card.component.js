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
} from './event-card.styles';

export const EventCard = ({ event = {} }) => {
  return (
    <EventCardContainer>
      <EventCardHeader>
        <Text bold>{event.name}</Text>
        <EventCardCategory color={event.category.color}>
          <EventCardCategoryText>{event.category.name}</EventCardCategoryText>
        </EventCardCategory>
      </EventCardHeader>
      <Spacer position="top" size="md">
        <Separator />
      </Spacer>
      <Spacer position="top" size="md">
        <EventCardInfos>
          <EventCardInfosItem>
            <EventCardInfosItemIcon
              name="ios-calendar"
              size="16"
              color="gray"
            />
            <EventCardInfosItemText>{event.startDate}</EventCardInfosItemText>
          </EventCardInfosItem>
          <EventCardInfosItem>
            <EventCardInfosItemIcon name="ios-time" size="16" color="gray" />
            <EventCardInfosItemText>
              {event.duration} min.
            </EventCardInfosItemText>
          </EventCardInfosItem>
          <EventCardInfosItem>
            <EventCardInfosItemIcon name="ios-barbell" size="16" color="gray" />
            <EventCardInfosItemText>{event.level}</EventCardInfosItemText>
          </EventCardInfosItem>
        </EventCardInfos>
      </Spacer>
      <Spacer position="top" size="md">
        <Separator />
      </Spacer>
      <Spacer position="top" size="md">
        <EventCardInfosDescription>
          {event.description}
        </EventCardInfosDescription>
      </Spacer>
      <Spacer position="top" size="md">
        <Separator />
      </Spacer>
      <Spacer position="top" size="md">
        <EventCardFooter>
          <EventCardInfosItem>
            <EventCardInfosItemIcon
              name="ios-person-circle"
              size="32"
              color="gray"
            />
            <EventCardInfosItemText>
              {event.creator.fullName}
            </EventCardInfosItemText>
          </EventCardInfosItem>
        </EventCardFooter>
      </Spacer>
    </EventCardContainer>
  );
};
