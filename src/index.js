import './sass/styles.scss';
import apiService from './js/apiService.js';
import refs from './js/refs'


import updateDataMarkup from './js/update-data-markup';
// import clearList from './js/update-data-markup';

import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import { defaults, error, notice } from '@pnotify/core';

defaults.mouseReset = false;
defaults.delay = 1000;
defaults.styling = 'material';
defaults.icons = 'material';

refs.buttonReset.addEventListener('click', onClickReset)
refs.searchFormRef.addEventListener('submit', search);
refs.loadMoreBtn.addEventListener('click', receiveData);

function onClickReset() {
    refs.searchFormRef.reset();
    refs.dataContainer.value = '';
    updateDataMarkup.clearList();
    refs.loadMoreBtn.classList.add('is-hidden');
    // form.reset();
}

function search(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.query.value;
    if (!searchQuery) {
        refs.loadMoreBtn.classList.add('is-hidden');
        notice({
            text: 'Enter a query, please!',
        });
        return;
    }
    apiService.query = searchQuery;
    refs.dataContainer.innerHTML = '';
    apiService.resetPage();
    receiveData();

}

function receiveData() {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.spinnerRef.classList.remove('is-hidden');

    apiService
        .receiveData()
        .then(data => {
            if (data.hits.length != 0) {
                refs.loadMoreBtn.classList.remove('is-hidden');
                refs.spinnerRef.classList.add('is-hidden');
            }
            updateDataMarkup.updateDataMarkup(data);


            window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: 'smooth'
            });
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
            `<img width="1400" height="900" src="${event.target.dataset.largeimage}">`,
        )
        .show();
}

refs.dataContainer.addEventListener('click', onClickImg);