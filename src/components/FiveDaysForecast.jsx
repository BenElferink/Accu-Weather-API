import React from 'react';
import { getFiveDaysForecast } from './../js/AccuWeatherAPI';
import { getDayFromEpoch } from './../js/epoch';

export default function FiveDaysForecast({ cityData }) {
  const [fiveDaysForecast, setFiveDaysForecast] = React.useState('Loading...');
  console.log('🌐 -USING- fiveDaysForecast:', fiveDaysForecast);

  React.useEffect(() => {
    getFiveDaysForecast(cityData.Key).then((apiData) => {
      setFiveDaysForecast(
        <div className='five-day-forecast'>
          {apiData.DailyForecasts.map((item) => (
            <div key={item.EpochDate} className='five-day-item'>
              <h5>{getDayFromEpoch(item.EpochDate)}</h5>
              <p>
                {/* Formula: (x°F − 32) × 5/9 = y°C */}
                High: {parseInt((item.Temperature.Maximum.Value - 32) * (5 / 9))}°C / Low: {parseInt((item.Temperature.Minimum.Value - 32) * (5 / 9))}°C
              </p>
              <div className='wrapper-time-of-day'>
                <div className='time-of-day'>
                  <h6>Day:</h6>
                  <img src={`https://www.accuweather.com/images/weathericons/${item.Day.Icon}.svg`} alt='WeatherIcon' />
                </div>
                <div className='time-of-day'>
                  <h6>Night:</h6>
                  <img src={`https://www.accuweather.com/images/weathericons/${item.Night.Icon}.svg`} alt='WeatherIcon' />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    });
  }, [cityData]);

  return fiveDaysForecast;
}
