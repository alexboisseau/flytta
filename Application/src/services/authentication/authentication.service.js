import * as firebase from 'firebase';

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const registerRequest = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const getUsersByArray = async (ids) => {
  const usersData = await firebase
    .firestore()
    .collection('users')
    .where(
      'userId',
      'in',
      Object.keys(ids).map((v) => v.trim())
    )
    .get();

  return usersData.docs.map((doc) => ({ ...doc.data() }));
};
