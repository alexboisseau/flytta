import React, { useEffect, useState } from 'react';
import {
  fetchEvents,
  deleteEvent,
  updateEvent,
} from '../services/EventsService';
import { getByReference, getErrorMessage } from '../services/FunctionsServices';
import { Notyf } from 'notyf';

// PAGES / COMPONENTS / STYLES
import Header from '../components/Header/Header';
import MainTitle from '../components/MainTitle';
import FilterField from '../components/FilterField/FilterField';
import { EventsList } from '../components/Events/EventsList';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  // Récupère les évènements puis met à jour le state des events
  const getEvents = function () {
    try {
      setEvents([]);
      fetchEvents().then(events => {
        events.forEach(async e => {
          const event = { eventId: e.id, ...e.data() };
          event.category = await getByReference(
            'categories',
            event.categoryId.trim()
          );
          setEvents(events => [...events, event]);
        });
      });
    } catch (error) {
      const notyf = new Notyf();
      notyf.error(getErrorMessage(error.code));
    }
  };

  // Gestion de la suppression d'un évènement
  const handleDelete = function (event) {
    deleteEvent(event).then(getEvents());
  };

  // Gestion de la mise à jour d'un évènement
  const handleUpdate = function (e, newEvent) {
    e.preventDefault();
    updateEvent(newEvent);
    setTimeout(() => getEvents(), 500);
  };

  // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer par la suite les données
  const handleSearch = function ({ currentTarget }) {
    setSearch(currentTarget.value);
  };

  // Filtrage des évènements par leur nom où leur ville
  const filteredEvents = events.filter(
    event =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.city.toLowerCase().includes(search.toLowerCase())
  );

  // Utilisation du hook useEffect pour récupérer les données dès le chargement de la page
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Header></Header>
      <MainTitle title="Évènements"></MainTitle>
      <FilterField
        name="Rechercher"
        label="Rechercher"
        placeholder="Saisir le nom d'un évènement ou la ville d'un évènement"
        onChange={handleSearch}
        onSearch={getEvents}
        value={search}
      />
      <EventsList
        events={filteredEvents}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default EventsPage;
