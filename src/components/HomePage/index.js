import { useState, useEffect, useCallback } from 'react';
import { getStorage, setStorage } from '../../js/localStorage';
import styles from './style/HomePage.module.css';
import SearchField from '../SearchField';
import CurrentConditions from '../CurrentConditions';
import FiveDaysForecast from '../FiveDaysForecast';

export default function HomePage({ favorites, setFavorites }) {
  // default (onLoad): value = look for data in {localStorage}, if none, set default value: ('Tel Aviv' cityData)
  const [cityData, setCityData] = useState(
    useCallback(
      () =>
        getStorage(`AccuWeather_CityData_215854`, {
          AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
          Country: { ID: 'IL', LocalizedName: 'Israel' },
          Key: '215854',
          LocalizedName: 'Tel Aviv',
          Rank: 31,
          Type: 'City',
          Version: 1,
        }),
      [],
    ),
  );

  // Keeps localStorage updated with changes made to: (cityData)
  // data is static! does not change when fetched from API
  useEffect(() => {
    if (cityData !== 'Error') setStorage(`AccuWeather_CityData_${cityData.Key}`, cityData);
  }, [cityData]);

  // this function adds the city data to the favorites array
  const addToFavorites = () => {
    let copyOfFavorites = [...favorites],
      valid = true;
    // verify that this location doesn't already exist in favorites
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
      alert('Current city already in favorites!');
    }
  };

  return (
    <>
      <SearchField setCityData={setCityData} />
      <button className={styles.button} onClick={addToFavorites}>
        Add to favorites
      </button>

      <CurrentConditions cityData={cityData} />
      <FiveDaysForecast cityData={cityData} />
    </>
  );
}
