import { db } from '../firebase';
import { Notyf } from 'notyf';
import { getErrorMessage } from './FunctionsServices';

// Récupère tous les utilisateurs dans Firestore
export const fetchUsers = async function () {
  return db
    .collection('users')
    .get()
    .then(res => res);
};

// Supprime un utilisateur dans Firestore et renvoie un message d'erreur où de succès
export const deleteUser = async function (user) {
  const notyf = new Notyf();

  return db
    .collection('users')
    .doc(user.userUid.trim())
    .delete()
    .then(
      notyf.success(`L'utilisateur ${user.firstName} a bien été supprimé ! ✅`)
    )
    .catch(error => {
      notyf.error(`${getErrorMessage(error.code)}💥`);
    });
};

// Met à jour un utilisateur dans Firestore et renvoie un message d'erreur ou de succès
export const updateUser = async function (user) {
  const notyf = new Notyf();

  return db
    .collection('users')
    .doc(user.userId.trim())
    .update(user)
    .then(
      notyf.success(
        `L'utilisateur ${user.firstName} a bien été mis à jour ! ✅`
      )
    )
    .catch(error => notyf.error(`${getErrorMessage(error.code)}💥`));
};
