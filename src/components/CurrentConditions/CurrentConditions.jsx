import { useState, useEffect } from 'react';
import { getCurrentConditions } from '../../api/AccuWeatherAPI';
import styles from './style/CurrentConditions.module.css';

export default function CurrentConditions({ cityData }) {
  const [currentConditions, setCurrentConditions] = useState('Loading');

  useEffect(() => {
    getCurrentConditions(cityData.Key).then((apiData) => {
      setCurrentConditions(apiData);
    });
  }, [cityData]);

  switch (currentConditions) {
    case 'Loading':
      return <div className={styles.component}>Loading...</div>;

    case 'Error':
      return <div className={styles.component}>Error: API daily limit reached</div>;

    default:
      return (
        <div className={styles.component}>
          <h5>
            {cityData.LocalizedName} ({currentConditions.IsDayTime ? 'Day' : 'Night'})
          </h5>
          <img
            src={`https://www.accuweather.com/images/weathericons/${currentConditions.WeatherIcon}.svg`}
            alt='weather icon'
          />
          <p>
            {currentConditions.Temperature.Metric.Value}°{currentConditions.Temperature.Metric.Unit}{' '}
            / {currentConditions.Temperature.Imperial.Value}°
            {currentConditions.Temperature.Imperial.Unit}
            <br />
            {currentConditions.WeatherText}
          </p>
        </div>
      );
  }
}
