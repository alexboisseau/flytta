import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, updateUser } from '../services/UsersService';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Notyf } from 'notyf';
import Header from '../components/Header/Header';
import MainTitle from '../components/MainTitle';
import FilterField from '../components/FilterField/FilterField';
import { UsersList } from '../components/Users/UsersList';

const UsersPage = function () {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Création du css pour le spinner de chargement
  const spinnerStyle = css`
    display: block;
    margin: auto;
    margin-top: 50px;
  `;

  // Récupération des utilisateurs dans Firestore pour ensuite les passer au component UsersList
  const getUsers = async function () {
    try {
      setUsers([]);
      fetchUsers().then(users => {
        setIsLoading(true);
        users.forEach(u => {
          const user = { userId: u.id, ...u.data() };
          setUsers(users => [...users, user]);
        });
        setIsLoading(false);
      });
    } catch (error) {
      const notyf = new Notyf();
      notyf.error(
        'Un problème est survenu ... Merci de rééssayer plus tard ❌'
      );
    }
  };

  // Gestion de la suppression d'un utilisateur
  const handleDelete = function (user) {
    deleteUser(user).then(getUsers());
  };

  // Gestion de la mise à jour d'un utilisateur
  const handleUpdate = function (event, newUser) {
    event.preventDefault();
    updateUser(newUser);
    setTimeout(() => getUsers(), 500);
  };

  // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer ensuite les données
  const handleSearch = function ({ currentTarget }) {
    setSearch(currentTarget.value);
  };

  // Filtrage des utilisateurs par leur nom, prénom, mail
  const filteredUsers = users.filter(
    user =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header></Header>
      <MainTitle title="Utilisateurs"></MainTitle>
      <FilterField
        name="Rechercher"
        label="Rechercher"
        placeholder="Saisir un prénom, un nom, ou un email ..."
        onChange={handleSearch}
        onSearch={getUsers}
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
        <UsersList
          users={filteredUsers}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default UsersPage;
