'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { PixabayAPI } from './pixabay-api';
import { createGalleryCards } from './create-gallery-cards';

const searchFormEl = document.querySelector('.js-search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const pixabayApi = new PixabayAPI();

let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const onSearchFormSubmit = async event => {
  event.preventDefault();
  pixabayApi.page = 1;

  const searchQuery = event.currentTarget.elements['searchQuery'].value
    .trim()
    .toLowerCase();
  pixabayApi.q = searchQuery;

  try {
    const { data } = await pixabayApi.fetchPhotos();
    console.log(data);
    console.log(pixabayApi.page);

    if (!data.hits.length) {
      galleryListEl.innerHTML = '';
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        { clickToClose: true }
      );
      return;
    }

    if (pixabayApi.page === data.totalHits / data.hits.length) {
      loadMoreBtnEl.classList.add('is-hidden');
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.`, {
      clickToClose: true,
    });

    galleryListEl.innerHTML = createGalleryCards(data.hits);
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async () => {
  pixabayApi.page += 1;
  console.log(pixabayApi.page);

  try {
    const { data } = await pixabayApi.fetchPhotos();
    console.log(data);

    if (data.totalHits < pixabayApi.page * pixabayApi.perPage) {
      loadMoreBtnEl.classList.add('is-hidden');
    }

    galleryListEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
