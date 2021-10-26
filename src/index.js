import './css/styles.css';
import FetchImage from "./fetch-image";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import galleryBuilder from "./gallery-image.hbs";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchVideo from './fetch-video';
import galleryVideoBuilder from './gallery-video.hbs';



const formEl = document.querySelector('#search-form');
const GalleryContainerEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const loadMoreVideoBtnEl = document.querySelector('.load-more-video')
const videoFormEl = document.querySelector('#video-search-form')
const lightbox = new SimpleLightbox('.gallery .photo-card a', {
    captionDelay: 250,
});
const fetchImage = new FetchImage();
const fetchVideo = new FetchVideo();

formEl.addEventListener('submit', searchImage)
loadMoreBtnEl.addEventListener('click', loadMoreImage)
videoFormEl.addEventListener('submit', searchVideo)
loadMoreVideoBtnEl.addEventListener('click', loadMoreVideo)



async function searchImage(evt) {
    evt.preventDefault();

    loadMoreBtnEl.classList.add('is-show')
    
    GalleryContainerEl.innerHTML = ''
    fetchImage.searchImage = evt.currentTarget.searchQuery.value.trim()
    fetchImage.resetCounter()

    try {
        const response = await fetchImage.request()
        if (response.data.totalHits === 0) {
            loadMoreBtnEl.classList.remove('is-show')
           return Notify.failure('Sorry, there are no images matching your search query. Please try again."')
        }

        Notify.success(`"Hooray! We found ${response.data.totalHits} images."`)
        pushImagesToGallery(response.data.hits)
        lightbox.refresh()        
    } catch (error) {
        console.log(error);
        Notify.warning('Oops! Try Again!')
    }
}

async function loadMoreImage(evt) {
   try {
    const response = await fetchImage.request()
    pushImagesToGallery(response.data.hits)
    toImageScroll()
    lightbox.refresh()

    if (GalleryContainerEl.children.length >= 500 || response.data.hits.length === 0) {
        Notify.info("We're sorry, but you've reached the end of search results.")
        loadMoreBtnEl.classList.remove('is-show')
        return
       }
   } catch (error) {
       console.log(error);
        Notify.warning('Oops! Try Again!')
   }
}

async function searchVideo(evt) {
    evt.preventDefault();

    loadMoreVideoBtnEl.classList.add('is-show')
    GalleryContainerEl.innerHTML = ''
    fetchVideo.searchImage = evt.currentTarget.videoSearchQuery.value.trim()
    fetchVideo.resetCounter()
    try {
        const response = await fetchVideo.request();
        if (response.data.totalHits === 0) {
            loadMoreVideoBtnEl.classList.remove('is-show')
           return Notify.failure('Sorry, there are no images matching your search query. Please try again."')
        }

        Notify.success(`"Hooray! We found ${response.data.totalHits} videos."`)
        pushVideoToGallery(response.data.hits)
    } catch (error) {
        console.log(error);
        Notify.warning('Oops! Try Again!')
    }    
}

async function loadMoreVideo(evt) {
    try {
    const response = await fetchVideo.request()
    pushVideoToGallery(response.data.hits)

    if (GalleryContainerEl.children.length >= 500 || response.data.hits.length === 0) {
        Notify.info("We're sorry, but you've reached the end of search results.")
        loadMoreVideoBtnEl.classList.remove('is-show')
        return
       }
   } catch (error) {
       console.log(error);
        Notify.warning('Oops! Try Again!')
   }
}

function pushImagesToGallery(galleryArray) {
    GalleryContainerEl.insertAdjacentHTML('beforeend', galleryBuilder(galleryArray))
}
function pushVideoToGallery(galleryArray) {
    GalleryContainerEl.insertAdjacentHTML('beforeend', galleryVideoBuilder(galleryArray))

}
function toImageScroll() {
    const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
}