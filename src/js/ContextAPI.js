import React from 'react';
import { getStorage, setStorage } from './localStorage';
export const FavoritesContext = React.createContext();
export const FavoritesProvider = (props) => {
  // default (onLoad): value = look for data in {localStorage}, if none, set default value: (empty Array)
  const [favorites, setFavorites] = React.useState(getStorage('AccuWeather_Favorites', []));
  console.log('🌐 -USING- favorites:', favorites);

  // Keeps localStorage updated with changes made to: (favorites)
  React.useEffect(() => {
    setStorage('AccuWeather_Favorites', favorites);
  }, [favorites]);

  return <FavoritesContext.Provider value={[favorites, setFavorites]}>{props.children}</FavoritesContext.Provider>;
};
