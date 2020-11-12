const cheerio = require('cheerio');
const { getDataFromMangaReader } = require('./crawlerUtils');

const MangaReaderUrl = 'https://www.mangareader.net';

const formatData = (data) => {
    if (data === undefined) return;
    const $ = cheerio.load(data);
    const table = $('table').last();
    const chapters = [];

    table.find('tbody tr td:first-child').each(async (i, element) => {
        const $rowItem = $(element);
        const rowText = $rowItem.text();
        const chapterNumber = $rowItem.find('a');
        const chapterTitle = rowText.substring(rowText.indexOf(':') + 1, rowText.length).trim();
        const chapterLink = `${MangaReaderUrl}${$rowItem.find('a').attr('href')}`;

        const chapter = {
            number: chapterNumber.text(),
            chapterTitle,
            chapterLink
        };
        if (chapterNumber.text()) {
            chapters.push(chapter);
        }
    });
    // eslint-disable-next-line consistent-return
    return chapters;
};

const getMangaData = async (mangaName) => {
    const mangas = {};
    const { data } = await getDataFromMangaReader(mangaName);

    mangas[mangaName] = formatData(data);
    return new Promise((resolve, reject) => {
        resolve(mangas);
        reject(new Error('failed to get manga'));
    });
};
module.exports = getMangaData;
