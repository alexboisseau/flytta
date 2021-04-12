import { db } from '../firebase';

// Permet de vérifier qu'un utilisateur est admin ou non depuis son email
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

const getErrorMessage = function (code) {
  switch (code) {
    case 'auth/wrong-password':
      return 'Le mot de passe est incorrect';
    default:
      return "Une erreur s'est produite ...";
  }
};

export { checkIsAdmin, getErrorMessage };
