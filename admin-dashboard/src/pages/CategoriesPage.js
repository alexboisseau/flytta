import React, { useEffect, useState } from 'react';
import { deleteCategory, updateCategory } from '../services/Categories';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

// STYLES / COMPONENTS / PAGES
import Header from '../components/Header/Header';
import { fetchCategories, createCategory } from '../services/Categories';
import CategoriesList from '../components/Categories/CategoriesList';
import FilterField from '../components/FilterField/FilterField';
import MainTitle from '../components/MainTitle';
import PlusIcon from '../assets/svgIcons/PlusIcon';
import useModal from '../hooks/useModal';
import CategoryModal from '../components/Categories/CategoryModal';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isShowing, toggle } = useModal();

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

  // Gestion de la mise à jour d'une catégorie
  const handleUpdate = function (event, category) {
    event.preventDefault();
    updateCategory(category);
    setTimeout(() => getCategories(), 300);
  };

  // Gestion de la création d'une catégorie
  const handleCreate = function (event, category) {
    event.preventDefault();
    createCategory(category);
    setTimeout(() => getCategories(), 300);
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
      <div className="text-center my-5">
        <button
          onClick={toggle}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded m-auto flex items-center space-x-2"
        >
          <PlusIcon></PlusIcon>
          <span>Nouvelle catégorie</span>
        </button>
      </div>
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
      <CategoryModal
        isShowing={isShowing}
        hide={toggle}
        category={{ name: '', color: '' }}
        onSubmit={handleCreate}
        create={true}
      />
    </>
  );
};

export default CategoriesPage;
