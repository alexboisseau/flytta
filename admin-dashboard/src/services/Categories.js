import { db } from '../firebase';
import { Notyf } from 'notyf';
import { getErrorMessage } from './FunctionsServices';

// Récupère toutes les catégories depuis Firestore
export const fetchCategories = async function () {
  return db.collection('categories').get();
};

// Supprime une catégorie dans Firestore et renvoie un message d'erreur où de succès
export const deleteCategory = async function (category) {
  const notyf = new Notyf();

  return db
    .collection('categories')
    .doc(category.id)
    .delete()
    .then(
      notyf.success(`La catégorie ${category.name} a bien été supprimée ! ✅`)
    )
    .catch(error => {
      notyf.error(`${getErrorMessage(error.code)}💥`);
    });
};

export const updateCategory = async function (category) {
  const notyf = new Notyf();

  // Shallow Copy de l'évènement pour pouvoir supprimer les informations que nous avions ajouté dans le champs category le temps de travailler avec l'évènement.
  // Cela nous permet donc de garder uniquement la référence à la category.
  const updateCategory = { ...category };
  delete updateCategory.id;

  return db
    .collection('categories')
    .doc(category.id)
    .update(updateCategory)
    .then(
      notyf.success(
        `La catégorie ${updateCategory.name} a bien été mise à jour ! ✅`
      )
    )
    .catch(error => notyf.error(`${getErrorMessage(error.code)}💥`));
};
