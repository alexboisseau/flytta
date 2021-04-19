import { db } from '../firebase';

// Récupère l'utilisateur par son mail et vérifie si son rôle admin est à true ou à false
const checkIsAdmin = async function (email) {
  return db
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(res => {
      let isAdmin = false;
      if (res.size === 1) res.forEach(user => (isAdmin = user.data().isAdmin));

      return isAdmin;
    })
    .catch(error => {
      return error;
    });
};

export { checkIsAdmin };
