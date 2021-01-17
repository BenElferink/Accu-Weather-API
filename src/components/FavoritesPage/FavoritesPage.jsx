import styles from './style/FavoritesPage.module.css';
import CurrentConditions from '../CurrentConditions/CurrentConditions';

function FavoritesPage({ favorites, setFavorites }) {
  // this function filters-out the location selected for removal
  const removeFromFavorites = (locationKey) => {
    let copyOfFavorites = [...favorites];
    let filteredCopyOfFavorites = copyOfFavorites.filter((fav) => fav.Key !== locationKey);
    setFavorites(filteredCopyOfFavorites);
  };

  return (
    <>
      <div className={styles.favorites}>
        {!favorites.length ? (
          <div>No favorites added</div>
        ) : (
          favorites.map((item) => (
            <div className={styles.item} key={item.Key}>
              <span className={styles.delete} onClick={() => removeFromFavorites(item.Key)}>
                &times;
              </span>
              <CurrentConditions cityData={item} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default FavoritesPage;
