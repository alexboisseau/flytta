import { db } from '../firebase';

// Récupère l'utilisateur par son mail et vérifie si son rôle admin est à true ou à false
export const checkIsAdmin = async function (email) {
  return db
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(res => {
      let isAdmin = false;
      let userName = {};

      if (res.size === 1) {
        res.forEach(user => {
          isAdmin = user.data().isAdmin;
          userName = user.data().firstName;
        });
      }

      return { isAdmin, userName };
    })
    .catch(error => {
      return error;
    });
};
