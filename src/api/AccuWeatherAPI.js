// Limited to 50 calls per day !!!
const apiKey = process.env.REACT_APP_API_KEY;
console.log(`🌐 -USING- apiKey: ${apiKey}`);

export const getSearchResults = async (cityName) => {
  try {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete',
      query = `?apikey=${apiKey}&q=${cityName}`;
    const response = await fetch(base + query);
    const data = await response.json();
    console.log(`✅ -FETCHED- searchResults: ${cityName}`, data);
    return data;
    // data = [
    //   {
    //     AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
    //     Country: { ID: 'IL', LocalizedName: 'Israel' },
    //     Key: '215854',
    //     LocalizedName: 'Tel Aviv',
    //     Rank: 31,
    //     Type: 'City',
    //     Version: 1,
    //   },
    //   {...},
    //   {...},
    //   {...},
    // ];
  } catch (error) {
    console.warn(error);
    return 'Error';
  }
};

export const getCurrentConditions = async (locationKey) => {
  try {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/',
      query = `${locationKey}?apikey=${apiKey}`;
    const response = await fetch(base + query);
    const data = await response.json();
    console.log(`✅ -FETCHED- currentConditions: ${locationKey}`, data);
    return data[0];
    // data = [
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
  } catch (error) {
    console.warn(error);
    return 'Error';
  }
};

export const getFiveDaysForecast = async (locationKey) => {
  try {
    const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/',
      query = `${locationKey}?apikey=${apiKey}`;
    const response = await fetch(base + query);
    const data = await response.json();
    console.log(`✅ -FETCHED- fiveDaysForecast: ${locationKey}`, data);
    return data.DailyForecasts;
    // data = {
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
  } catch (error) {
    console.warn(error);
    return 'Error';
  }
};
