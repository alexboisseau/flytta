import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/UsersService';
import { UsersList } from '../components/Users/UsersList';

// PAGES / COMPONENTS / STYLES
import Header from '../components/Header/Header';
import MainTitle from '../components/MainTitle';
import FilterField from '../components/FilterField/FilterField';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const getUsers = async () => {
    try {
      const data = await fetchUsers();

      setUsers([]);
      data.forEach(user => {
        setUsers(users => [...users, user.data()]);
      });
    } catch (error) {
      // TODO NOPTYF
      console.error(error);
    }
  };

  const handleDelete = async function (id) {
    await deleteUser(id);
    getUsers();
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
      <UsersList users={filteredUsers} onDelete={handleDelete} />
    </>
  );
};

export default UsersPage;
