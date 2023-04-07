import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34919786-dfee0391f92fa2ae99264bebb';

  page = 1;
  perPage = 40;
  q = '';

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}/`, {
      params: {
        q: this.q,
        page: this.page,
        per_page: this.perPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        key: this.#API_KEY,
      },
    });
  }
  pageReset() {
    this.page = 1;
  }
}
