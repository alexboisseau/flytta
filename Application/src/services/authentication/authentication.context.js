import React, { useState, createContext } from 'react';
import * as firebase from 'firebase';

import {
  getAvatarUser,
  loginRequest,
  registerRequest,
  updateUser,
  updateUserAvatarRequest,
} from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  firebase.auth().onAuthStateChanged((u) => {
    if (u) setUser(u);
    setIsLoading(false);
  });

  const onLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const u = await loginRequest(email, password);
      setUser(u);
    } catch (e) {
      setError(e.toString());
    }

    setIsLoading(false);
  };

  const onUpdateProfile = async (
    newUser,
    firstName,
    lastName,
    email,
    city,
    description,
    image
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.city = city;
      newUser.description = description;
      await updateUserAvatarRequest(image, newUser.userId);
      const urlAvatar = await getAvatarUser(newUser.userId);
      newUser.avatar = urlAvatar;
      await updateUser(newUser);
    } catch (e) {
      setError(e.toString());
    }

    setIsLoading(false);
  };

  const onRegister = async (
    firstName,
    lastName,
    city,
    birthdayDate,
    email,
    password,
    repeatedPassword
  ) => {
    if (password !== repeatedPassword) {
      setError('Les mots de passes ne correspondent pas');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const u = await registerRequest(email, password);
      await firebase.firestore().collection('users').doc(u.user.uid).set({
        userUid: u.user.uid,
        firstName,
        lastName,
        city,
        birthdayDate,
        email,
        isAdmin: false,
      });
      setUser(u);
    } catch (e) {
      setError(e.toString());
    }

    setIsLoading(false);
  };

  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        clearError,
        onUpdateProfile,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
