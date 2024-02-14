import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    formEl: document.querySelector('.js-search-form'),
    imgEl: document.querySelector('.js-image-container'),
    loaderEl: document.querySelector('.loader'),
    loadMoreBtn: document.querySelector('.load-more-btn')
};

let currentPage = 1;
let currentQuery = '';

if (refs.formEl) {
    refs.formEl.addEventListener('submit', onFormSubmit);
}

if (refs.loadMoreBtn) {
    refs.loadMoreBtn.addEventListener('click', loadMoreImages);
}

async function onFormSubmit(e) {
    e.preventDefault();
    currentPage = 1;
    currentQuery = e.target.elements.text.value.trim();

    if (!currentQuery) {
        iziToast.error({
            position: "topRight",
            message: 'Please enter a search query!',
        });
        return;
    }

    toggleLoader(true);

    try {
        const data = await getImg(currentQuery, currentPage);
        renderImg(data);
        if (data.hits.length === 0) {
            toggleLoader(false);
            toggleLoadMoreButton(false);
            // Show message about end of collection
        } else {
            toggleLoadMoreButton(true);
            toggleLoader(false);
            currentPage++;
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        toggleLoader(false);
        toggleLoadMoreButton(false);
        clearGallery();
        iziToast.error({
            position: "topRight",
            message: 'Failed to fetch images. Please try again later.',
        });
    } finally {
        e.target.elements.text.value = '';
    }
}

// async function loadMoreImages() {
//     try {
//         const data = await getImg(currentQuery, currentPage);
//         renderImg(data);
//         if (data.hits.length === 0) {
//             toggleLoadMoreButton(false);
//             // Show message about end of collection
//         } else {
//             currentPage++;
//         }
//     } catch (error) {
//         console.error('Error fetching more images:', error);
//         // Show error message
//     }
// }
async function loadMoreImages() {
    try {
        toggleLoaderChange(true);
        const data = await getImg(currentQuery, currentPage);
        renderImg(data);
        toggleLoaderChange(false);
        if (data.hits.length === 0) {
            toggleLoadMoreButton(false);
            toggleLoaderChange(false);
            // Показати повідомлення про кінець колекції
            showEndOfSearchMessage();
        } else {
            toggleLoaderChange(false);
            currentPage++;
        }
    } catch (error) {
        toggleLoaderChange(false);
        console.error('Error fetching more images:', error);
        // Показати повідомлення про помилку
    }
}

function showEndOfSearchMessage() {
    const endOfSearchMessage = document.createElement('p');
    endOfSearchMessage.textContent = "We're sorry, but you've reached the end of search results.";
    refs.imgEl.insertAdjacentElement('beforebegin', endOfSearchMessage);
}


async function getImg(query, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '42295751-6e09ed05d50a99192d667c3e9';

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 15
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}

function imgTemplate(photo) {
    return `
        <a href="${photo.largeImageURL}" class="photo-container" data-lightbox="photos">
            <img
                src="${photo.webformatURL}"
                alt="${photo.tags}"
                class="photo"
            />
            
            <div class="photo-body">
                <p class="photo-name">Likes ${photo.likes}</p>
                <p class="photo-name">Views ${photo.views}</p>
                <p class="photo-name">Comments ${photo.comments}</p>
                <p class="photo-name">Downloads ${photo.downloads}</p>
            </div>
        </a>
    `;
}

function renderImg(data) {
    toggleLoadMoreButton(false);
    if (currentPage === 1) {
        clearGallery();
    }
    refs.imgEl.innerHTML += data.hits.map(img => imgTemplate(img)).join('');

    const lightbox = new SimpleLightbox('[data-lightbox="photos"]');
    lightbox.refresh();

    toggleLoadMoreButton(true);
    smoothScrollToNextImages();
}

function smoothScrollToNextImages() {
    const galleryItem = document.querySelector('.photo-container'); // Отримуємо перший елемент галереї
    if (galleryItem) {
        const cardHeight = galleryItem.getBoundingClientRect().height; // Отримуємо висоту карточки галереї
        const scrollAmount = cardHeight * 2; // Обчислюємо кількість пікселів для прокрутки

        window.scrollBy({
            top: scrollAmount,
            behavior: 'smooth' // Включаємо плавну прокрутку
        });
    }
}
function clearGallery() {
    refs.imgEl.innerHTML = '';
}

function toggleLoader(isVisible) {
    refs.loaderEl.style.display = isVisible ? 'inline-block' : 'none';
    refs.loaderEl.style.bottom = isVisible ? '50%' : '50%';
}

function toggleLoadMoreButton(isVisible) {
    refs.loadMoreBtn.style.display = isVisible ? 'block' : 'none';
}
function toggleLoaderChange(isTrue) {
    refs.loaderEl.style.display = isTrue ? 'inline-block' : 'none';
    refs.loaderEl.style.bottom = isTrue ? '0' : '50%';
}