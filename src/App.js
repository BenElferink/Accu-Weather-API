import { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './style/style.css';
import { getStorage, setStorage } from './js/localStorage';
import Header from './components/Header';
import HomePage from './components/HomePage';
import FavoritesPage from './components/FavoritesPage';

export default function App() {
  // default (onLoad): value = look for data in {localStorage}, if none, set default value: (empty Array)
  const [favorites, setFavorites] = useState(
    useCallback(() => getStorage('AccuWeather_Favorites', []), []),
  );

  // Keeps localStorage updated with changes made to: (favorites)
  useEffect(() => {
    setStorage('AccuWeather_Favorites', favorites);
  }, [favorites]);

  return (
    <div className='app'>
      <Router>
        <Header />
        <main className='main'>
          <Switch>
            <Route exact path='/'>
              <HomePage favorites={favorites} setFavorites={setFavorites} />
            </Route>
            <Route exact path='/favorites'>
              <FavoritesPage favorites={favorites} setFavorites={setFavorites} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}
