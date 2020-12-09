import React from 'react';
import { FavoritesProvider } from './js/ContextAPI';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/style.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    <FavoritesProvider>
      <div className='App'>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/favorites' component={FavoritesPage} />
          </Switch>
        </Router>
      </div>
    </FavoritesProvider>
  );
}

export default App;
