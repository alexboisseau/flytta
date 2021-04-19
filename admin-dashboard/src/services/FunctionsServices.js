import { db } from '../firebase';

// Récupère le document d'une collection par sa référence
export const getByReference = async function (collection, id) {
  return db
    .collection(collection)
    .doc(id.trim())
    .get()
    .then(res => res.data());
};

// Récupère le message d'erreur du SDK de Firebase selon l'argument qui est passé
export const getErrorMessage = function (code) {
  switch (code) {
    case 'auth/wrong-password':
      return 'Le mot de passe est incorrect';
    case 'auth/too-many-requests':
      return 'Compte bloqué temporairement ...';
    default:
      return "Une erreur s'est produite ...";
  }
};
