import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import UserContext from './providers/UserProvider';

// PAGES AND COMPONENTS
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import EventsPage from './pages/EventsPage';

function App() {
  const [user, setUser] = useState(null);
  const userContextValues = { user, setUser };

  const onAuthStateChanged = function (user) {
    setUser(user);
  };

  useEffect(() => {
    return auth.onAuthStateChanged(onAuthStateChanged);
  }, []);

  let routes = (
    <Switch>
      <Route path="/">
        <LoginPage />
      </Route>
    </Switch>
  );

  if (user) {
    routes = (
      <Switch>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/events">
          <EventsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    );
  }

  return (
    <UserContext.Provider value={userContextValues}>
      <Router>{routes}</Router>
    </UserContext.Provider>
  );
}

export default App;
