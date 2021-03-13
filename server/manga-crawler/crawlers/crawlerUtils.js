const axios = require('axios');

const MangaReaderUrl = 'https://www.mangareader.net';

let mangaRuns = 0;
let chapterRuns = 0;

const getDataFromMangaReader = (mangaName, chapterLink = null) => {
    if (!chapterLink) {
        return new Promise((resolve, reject) => {
            mangaRuns += 1;
            console.log(`fetching Manga Data: ${mangaRuns}`);
            try {
                resolve(axios.get(`${MangaReaderUrl}/${mangaName}`));
            } catch (e) {
                console.log("failed");
                reject(new Error('Failed fetching Manga Data', e));
            }
        });
        // eslint-disable-next-line no-else-return
    } else {
        return new Promise((resolve, reject) => {
            chapterRuns += 1;
            const indexOfLastSpace = chapterLink.search(/\/[^/]*$/);
            const chapterNumber = chapterLink.substr(indexOfLastSpace + 1, chapterLink.length);
            console.log(`Fetching Chapter Data: ${chapterRuns}`);
            try {
                resolve(axios.get(chapterLink));
            } catch (e) {
                reject(new Error(`Failed fetching Chapter ${chapterNumber} Data`, e));
            }
        });
    }
};

module.exports = {
    getDataFromMangaReader
};
