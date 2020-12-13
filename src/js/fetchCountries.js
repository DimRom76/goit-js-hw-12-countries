import errorNotification from './errorNotification';
const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
  const url = `${BASE_URL}${searchQuery}`;

  return fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .catch(err => {
      // console.error('Error: ', err);
      errorNotification(
        'Something went wrong',
        'No data received or nothing found',
      );
      return err;
    });
}

export default fetchCountries;
