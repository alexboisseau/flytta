import React from 'react';
import { Link } from 'react-router-dom';

// PAGES AND COMPONENTS
import Header from '../components/Header/Header';

const HomePage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex justify-center mx-auto space-x-10 text-white">
        <Link to="/events" className="text-3xl">
          <div
            className="bg-blue-500 py-12 px-20 rounded"
            id="link-events-page"
          >
            Évènements
          </div>
        </Link>
        <Link to="/events" className="text-3xl">
          <div
            className="bg-blue-500 py-12 px-20 rounded"
            id="link-events-page"
          >
            Utilisateurs
          </div>
        </Link>
        <Link to="/events" className="text-3xl">
          <div
            className="bg-blue-500 py-12 px-20 rounded"
            id="link-events-page"
          >
            Catégories
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
