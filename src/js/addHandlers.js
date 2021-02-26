import galleryTpl from '../templates/galleryItem.hbs';
import refs from './refs';

import { defaults, error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

defaults.mouseReset = false;
defaults.delay = 3000;
defaults.styling = 'material';
defaults.icons = 'material';


export default {
    addItemList({ hits, totalHits, status }) {
        if (status === 503) {
            error({
                text: `The server is temporarily unavailable. Please try again later. Code error ${status}`,
            });
            return;
        }

        if (totalHits === 0) {
            notice({
                text: 'No results were found for your search!',
            });
            return;
        }
        refs.pnotifyMessage.insertAdjacentHTML('beforeend', galleryTpl(hits));
    },
    clearList() {
        refs.pnotifyMessage.innerHTML = '';
    },
};