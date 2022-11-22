import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import apiAx from './js/axios';
import LoadMoreBtn from './js/load';

const refs = {
  formSearch: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const apiAxios = new apiAx();

refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPosts);

function onSearch(e) {
  e.preventDefault();

  apiAxios.query = e.target.searchQuery.value.trim();
  loadMoreBtn.show();
  apiAxios.resetPage();
  clearGallery();
  fetchPosts();
}

function fetchPosts() {
  loadMoreBtn.disable();
  apiAxios.fetchPost().then(data => {
    if (!data.length) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    renderPost(data);
    loadMoreBtn.enable();
  });
}

function renderPost(data) {
  let markupPost = data
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery_img" href="${largeImageURL}">
                  <div class="photo">
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                      <div">
                        <p><b>Likes</b> ${likes}</p>
                        <p><b>Views</b> ${views}</p>
                        <p><b>Comments</b> ${comments}</p>
                        <p><b>Downloads</b> ${downloads}</p>
                      </div>
                    </div>
                 </a>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markupPost);
  createLiteBox();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function createLiteBox() {
  new SimpleLightbox('.gallery_img', {
    captionDelay: 300,
    captionsData: 'alt',
  });
}


























// ===================================================

// import { Notify } from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';


// const refs = {
//   formSearch: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// const URL = 'https://pixabay.com/api/';
// const KEY = '31420131-aff65dfb3f4bd8a8d020782c7';
// const OPTIONS = {
//       key: KEY,
//       q: this.searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: this.page,
//       per_page: 40,
//     };
// let page = null;
// let fetchQuery = null;

// const createGalleryCard = url =>
//   `<a class="gallery__item" href="${largeImageURL}">
//                   <div class="photo-card">
//                       <img src="${url}" alt="${tags}" loading="lazy" />
//                       <div class="info">
//                         <p class="info-item"><b>Likes</b> ${likes}</p>
//                         <p class="info-item"><b>Views</b> ${views}</p>
//                         <p class="info-item"><b>Comments</b> ${comments}</p>
//                         <p class="info-item"><b>Downloads</b> ${downloads}</p>
//                       </div>
//                     </div>
//                  </a>`;

// refs.formSearch.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', fetchPosts);

// function onSearch(e) {
//   e.preventDefault();
//     const inputValue = e.target.elements['searchQuery'].value.trim();
//     if (inputValue === '') return;
//     refs.gallery.innerHTML = '';
//     fetchQuery = inputValue;
//     page = 1;
// fetchImages(inputValue).then(processFetchResult).catch(processBadResponse);
//   refs.loadMoreBtn.classList.remove('is-hidden');
// }

// function processFetchResult({ results }) {
//   const arrImagesUrls = results.map(({ urls: { small } }) => small);

//   const markup = arrImagesUrls.map(createGalleryCard).join('');

//   galleryEl.insertAdjacentHTML('beforeend', markup);
// }




// function fetchPosts() {
//   loadMoreBtn.disable();
//   postApiService.fetchPost().then(data => {
//     if (!data.length) {
//       return Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }

//     renderPost(data);
//     loadMoreBtn.enable();
//   });
// }

// function renderPost(data) {
//   let markupPost = data
//     .map(
//       ({
//         largeImageURL,
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<a class="gallery__item" href="${largeImageURL}">
//                   <div class="photo-card">
//                       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//                       <div class="info">
//                         <p class="info-item"><b>Likes</b> ${likes}</p>
//                         <p class="info-item"><b>Views</b> ${views}</p>
//                         <p class="info-item"><b>Comments</b> ${comments}</p>
//                         <p class="info-item"><b>Downloads</b> ${downloads}</p>
//                       </div>
//                     </div>
//                  </a>`;
//       }
//     )
//     .join('');

//   refs.gallery.insertAdjacentHTML('beforeend', markupPost);
//   createLiteBox();
// }

// function clearGallery() {
//   refs.gallery.innerHTML = '';
// }

// function createLiteBox() {
//   new SimpleLightbox('.gallery__item', {
//     captionDelay: 250,
//     captionsData: 'alt',
//     enableKeyboard: true,
//   });
// }



// ============================================================

// import axios from 'axios';
// import Notiflix from 'notiflix';

// const itemPerPage = 40;

// const API_KEY = '31420131-aff65dfb3f4bd8a8d020782c7';
// const searchParams = new URLSearchParams({
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   per_page: itemPerPage,
// });

// const BASE_URL = `https://pixabay.com/api/?${searchParams}`;

// async function getPhoto(search, page) {
//   try {
//     if (!search.trim()) {
//       Notiflix.Notify.failure('Please fill in the search field');
//       return;
//     }
//     const response = await axios.get(`${BASE_URL}&page=${page}&q=${search}`);
//     return response.data;
//   } catch (error) {
//     Notiflix.Notify.failure(error.message);
//   }
// }



// // import './css/styles.css';
// // import { BASE_URL, getPhoto, itemPerPage } from './api/webApi';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const galleryEl = document.querySelector('.gallery');
// const formEl = document.querySelector('#search-form');
// const moreBtn = document.querySelector('.load-more');
// const totalPages = Math.ceil(500 / itemPerPage);
// let page = 1;
// let searchValue = '';

// formEl.addEventListener('submit', onSubmit);

// async function loadMoreCards(searchValue) {
//   page += 1;
//   const data = await getPhoto(searchValue, page);

//   createGalleryMarkup(data.hits);

//   if (page === totalPages) {
//     addClass('visually-hidden');
//   }
// }

// async function mountData(searchValue) {
//   try {
//     const data = await getPhoto(searchValue, page);

//     removeClass('visually-hidden');

//     moreBtn.removeEventListener('click', moreBtnClbc);
//     moreBtn.addEventListener('click', moreBtnClbc);

//     if (data.hits.length === 0) {
//       addClass('visually-hidden');
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     } else {
//       Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
//       createGalleryMarkup(data.hits);
//       doLightbox();
//     }
//   } catch (error) {
//     addClass('visually-hidden');
    
//     console.log('errooooor', error);
//   }
// }

// function moreBtnClbc() {
//   loadMoreCards(searchValue);
// }

// function createGalleryMarkup(cardsArr)
//  {
//   const markup = cardsArr
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<div class="photo-card">
//     <a class='link-img' href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy" class="card-img"/></a>
//   <div class="info">
//     <p class="info-item">
//       <b class="info-label">Likes </b><span class="info-span">${likes}</span>
//     </p>
//     <p class="info-item">
//       <b class="info-label">Views </b><span class="info-span">${views}</span>
//     </p>
//     <p class="info-item">
//       <b class="info-label">Comments </b><span class="info-span">${comments}</span>
//     </p>
//     <p class="info-item">
//       <b class="info-label">Downloads </b><span class="info-span">${downloads}</span>
//     </p>
//   </div>
// </div>`
//     )
//     .join('');

//   galleryEl.insertAdjacentHTML('beforeend', markup);
// }

// function doLightbox() {
//   const linkImg = document.querySelector('.link-img');
//   linkImg.addEventListener('click', openModal);

//   function openModal(event) {
//     event.preventDefault();
//   }

//   let lightbox = new SimpleLightbox('.photo-card a', {
//     captionDelay: 250,
//   });
// }

// function onSubmit(event) {
//   event.preventDefault();

//   clearMarkup(galleryEl);

//   searchValue = event.currentTarget[0].value;

//   console.log('searchValue', searchValue);

//   mountData(searchValue);
// }

// function clearMarkup(element) {
//   element.innerHTML = '';
// }

// function addClass(className) {
//   moreBtn.classList.add(className);
// }

// function removeClass(className) {
//   moreBtn.classList.remove(className);
// }


