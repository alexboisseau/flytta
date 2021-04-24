import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { getErrorMessage } from '../../services/FunctionsServices';
import { Notyf } from 'notyf';

// PAGES / COMPONENTS / STYLES
import './Header.css';
import LogoutIcon from '../../assets/svgIcons/LogoutIcon';

const Header = () => {
  const signOut = function () {
    const notyf = new Notyf();
    try {
      auth.signOut();
      notyf.success(`Vous êtes bien déconnecté ✅`);
    } catch (error) {
      notyf.error(`${getErrorMessage(error.code)} 💥`);
      console.log(error);
    }
  };

  return (
    <header className="text-white px-10 py-8 flex items-center justify-between">
      <Link to="/" className="text-3xl">
        Flytta Admin
      </Link>
      <ul className="flex items-center space-x-5">
        <Link to="/users" className="hover:underline">
          Utilisateurs
        </Link>
        <Link to="/events" className="hover:underline">
          Évènements
        </Link>
        <Link to="/categories" className="hover:underline">
          Catégories
        </Link>
        <Link
          to="/"
          className="bg-white hover:bg-gray-200 rounded p-2 flex items-center justify-center space-x-2"
          onClick={signOut}
          id="signOutButton"
        >
          <LogoutIcon></LogoutIcon>
          <span>Déconnexion</span>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
