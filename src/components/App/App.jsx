import { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './style/App.module.css';
import { getStorage, setStorage } from './../../js/localStorage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';

function App() {
  // default (onLoad): value = look for data in {localStorage}, if none, set default value: (empty Array)
  const [favorites, setFavorites] = useState(
    useCallback(() => getStorage('AccuWeather_Favorites', []), []),
  );

  // Keeps localStorage updated with changes made to: (favorites)
  useEffect(() => {
    setStorage('AccuWeather_Favorites', favorites);
  }, [favorites]);

  return (
    <div className={styles.App}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <HomePage favorites={favorites} setFavorites={setFavorites} />
          </Route>
          <Route exact path='/favorites'>
            <FavoritesPage favorites={favorites} setFavorites={setFavorites} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
