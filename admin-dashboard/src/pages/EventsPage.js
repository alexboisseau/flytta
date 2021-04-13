import React, { useEffect, useState } from 'react';
import { fetchEvents, getCategory } from '../services/EventsService';
import { EventsList } from '../components/Events/EventsList';
import FilterField from '../components/FilterField/FilterField';

// PAGES / COMPONENTS / STYLES
import Header from '../components/Header/Header';
import MainTitle from '../components/MainTitle';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  const getCategories = async function (categoryId) {
    try {
      return getCategory(categoryId).then(res => res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getEvents = async function () {
    try {
      const events = await fetchEvents();

      setEvents([]);
      events.forEach(async e => {
        const event = { eventUid: e.id, ...e.data() };
        event.category = await getCategories(event.categoryId);
        setEvents(events => [...events, event]);
      });
    } catch (error) {
      // TODO NOPTYF
      console.error(error);
    }
  };

  // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer ensuite les données
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    // setCurrentPage(1);
  };

  // Filtrage des sneakers selon la recherche en comparant celle-ci au nom des sneakers
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

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
        placeholder="Veuillez un prénom, un nom, ou un email ..."
        onChange={handleSearch}
        onSearch={getEvents}
        value={search}
      />
      <EventsList events={filteredEvents} />
    </>
  );
};

export default EventsPage;
