import * as firebase from 'firebase';

export const addEventRequest = (
  eventName,
  address,
  city,
  maxPeople,
  startDate,
  duration,
  level,
  categoryId,
  creatorId
) =>
  firebase
    .firestore()
    .collection('events')
    .add({
      name: eventName,
      address,
      city,
      category: firebase.firestore().doc(`categories/${categoryId}`),
      maxPeople,
      startDate,
      duration,
      level,
      creator: firebase.firestore().doc(`users/${creatorId}`),
    });

// export const getEventsRequest = async () => {
//   const output = [];
//   const data = await firebase.firestore().collection('events').get();

//   data.forEach(async (doc) => {
//     const {
//       name,
//       address,
//       city,
//       duration,
//       level,
//       startDate,
//       maxPeople,
//       categoryId,
//     } = doc.data();

//     const { name: categoryName, color } = (
//       await firebase.firestore().collection('categories').doc(categoryId).get()
//     ).data();

//     output.push({
//       name,
//       address,
//       city,
//       duration,
//       level,
//       startDate,
//       maxPeople,
//       category: { name: categoryName, color },
//     });
//   });

//   return output;
// };
