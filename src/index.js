import './sass/styles.scss';
import apiService from './js/apiService';
import refs from './js/refs'
// import addHandlers from './js/addHandlers';
import updateDataMarkup from './js/update-data-markup';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import { defaults, error, notice } from '@pnotify/core';

defaults.mouseReset = false;
defaults.delay = 1000;
defaults.styling = 'material';
defaults.icons = 'material';

refs.searchFormRef.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    const searchQuery = form.elements.query.value;
    if (!searchQuery) {
        notice({
            text: 'Enter a query, please!',
        });
        return;
    }
    apiService.query = searchQuery;
    refs.dataContainer.innerHTML = '';


    apiService.resetPage();
    receiveData();
    form.reset();
});

refs.loadMoreBtn.addEventListener('click', receiveData);

function receiveData() {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.spinnerRef.classList.remove('is-hidden');

    apiService
        .receiveData()
        .then(data => {

            updateDataMarkup(data);
            refs.loadMoreBtn.classList.remove('is-hidden');

            // window.scrollTo({
            //     top: document.documentElement.offsetHeight,
            //     behavior: 'smooth'
            // });
        })
        .finally(() => {
            refs.spinnerRef.classList.add('is-hidden');

        });
}

function onClickImg(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    basicLightbox
        .create(
            `<img width="1400" height="900" src="${event.target.dataset.largeImage}">`,
        )
        .show();
}

refs.dataContainer.addEventListener('click', onClickImg);
//  onChangeNameCountry(event) {
//     if (!event.target.value) {
//         return;
//     }
//     fetchCountries(event.target.value).then(addHandlers).catch(console.error);
// }

// nameCountry.addEventListener('input', debounce(onChangeNameCountry, 500));