import Axios from 'axios';
import slugify from "#root/helpers/slugify"

const CHAPTERS_SERVICE_URI = "http://chapters-service:7101";

export default class ChaptersService {
    
    static async fetchAllChapters() {
        const { data } = await Axios.get(`${CHAPTERS_SERVICE_URI}/chapters`)
        return data
    }

    static async fetchChapterById(id) {
        const { data } = await Axios.get(`${CHAPTERS_SERVICE_URI}/chapter/${id}`)

        return data
    }

   

    static async fetchChapterByName({mangaName, chapterName}) {
        const { data } = await Axios.get(`${CHAPTERS_SERVICE_URI}/chapter/${slugify(mangaName)}/${slugify(chapterName)}`)

        return data
    }

    static async fetchChaptersUrlsByName(mangaName) {
        const { data } = await Axios.get(`${CHAPTERS_SERVICE_URI}/chapters/${slugify(mangaName)}`);

        return data
    }

}