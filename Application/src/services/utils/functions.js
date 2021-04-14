import * as firebase from 'firebase';

export const getByRef = async (collection, id) =>
  firebase.firestore().collection(collection).doc(id).get();
