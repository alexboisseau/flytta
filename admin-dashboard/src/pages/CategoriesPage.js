import React, { useEffect, useState } from 'react';
import { deleteCategory, updateCategory } from '../services/Categories';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

// STYLES / COMPONENTS / PAGES
import Header from '../components/Header/Header';
import { fetchCategories } from '../services/Categories';
import CategoriesList from '../components/Categories/CategoriesList';
import FilterField from '../components/FilterField/FilterField';
import MainTitle from '../components/MainTitle';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Création du css pour le spinner de chargement
  const spinnerStyle = css`
    display: block;
    margin: auto;
    margin-top: 50px;
  `;

  // Récupération des catégories dans Firestore
  const getCategories = async () => {
    try {
      setCategories([]);
      fetchCategories().then(categories => {
        setIsLoading(true);
        categories.forEach(c => {
          const category = { id: c.id, ...c.data() };
          setCategories(categories => [...categories, category]);
        });
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Gestion de la suppression d'une catégorie
  const handleDelete = function (category) {
    deleteCategory(category).then(getCategories());
  };

  // Gestion de la mise à jour d'un utilisateur
  const handleUpdate = function (event, category) {
    event.preventDefault();
    updateCategory(category);
    setTimeout(() => getCategories(), 500);
  };

  // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer ensuite les données
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Header></Header>
      <MainTitle title="Catégories"></MainTitle>
      <FilterField
        name="Rechercher"
        label="Rechercher"
        placeholder="Saisir le nom d'une catégorie"
        onChange={handleSearch}
        onSearch={getCategories}
        value={search}
      />
      {isLoading ? (
        <ClipLoader
          color="#0b1f51"
          loading={isLoading}
          css={spinnerStyle}
          size={35}
        />
      ) : (
        <CategoriesList
          categories={filteredCategories}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        ></CategoriesList>
      )}
    </>
  );
};

export default CategoriesPage;
