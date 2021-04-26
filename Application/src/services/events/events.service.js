import * as firebase from 'firebase';
import { getByRef } from '../utils/functions';

export const addEventRequest = (
  eventName,
  address,
  city,
  maxPeople,
  startDate,
  duration,
  level,
  categoryId
) =>
  firebase.firestore().collection('events').add({
    name: eventName,
    address,
    city,
    categoryId,
    maxPeople,
    startDate,
    duration,
    level,
    members: {},
    creatorId: firebase.auth().currentUser.uid,
  });

export const getEventsRequest = async () => {
  const data = await firebase.firestore().collection('events').get();
  return Promise.all(
    data.docs.map(async (doc) => {
      const categoryData = await getByRef(
        'categories',
        doc.data().categoryId.trim()
      );
      const userData = await getByRef('users', doc.data().creatorId);

      return {
        ...doc.data(),
        id: doc.id,
        creator: userData.data(),
        category: categoryData.data(),
      };
    })
  );
};

export const handleEventJoinRequest = async (event, isAdd) => {
  let { members } = event;

  if (isAdd) {
    members[firebase.auth().currentUser.uid.trim()] = 'waiting';
  } else {
    members = Object.keys(members)
      .filter((key) => key !== firebase.auth().currentUser.uid)
      .reduce((obj, key) => {
        obj[key] = members[key];
        return obj;
      }, {});
  }

  return firebase
    .firestore()
    .collection('events')
    .doc(event.id)
    .update({ members });
};

export const changeEventStatusRequest = async (event, user, isAccepted) => {
  const { members } = event;

  members[user.userId.trim()] = isAccepted ? 'accepted' : 'refused';

  return firebase
    .firestore()
    .collection('events')
    .doc(event.id)
    .update({ members });
};

export const updateEventRequest = async (event) => {
  console.log(event);
  return firebase
    .firestore()
    .collection('events')
    .doc(event.eventId)
    .update(event);
};

export const getCreatedEventsRequest = async (userId) => {
  const data = await firebase
    .firestore()
    .collection('events')
    .where('creatorId', '==', userId)
    .get();

  return Promise.all(
    data.docs.map(async (doc) => {
      const categoryData = await getByRef(
        'categories',
        doc.data().categoryId.trim()
      );
      const userData = await getByRef('users', doc.data().creatorId);

      return {
        ...doc.data(),
        id: doc.id,
        creator: userData.data(),
        category: categoryData.data(),
      };
    })
  );
};

export const getRegisteredEventsRequest = async (userId) => {
  const data = await firebase.firestore().collection('events').get();

  return Promise.all(
    data.docs.map(async (doc) => {
      if (doc.data().members[userId]) {
        const categoryData = await getByRef(
          'categories',
          doc.data().categoryId.trim()
        );
        const userData = await getByRef('users', doc.data().creatorId);

        return {
          ...doc.data(),
          id: doc.id,
          creator: userData.data(),
          category: categoryData.data(),
        };
      }

      return null;
    })
  );
};

export const getAvailablesPlaces = (event) => {
  if (event.members) {
    return (
      event.maxPeople -
      Object.entries(event.members).filter(
        ([key, value]) => value === 'accepted'
      ).length
    );
  }

  return event.maxPeople;
};

export const getCreatorData = (creatorId) =>
  firebase.firestore().collection('users').doc(creatorId).get();
