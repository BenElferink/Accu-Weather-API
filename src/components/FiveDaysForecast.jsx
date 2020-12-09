import React from 'react';
import { apiKey } from './../js/AccuWeatherAPI';
import UseFetch from './UseFetch';
import { getDayFromEpoch } from './../js/epoch';

export default function FiveDaysForecast({ cityData }) {
  const { apiData, loading } = UseFetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityData.Key}?apikey=${apiKey}`);
  console.log('🌐 -USING- fiveDaysForecast:', apiData);
  // apiData = {
  //   DailyForecasts: [
  //     {
  //       Date: '2020-12-06T07:00:00+02:00',
  //       Day: { Icon: 14, IconPhrase: 'Partly sunny w/ showers', HasPrecipitation: true, PrecipitationType: 'Rain', PrecipitationIntensity: 'Light' },
  //       EpochDate: 1607230800,
  //       Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
  //       MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
  //       Night: { Icon: 38, IconPhrase: 'Mostly cloudy', HasPrecipitation: false },
  //       Sources: ['AccuWeather'](1),
  //       Temperature: { Minimum: { Value: 50, Unit: 'F', UnitType: 18 }, Maximum: { Value: 69, Unit: 'F', UnitType: 18 } },
  //     },
  //     {...},
  //     {...},
  //     {...},
  //   ],
  //   Headline: {
  //     Category: 'rain',
  //     EffectiveDate: '2020-12-09T07:00:00+02:00',
  //     EffectiveEpochDate: 1607490000,
  //     EndDate: '2020-12-09T19:00:00+02:00',
  //     EndEpochDate: 1607533200,
  //     Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
  //     MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us',
  //     Severity: 5,
  //     Text: 'Expect showers Wednesday',
  //   },
  // };

  return loading ? (
    <div>Loading...</div>
  ) : (
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
}
