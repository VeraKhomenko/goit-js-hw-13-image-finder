import { defaults, error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.mouseReset = false;
defaults.delay = 3000;

import markupOneCountry from '../templates/oneNameCountry.hbs';
import markupListCountries from '../templates/listNameCountries.hbs';
const listCountriesRef = document.querySelector('.js-list-countries');
const countryRef = document.querySelector('.js-info-country');

function addHandlers(templ) {
    listCountriesRef.innerHTML = '';
    countryRef.innerHTML = '';

    if (templ.status === 404) {
        error({
            text: 'No value found! Enter another query! ',
        });
        return;
    }

    if (templ.length === 1) {
        countryRef.insertAdjacentHTML('beforeend', markupOneCountry(...templ));
        return;
    }

    if (templ.length > 1 && templ.length <= 10) {
        listCountriesRef.insertAdjacentHTML(
            'beforeend',
            markupListCountries(templ),
        );
        notice({
            text: 'For more information enter a more specific query!',
        });
        return;
    }
    if (templ.length > 10) {
        error({
            text: 'Too many matches found. Please enter a more specific query!',
        });
    }
}

export default addHandlers;