import React from 'react';
import CurrentConditions from './CurrentConditions';
import { FavoritesContext } from '../js/ContextAPI';

function FavoritesPage() {
  const [favorites, setFavorites] = React.useContext(FavoritesContext);

  return (
    <main>
      <div className='favorites'>
        {favorites.map((item) => (
          <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: '0', right: '0', color: '#ff0000', fontSize: '24px', cursor: 'pointer' }}
              onClick={() => {
                let copyOfFavorites = [...favorites];
                let filteredCopyOfFavorites = copyOfFavorites.filter((fav) => fav.Key !== item.Key);
                setFavorites(filteredCopyOfFavorites);
              }}>
              &times;
            </span>
            <CurrentConditions key={item.Key} cityData={item} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default FavoritesPage;
