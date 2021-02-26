import galleryTpl from '../templates/galleryItem.hbs';
import refs from './refs';

function updateDataMarkup(data) {
    const markup = galleryTpl(data);
    refs.dataContainer.insertAdjacentHTML('beforeend', markup);
}
export default updateDataMarkup;