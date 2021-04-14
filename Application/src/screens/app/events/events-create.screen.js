import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

import { SafeArea } from '../../../components/utility/safe-area';
import { Input, Label } from '../../../components/ui/input';
import { Spacer } from '../../../components/ui/spacer';
import { EventsCreateForm } from './components/events-create.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonOrange } from '../../../components/ui/button';
import { Text } from '../../../components/ui/text';

import { addEventRequest } from '../../../services/events/events.service';
import { getCategoriesRequest } from '../../../services/categories/categories.service';
import { ActivityIndicator } from 'react-native';

export const EventsCreate = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPeople, setMaxPeople] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState(null);
  const [level, setLevel] = useState('');
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const getCategories = async () => {
    setCategories([]);
    setIsCategoriesLoading(true);
    try {
      const ctgs = await getCategoriesRequest();
      setCategories(ctgs);
      setSelectedCategory(ctgs[0].id);
      setIsCategoriesLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onEventAdd = async () => {
    try {
      await addEventRequest(
        eventName,
        address,
        city,
        maxPeople,
        startDate,
        duration,
        level,
        selectedCategory
      );
      setEventName('');
      setAddress('');
      setCity('');
      setMaxPeople(null);
      setStartDate('');
      setDuration(null);
      setLevel('');

      navigation.navigate('EventsUsers');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
              placeholder="Nom de l'événement"
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
            <Label>Catégorie</Label>
            {isCategoriesLoading ? (
              <ActivityIndicator />
            ) : (
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {categories.map((c) => (
                  <Picker.Item key={c.id} label={c.name} value={c.id} />
                ))}
              </Picker>
            )}
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
              placeholder="Durée"
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
