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

export const addEventJoinRequest = async (event) => {
  const { members } = event;
  members[firebase.auth().currentUser.uid] = 'waiting';

  return firebase
    .firestore()
    .collection('events')
    .doc(event.id)
    .update({ members });
};
