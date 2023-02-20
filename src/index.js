import '../src/CSS/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './JS/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refInput = document.querySelector('input');
const refCountryList = document.querySelector('.country-list');
const refCountryInfo = document.querySelector('.country-info');

refInput.addEventListener('input', debounce(inputCountryName, DEBOUNCE_DELAY));

function inputCountryName(event) {
  refCountryInfo.innerHTML = '';
  refCountryList.innerHTML = '';
  refCountryList.classList.remove('country-name-one');
  let inputValue = refInput.value.trim();
  if (inputValue.length === 0) return;
  fetchCountries(inputValue)
    .then(countries => {
      let markUpCountriesList = createMarkupCountryList(countries);
      if (markUpCountriesList) {
        insertMarkUpToHTML(refCountryList, markUpCountriesList);
      }
      if (countries.length === 1) {
        refCountryList.classList.add('country-name-one');
        let markUpCountryInfo = createMarkupCountryInfo(countries[0]);
        insertMarkUpToHTML(refCountryInfo, markUpCountryInfo);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(`${error.message}`, {
        timeout: 4000,
      });
    });
}

function createMarkupCountryList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      {
        timeout: 2000,
      }
    );
    return;
  }
  return countries.reduce(
    (accum, { name, flag }) =>
      accum +
      `<li class='country-name'><img src ="${flag}" class='country-flag' width=45 height=36></img>${name}</li>`,
    ''
  );
}

function createMarkupCountryInfo({ capital, population, languages }) {
  return `
   <ul class=country-info>
   <li class='country-capital'> <b>Capital</b>: ${capital} </li>
   <li class='country-capital'> <b>Population</b> : ${population} </li>
   <li class='country-capital'> <b>Languages</b>: ${createLanguagesList(
     languages
   )} </li>
   </ul>`;
}

function insertMarkUpToHTML(place, markUp) {
  place.insertAdjacentHTML('beforeend', markUp);
}
function createLanguagesList(languages) {
  return languages.map(item => item.name).join(', ');
}
