import * as firebase from 'firebase';

export const getCategoriesRequest = async () =>
  firebase.firestore().collection('categories').get();
