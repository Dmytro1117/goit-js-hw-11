import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '31420131-aff65dfb3f4bd8a8d020782c7';

export default class PostsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPost() {
    const OPTIONS = new URLSearchParams({
      key: KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    try {
      const response = await axios.get(`${URL}?${OPTIONS.toString()}`);

      this.incrementPage();

      return response.data.hits;
    } catch (error) {
      console.error(error.toJSON());
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
