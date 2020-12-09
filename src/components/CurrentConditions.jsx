import React from 'react';
import { apiKey } from './../js/AccuWeatherAPI';
import UseFetch from './UseFetch';

export default function CurrentConditions({ cityData }) {
  const { apiData, loading } = UseFetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=${apiKey}`);
  console.log('🌐 -USING- currentConditions:', apiData);
  // apiData = [
  //   {
  //     EpochTime: 1607291460,
  //     HasPcipitation: false,
  //     IsDayTime: false,
  //     Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
  //     LocalObservationDateTime: '2020-12-06T23:51:00+02:00',
  //     MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
  //     PrecipitationType: null,
  //     Temperature: { Metric: { Value: 16.1, Unit: 'C', UnitType: 17 }, Imperial: { Value: 61, Unit: 'F', UnitType: 18 } },
  //     WeatherIcon: 34,
  //     WeatherText: 'Mostly clear',
  //   },
  // ];

  return loading ? (
    <div>Loading...</div>
  ) : (
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
}
