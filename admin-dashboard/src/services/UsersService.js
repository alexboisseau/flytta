import { db } from '../firebase';
import { Notyf } from 'notyf';
import { getErrorMessage } from './AuthService';

export const fetchUsers = async function () {
  return db
    .collection('users')
    .get()
    .then(res => res);
};

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
      notyf.error(`${getErrorMessage(error.code)}`);
    });
};

export const updateUser = async function (user) {
  const notyf = new Notyf();

  // Il est arrivé que l'ID possède un espace au début de la chaîne ... Par sécurité on utilise la méthode trim()
  user.userUid = user.userUid.trim();

  return db
    .collection('users')
    .doc(user.userUid)
    .update(user)
    .then(
      notyf.success(
        `L'utilisateur ${user.firstName} a bien été mis à jour ! ✅`
      )
    )
    .catch(error => notyf.error(`${getErrorMessage(error.code)}💥`));
};
