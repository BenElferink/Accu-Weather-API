import { useState, useEffect } from 'react';
import styles from './style/SearchField.module.css';
import { getStorage, setStorage } from './../../js/localStorage';
import { getSearchResults } from '../../api/AccuWeatherAPI';

function SearchField({ setCityData }) {
  // default (onLoad): value = empty 'String'
  // --> after (onChange): value = 'String'
  const [searchFieldText, setSearchFieldText] = useState('');

  // default (onLoad): value = empty [Array]
  // --> after (fetch): value = [Array of {Objects}]
  const [searchResults, setSearchResults] = useState([]);

  // Whenever the user types in the search field, this async function is called,
  // it checks if any data is available in localSotrage, using the search field's text,
  // if none exists for that text, then it fetches the search-results from it's API,
  // once fetched, the results are set to state.
  const doAutoComplete = async (e) => {
    let searchText = e.target.value;
    setSearchFieldText(searchText);

    if (searchText === '') {
      setSearchResults([]);
    } else {
      // validate that the typed text is English
      let valid = true;
      for (let i = 0; i < searchText.length; i++) {
        if (
          (searchText.charAt(i) >= 'a' && searchText.charAt(i) <= 'z') ||
          (searchText.charAt(i) >= 'A' && searchText.charAt(i) <= 'Z') ||
          searchText.charAt(i) === ' '
        ) {
          continue;
        } else {
          valid = false;
          window.alert('Please use English-alphabetical letters!');
          break;
        }
      }

      // if above validation is 'true', do check localStorage, and setState accordingly
      if (valid) {
        setSearchResults(
          await getStorage(
            `AccuWeather_SearchResults_${searchText}`,
            await getSearchResults.bind(this, searchText),
          ),
        );
      }
    }
  };

  // this keeps the search results in localStorage, because the data is static,
  // it doesn't change from one request to another
  useEffect(() => {
    if (searchResults !== 'Error')
      setStorage(`AccuWeather_SearchResults_${searchFieldText}`, searchResults);
    // eslint-disable-next-line
  }, [searchResults]);

  return (
    <div className={styles.component}>
      <input
        className={styles.input}
        type='text'
        placeholder='Search a city...'
        value={searchFieldText}
        onChange={doAutoComplete}
      />

      <div className={styles.list}>
        {searchResults === 'Error' ? (
          <div className={styles.listItem}>Error: API daily limit reached</div>
        ) : (
          searchResults.map((item) => (
            <div
              key={item.Key}
              className={styles.listItem}
              onClick={() => {
                // --> will cause 2 API calls (in: <CurrentConditions /> && <FiveDaysForecast />)
                setCityData(item);
                setSearchFieldText('');
                setSearchResults([]);
              }}>
              {item.LocalizedName}, {item.Country.ID}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchField;
