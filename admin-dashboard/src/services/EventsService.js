import { db } from '../firebase';

export const fetchEvents = async () => {
  return db
    .collection('events')
    .get()
    .then(res => res);
};

export const getCategory = async catId => {
  return db
    .collection('categories')
    .doc(catId.trim())
    .get()
    .then(res => res.data());
};
