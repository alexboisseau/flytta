import React, { useState } from 'react';
import { auth } from '../firebase';
import { checkIsAdmin, getErrorMessage } from '../services/AuthService';
import { Notyf } from 'notyf';

// PAGES AND COMPONENTS
import './LoginPage.css';
import Input from '../components/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = function (event) {
    const { name, value } = event.currentTarget;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmitHandler = async function (event) {
    event.preventDefault();

    try {
      const isAdmin = await checkIsAdmin(email);
      const notyf = new Notyf();

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
      console.log(error);
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
          ></Input>
          <Input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={onChangeHandler}
          ></Input>

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
