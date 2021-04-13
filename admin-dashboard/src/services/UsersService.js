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

  return await db
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
