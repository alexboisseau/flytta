import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, updateUser } from '../services/UsersService';
import { UsersList } from '../components/Users/UsersList';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

// PAGES / COMPONENTS / STYLES
import Header from '../components/Header/Header';
import MainTitle from '../components/MainTitle';
import FilterField from '../components/FilterField/FilterField';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const spinnerStyle = css`
    display: block;
    margin: auto;
    margin-top: 50px;
  `;

  const getUsers = async () => {
    try {
      const data = await fetchUsers();

      setUsers([]);
      setIsLoading(true);
      data.forEach(user => {
        setUsers(users => [...users, user.data()]);
      });
      setIsLoading(false);
      console.log(users);
    } catch (error) {
      // TODO NOPTYF
      console.error(error);
    }
  };

  const handleDelete = async function (id) {
    await deleteUser(id);
    getUsers();
  };

  const handleUpdate = function (event, newUser) {
    event.preventDefault();
    updateUser(newUser);
    setTimeout(() => getUsers(), 200);
  };

  // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer ensuite les données
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    // setCurrentPage(1);
  };

  // Filtrage des sneakers selon la recherche en comparant celle-ci au nom des sneakers
  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getUsers();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header></Header>
      <MainTitle title="Utilisateurs"></MainTitle>
      <FilterField
        name="Rechercher"
        label="Rechercher"
        placeholder="Veuillez un prénom, un nom, ou un email ..."
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
