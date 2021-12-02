import Axios from 'axios';

const MANGA_SERVICE_URI = "http://mangas-service:7100";

export default class MangaService {
    static async fetchAllMangas() {
        const { data } = await Axios.get(`${MANGA_SERVICE_URI}/mangas`)
        return data
    }

    static async fetchByTitleManga(mangaName) {
        const { data } = await Axios.get(`${MANGA_SERVICE_URI}/manga/${mangaName}`)

        return data
    }
    
    static async fetchMangasByGenre(genre) {
        const { data } = await Axios.get(`${MANGA_SERVICE_URI}/genre/${genre}`)
        return data
    }
}