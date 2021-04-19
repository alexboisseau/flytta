import { db } from '../firebase';

// Récupère toutes les catégories depuis Firestore
export const fetchCategories = async function () {
  return db.collection('categories').get();
};
