import React, { useEffect, useState } from 'react';
import { deleteCategory, updateCategory } from '../services/Categories';

// STYLES / COMPONENTS / PAGES
import Header from '../components/Header/Header';
import { fetchCategories } from '../services/Categories';
import CategoriesList from '../components/Categories/CategoriesList';
import FilterField from '../components/FilterField/FilterField';
import MainTitle from '../components/MainTitle';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  // Récupération des catégories dans Firestore
  const getCategories = async () => {
    try {
      setCategories([]);
      fetchCategories().then(categories => {
        categories.forEach(c => {
          const category = { id: c.id, ...c.data() };
          setCategories(categories => [...categories, category]);
        });
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
      <CategoriesList
        categories={filteredCategories}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      ></CategoriesList>
    </>
  );
};

export default CategoriesPage;
