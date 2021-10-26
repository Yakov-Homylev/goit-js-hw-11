import axios, { Axios } from "axios";
const BASE_URL = 'https://pixabay.com/api/videos/?key=23823759-5b09d99573409f4e8325c89e8&'

export default class FetchVideo {
    constructor() {
        this._searchVideo = '';
        this.counter = 1;
    }

    async request() {
        const response = await axios.get(`${BASE_URL}q=${this._searchVideo}&video_type=all&safesearch=true&page=${this.counter}&per_page=20`)
        this.incrementCounter();
        return response
    }

    get searchImage() {
        return this._searchVideo
    }
    set searchImage(newSearch) {
        this._searchVideo = newSearch;
    }
    incrementCounter() {
        this.counter += 1;
    }
    resetCounter() {
        this.counter = 1;
    }
}