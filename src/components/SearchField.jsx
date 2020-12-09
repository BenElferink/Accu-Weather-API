import React from 'react';
import { getStorage, setStorage } from './../js/localStorage';
import { apiKey } from './../js/AccuWeatherAPI';

function SearchField({ setCityData }) {
  // default (onLoad): value = empty 'String'
  // --> after (onChange): value = 'String'
  const [searchFieldText, setSearchFieldText] = React.useState('');
  console.log('🌐 -USING- searchFieldText:', searchFieldText);

  // default (onLoad): value = empty [Array]
  // --> after (fetch): value = [Array of {Objects}]
  const [searchResults, setSearchResults] = React.useState([]);
  console.log('🌐 -USING- searchResults:', searchResults);

  // Whenever the user types in the search field, this async function is called,
  // it checks if any data is available in localSotrage, using the search field's text,
  // if none exists for that text, then it fetches the search-results from it's API,
  // once fetched, the results are set to state.
  const doAutoComplete = async (e) => {
    let searchText = e.target.value;
    setSearchFieldText(searchText);

    // validate that the typed text is enlgish,
    if (searchText !== '') {
      let valid = true;
      for (let i = 0; i < searchText.length; i++) {
        if ((searchText.charAt(i) >= 'a' && searchText.charAt(i) <= 'z') || (searchText.charAt(i) >= 'A' && searchText.charAt(i) <= 'Z')) {
          continue;
        } else {
          valid = false;
          window.alert('Please use English-alphabetical letters only!');
          break;
        }
      }

      // if above validation is 'true', do check localStorage, and setState accordingly
      if (valid) {
        setSearchResults(
          await getStorage(`AccuWeather_SearchResults_${searchText}`, async () => {
            try {
              const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${searchText}`);
              const data = await response.json();
              console.log(`✅ -FETCHED- searchResults: ${searchText}`, data);
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
            }
          })
        );
      }
    } else {
      setSearchResults([]);
    }
  };

  // Each time 'searchResults' is updated,
  // it's content is saved to localStorage
  // using the 'searchFieldText'.
  // data is static! does not change when fetched from API
  React.useEffect(() => {
    if (searchFieldText !== '') {
      setStorage(`AccuWeather_SearchResults_${searchFieldText}`, searchResults);
    }
    // eslint-disable-next-line
  }, [searchResults]);

  return (
    <div className='search-field'>
      <input type='text' value={searchFieldText} onChange={doAutoComplete} />
      <div className='search-list'>
        {searchResults.map((item) => (
          <div
            key={item.Key}
            className='search-item'
            onClick={() => {
              // --> will cause 2 API calls (in: <CurrentConditions /> && <FiveDaysForecast />)
              setCityData(item);
              setSearchFieldText('');
              setSearchResults([]);
            }}>
            {item.LocalizedName}, {item.Country.ID}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchField;
