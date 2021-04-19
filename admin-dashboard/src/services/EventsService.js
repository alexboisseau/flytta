import { db } from '../firebase';
import { getErrorMessage } from './FunctionsServices';
import { Notyf } from 'notyf';

// Récupère toutes les évènements stockés dans FireStore
export const fetchEvents = async function () {
  return db
    .collection('events')
    .get()
    .then(res => res);
};

// Supprime un évènement dans Firestore puis affiche un message de succès où d'erreur
export const deleteEvent = function (event) {
  const notyf = new Notyf();

  return db
    .collection('events')
    .doc(event.eventId.trim())
    .delete()
    .then(notyf.success(`L'évènement ${event.name} à bien été supprimé ! ✅`))
    .catch(error => {
      notyf.error(`${getErrorMessage(error.code)} 💥`);
    });
};

// Met à jour un évènement dans Firestore puis affiche un message de succès où d'erreur
export const updateEvent = function (event) {
  const notyf = new Notyf();

  // Shallow Copy de l'évènement pour pouvoir supprimer les informations que nous avions ajouté dans le champs category le temps de travailler avec l'évènement.
  // Cela nous permet donc de garder uniquement la référence à la category.
  const updateEvent = { ...event };
  delete updateEvent.category;

  return db
    .collection('events')
    .doc(event.eventId.trim())
    .update(updateEvent)
    .then(notyf.success(`L'évènement ${event.name} a bien été mis à jour ! ✅`))
    .catch(error => notyf.error(`${getErrorMessage(error.code)}💥`));
};
