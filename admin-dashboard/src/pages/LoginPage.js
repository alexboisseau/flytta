import React, { useState } from 'react';
import { auth } from '../firebase';
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

  const onSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const successNotyf = new Notyf();
        successNotyf.success('Vous êtes connecté 🎉');
      })
      .catch(error => {
        const errorNotyf = new Notyf();
        errorNotyf.error("Une erreur s'est produite, veuillez réessayer ❌");
      });
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
          className="p-10 bg-blue-400 bg-opacity-90 rounded-xl flex flex-col justify-around items-center text-white"
        >
          <h1 className="mb-10 text-6xl text-center">Flytta Admin Dashboard</h1>

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
            className="px-5 py-3 mt-9 bg-white text-blue-400 rounded-full hover:bg-blue-600 hover:text-white"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
