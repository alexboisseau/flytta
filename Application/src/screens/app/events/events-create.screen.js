import React, { useContext, useState } from 'react';

import { SafeArea } from '../../../components/utility/safe-area';
import { Input, Label } from '../../../components/ui/input';
import { Spacer } from '../../../components/ui/spacer';
import { EventsCreateForm } from './components/events-create.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonOrange } from '../../../components/ui/button';
import { Text } from '../../../components/ui/text';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { addEventRequest } from '../../../services/events/events.service';

export const EventsCreate = () => {
  const [eventName, setEventName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [maxPeople, setMaxPeople] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState(null);
  const [level, setLevel] = useState('');
  const { user } = useContext(AuthenticationContext);

  const onEventAdd = async () => {
    console.log('yess');
    try {
      await addEventRequest(
        eventName,
        address,
        city,
        maxPeople,
        startDate,
        duration,
        level,
        user.uid
      );
      console.log('event created');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeArea>
      <ScrollView>
        <EventsCreateForm>
          <Spacer position="bottom" size="md">
            <Label>Nom de l'événement</Label>
            <Input
              autoCapitalize="none"
              value={eventName}
              keyboardType="default"
              onChangeText={(value) => setEventName(value)}
              placeholder="Email"
            />
          </Spacer>
          <Spacer position="bottom" size="md">
            <Label>Adresse</Label>
            <Input
              autoCapitalize="none"
              value={address}
              keyboardType="default"
              textContentType="streetAddressLine1"
              onChangeText={(value) => setAddress(value)}
              placeholder="Adresse"
            />
          </Spacer>
          <Spacer position="bottom" size="md">
            <Label>Ville</Label>
            <Input
              autoCapitalize="none"
              value={city}
              keyboardType="default"
              onChangeText={(value) => setCity(value)}
              placeholder="Ville"
            />
          </Spacer>
          <Spacer position="bottom" size="md">
            <Label>Nombre de personnes</Label>
            <Input
              autoCapitalize="none"
              value={maxPeople}
              keyboardType="numeric"
              onChangeText={(value) => setMaxPeople(value)}
              placeholder="6 personnes"
            />
          </Spacer>
          <Spacer position="bottom" size="md">
            <Label>Date de l'événement</Label>
            <Input
              autoCapitalize="none"
              value={startDate}
              keyboardType="default"
              onChangeText={(value) => setStartDate(value)}
              placeholder="Date de l'événement"
            />
          </Spacer>
          <Spacer position="bottom" size="md">
            <Label>Durée de l'événement</Label>
            <Input
              autoCapitalize="none"
              value={duration}
              keyboardType="numeric"
              onChangeText={(value) => setDuration(value)}
              placeholder="Date de début"
            />
          </Spacer>
          <Spacer position="bottom" size="md">
            <Label>Niveau</Label>
            <Input
              autoCapitalize="none"
              value={level}
              keyboardType="default"
              onChangeText={(value) => setLevel(value)}
              placeholder="Niveau"
            />
          </Spacer>
          <Spacer>
            <ButtonOrange onPress={onEventAdd}>
              <Text color="white" bold center>
                Ajouter l'événement
              </Text>
            </ButtonOrange>
          </Spacer>
        </EventsCreateForm>
      </ScrollView>
    </SafeArea>
  );
};
