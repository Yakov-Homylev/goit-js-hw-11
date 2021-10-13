import axios, { Axios } from "axios";
const BASE_URL = 'https://pixabay.com/api/?key=23823759-5b09d99573409f4e8325c89e8&'

export default class FetchImage {
    constructor() {
        this._searchImage = '';
        this.counter = 1;
    }

    async request() {
        const response = await axios.get(`${BASE_URL}q=${this._searchImage}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.counter}&per_page=40`)
        this.incrementCounter();
        return response
    }

    get searchImage() {
        return this._searchImage
    }
    set searchImage(newSearch) {
        this._searchImage = newSearch;
    }
    incrementCounter() {
        this.counter += 1;
    }
    resetCounter() {
        this.counter = 1;
    }
}