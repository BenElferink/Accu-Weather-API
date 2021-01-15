import { useState, useEffect } from 'react';
import styles from './style/FiveDaysForecast.module.css';
import { getFiveDaysForecast } from '../../api/AccuWeatherAPI';

export default function FiveDaysForecast({ cityData }) {
  const [fiveDaysForecast, setFiveDaysForecast] = useState('Loading');

  // this useEffect is called every time the city data is changed,
  // it fetches the forecast and sets it to state
  useEffect(() => {
    getFiveDaysForecast(cityData.Key).then((apiData) => setFiveDaysForecast(apiData));
  }, [cityData]);

  // this function translates epoch date to a verbal day
  const getDayFromEpoch = (epoch) => {
    let itemDate = new Date(epoch * 1000);
    switch (itemDate.getDay()) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        break;
    }
  };

  switch (fiveDaysForecast) {
    case 'Loading':
      return <div className={styles.component}>Loading...</div>;

    case 'Error':
      return <div className={styles.component}>Error: API daily limit reached</div>;

    default:
      return (
        <div className={styles.component}>
          {fiveDaysForecast.map((item) => (
            <div key={item.EpochDate} className={styles.item}>
              <h5>{getDayFromEpoch(item.EpochDate)}</h5>
              <p>
                {
                  // Formula: (x°F − 32) × 5/9 = y°C
                  `High: ${parseInt(
                    (item.Temperature.Maximum.Value - 32) * (5 / 9),
                  )}°C / Low: ${parseInt((item.Temperature.Minimum.Value - 32) * (5 / 9))}°C`
                }
              </p>
              <div className={styles.wrapper}>
                <div>
                  <h6>Day:</h6>
                  <img
                    className={styles.image}
                    src={`https://www.accuweather.com/images/weathericons/${item.Day.Icon}.svg`}
                    alt='WeatherIcon'
                  />
                </div>
                <div>
                  <h6>Night:</h6>
                  <img
                    className={styles.image}
                    src={`https://www.accuweather.com/images/weathericons/${item.Night.Icon}.svg`}
                    alt='WeatherIcon'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
  }
}
