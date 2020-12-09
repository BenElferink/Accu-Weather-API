import React from 'react';
import { FavoritesContext } from '../js/ContextAPI';

function AddToFavorites({ cityData }) {
  const [favorites, setFavorites] = React.useContext(FavoritesContext);

  return (
    <button
      className='fav-btn'
      onClick={() => {
        let copyOfFavorites = [...favorites],
          valid = true;

        for (let i = 0; i < copyOfFavorites.length; i++) {
          if (copyOfFavorites[i].Key === cityData.Key) {
            valid = false;
            break;
          }
        }

        if (valid) {
          copyOfFavorites.push(cityData);
          setFavorites(copyOfFavorites);
        } else {
          console.log('Current city already in favorites!');
        }
      }}>
      Add to favorites
    </button>
  );
}

export default AddToFavorites;
