import * as firebase from 'firebase';

export const getCategoriesRequest = async () => {
  const data = await firebase.firestore().collection('categories').get();
  return data.docs.map((doc) => {
    const { name, color } = doc.data();

    return { id: doc.id, name, color };
  });
};
