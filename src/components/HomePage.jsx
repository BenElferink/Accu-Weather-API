import React from 'react';
import { getStorage, setStorage } from './../js/localStorage';
import SearchField from './SearchField';
import AddToFavorites from './AddToFavorites';
import CurrentConditions from './CurrentConditions';
import FiveDaysForecast from './FiveDaysForecast';

export default function HomePage() {
  // default (onLoad): value = look for data in {localStorage}, if none, set default value: ('Tel Aviv' cityData)
  const [cityData, setCityData] = React.useState(
    getStorage(`AccuWeather_CityData_215854`, {
      AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
      Country: { ID: 'IL', LocalizedName: 'Israel' },
      Key: '215854',
      LocalizedName: 'Tel Aviv',
      Rank: 31,
      Type: 'City',
      Version: 1,
    })
  );
  console.log('🌐 -USING- cityData:', cityData);

  // Keeps localStorage updated with changes made to: (cityData)
  // data is static! does not change when fetched from API
  React.useEffect(() => {
    setStorage(`AccuWeather_CityData_${cityData.Key}`, cityData);
  }, [cityData]);

  return (
    <main>
      <SearchField setCityData={setCityData} />
      <AddToFavorites cityData={cityData} />
      <CurrentConditions cityData={cityData} />
      <FiveDaysForecast cityData={cityData} />
    </main>
  );
}
