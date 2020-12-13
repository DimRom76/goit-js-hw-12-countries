var debounce = require('lodash.debounce');
import errorNotification from './js/errorNotification';
import fetchCountries from './js/fetchCountries';
import './css/styles.css';
import countryTpl from './temlates/country.hbs';
import foundCountriesTpl from './temlates/foundCountries.hbs';

const refs = {
  inputCountry: document.querySelector('.js-input-country'),
  spinner: document.querySelector('.spinner-grow'),
  countryCard: document.querySelector('.js-country-card'),
  foundCountry: document.querySelector('.js-found-countries'),
};

refs.inputCountry.addEventListener('input', debounce(onInputCountry, 500));
refs.foundCountry.addEventListener('click', onClickListCountry);

function updateCountry(country) {
  refs.countryCard.innerHTML = countryTpl(country);
  refs.countryCard.classList.remove('is-hidden');
}

function updateFoundCountry(countries) {
  refs.foundCountry.innerHTML = foundCountriesTpl(countries);
  refs.foundCountry.classList.remove('is-hidden');
}

function updateView(countries) {
  refs.countryCard.classList.add('is-hidden');
  refs.foundCountry.classList.add('is-hidden');
  refs.spinner.classList.add('is-hidden');
  if (countries.length > 10) {
    errorNotification(
      'Too many matches found.',
      'Please enter a more specific query!',
    );
    return;
  }

  if (countries.length === 1) {
    updateCountry(countries[0]);
    return;
  }

  updateFoundCountry(countries);
}

function onInputCountry(e) {
  const currentInput = e.target.value;
  if (!currentInput) {
    return;
  }
  refs.spinner.classList.remove('is-hidden');
  fetchCountries(currentInput)
    .then(updateView)
    .catch(err => console.log(err));
}

function onClickListCountry(e) {
  const currentCountry = e.target.textContent;
  refs.spinner.classList.remove('is-hidden');
  fetchCountries(currentCountry).then(data => {
    refs.spinner.classList.add('is-hidden');
    updateCountry(data[0]);
  });
}

console.log();
