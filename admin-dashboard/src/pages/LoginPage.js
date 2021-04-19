import React, { useState } from 'react';
import { auth } from '../firebase';
import { checkIsAdmin } from '../services/AuthService';
import { getErrorMessage } from '../services/FunctionsServices';
import { Notyf } from 'notyf';

// PAGES AND COMPONENTS
import './LoginPage.css';
import Input from '../components/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Gestion du changement de la valeur des inputs
  const onChangeHandler = function ({ currentTarget }) {
    const { name, value } = currentTarget;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  // Gestion de la soumission du formulaire
  const onSubmitHandler = async function (event) {
    event.preventDefault();
    const notyf = new Notyf();

    try {
      const isAdmin = await checkIsAdmin(email);

      if (isAdmin) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            notyf.success('Vous êtes connecté 🎉');
          })
          .catch(error => {
            notyf.error(`${getErrorMessage(error.code)} 💥`);
            console.log(error);
          });
      } else {
        notyf.error("Vous n'êtes pas administrateur de Flytta 💥");
      }
    } catch (error) {
      notyf.error("Merci de vérifier l'email renseignée 💥");
    }
  };

  return (
    <div id="mainContainer" className="w-full h-screen">
      <div
        id="overlay"
        className="w-full h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center"
      >
        <form
          onSubmit={event => onSubmitHandler(event)}
          id="formContainer"
          className="px-24 py-10 bg-opacity-90 rounded-xl flex flex-col justify-around items-center text-white"
        >
          <h1 className="mb-10 text-6xl text-center">Flytta Admin</h1>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChangeHandler}
            className="block mb-1 p-2 rounded w-80 text-black focus:outline-none"
          />
          <Input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={onChangeHandler}
            className="block mb-1 p-2 rounded w-80 text-black focus:outline-none"
          />

          <button
            type="submit"
            className="px-5 py-3 mt-9 bg-white rounded-full hover:bg-gray-100 focus:outline-none"
            id="submit-button"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
