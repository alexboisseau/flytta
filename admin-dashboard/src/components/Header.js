import React from 'react';
import { Link } from 'react-router-dom';

// PAGES / COMPONENTS / STYLES
import './Header.css';

const Header = () => {
  return (
    <header className="text-white px-10 py-8 flex items-center justify-between">
      <Link to="/" className="text-3xl">
        Flytta Admin
      </Link>
      <ul className="flex space-x-5">
        <Link to="/users" className="hover:underline">
          Utilisateurs
        </Link>
        <Link to="/events" className="hover:underline">
          Évènements
        </Link>
      </ul>
    </header>
  );
};

export default Header;
