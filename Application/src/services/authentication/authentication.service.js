import * as firebase from 'firebase';

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const registerRequest = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const getUserRequest = (userId) =>
  firebase.firestore().collection('users').doc(userId).get();

export const updateUser = (newUser) =>
  firebase
    .firestore()
    .collection('users')
    .doc(newUser.userId.trim())
    .update({ ...newUser });

export const updateUserAvatarRequest = async (uri, userId) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(`/images/${userId.trim()}/avatar`);
  return ref.put(blob);
};

export const getAvatarUser = (userId) =>
  firebase.storage().ref(`/images/${userId}/avatar`).getDownloadURL();

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
