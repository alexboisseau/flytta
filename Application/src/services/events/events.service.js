import * as firebase from 'firebase';

export const addEventRequest = (
  eventName,
  address,
  city,
  maxPeople,
  startDate,
  duration,
  level,
  creatorId
) =>
  firebase.firestore().collection('events').add({
    name: eventName,
    address,
    city,
    maxPeople,
    startDate,
    duration,
    level,
    creator: creatorId,
  });
