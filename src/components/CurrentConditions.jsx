import React from 'react';
import { getCurrentConditions } from './../js/AccuWeatherAPI';

export default function CurrentConditions({ cityData }) {
  const [currentConditions, setCurrentConditions] = React.useState('Loading...');
  console.log('🌐 -USING- currentConditions:', currentConditions);

  React.useEffect(() => {
    getCurrentConditions(cityData.Key).then((apiData) => {
      setCurrentConditions(
        <div className='current-conditions'>
          <h5>
            {cityData.LocalizedName} ({apiData[0].IsDayTime ? 'Day' : 'Night'})
          </h5>
          <img src={`https://www.accuweather.com/images/weathericons/${apiData[0].WeatherIcon}.svg`} alt='WeatherIcon' />
          <p>
            {apiData[0].Temperature.Metric.Value}°{apiData[0].Temperature.Metric.Unit} / {apiData[0].Temperature.Imperial.Value}°{apiData[0].Temperature.Imperial.Unit}
            <br />
            {apiData[0].WeatherText}
          </p>
        </div>
      );
    });
  }, [cityData]);

  return currentConditions;
}
