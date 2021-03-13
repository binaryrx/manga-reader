const cheerio = require('cheerio');
const { getDataFromMangaReader } = require('./crawlerUtils');

const MangaReaderUrl = 'https://kissmanga.in/kissmanga/one-piece-man-1243565712/chapter-1006/';

// const Scheme = {
//     title: null,
//     alt_names: null,
//     cover_url: null,
//     year_of_release: null,
//     status: null,
//     author: null,
//     artist: null,
//     reading_direction: null,
//     description: null
// };

// const getMangaByScheme = () => {
//     const dataByScheme = Scheme;
// }

const getMangaDataNew = async (mangaName) => {
    const { data } = await getDataFromMangaReader(mangaName);

    const $ = cheerio.load(data);
    const title = $('span.name').html();
    console.log(title);
    // const table = $('table').filter(function() {
    //     console.log(`${$(this)}`);
    //     return $(this).text().trim() === 'Name:';
    // }).next().text();

    // console.log(table.text());

    // return new Promise((resolve, reject) => {
    //     resolve(table);
    //     reject(new Error('failed to get manga'));
    // });
};
getMangaDataNew('road-to-naruto-the-movie').then((data) => console.log(data));

const formatData = (data) => {
    // if (data === undefined) return;
    // const $ = cheerio.load(data);
    // const table = $('table').last();
    // const chapters = [];

    // table.find('tbody tr td:first-child').each(async (i, element) => {
    //     const $rowItem = $(element);
    //     const rowText = $rowItem.text();
    //     const chapterNumber = $rowItem.find('a');
    //     const chapterTitle = rowText.substring(rowText.indexOf(':') + 1, rowText.length).trim();
    //     const chapterLink = `${MangaReaderUrl}${$rowItem.find('a').attr('href')}`;

    //     const chapter = {
    //         number: chapterNumber.text(),
    //         chapterTitle,
    //         chapterLink
    //     };
    //     if (chapterNumber.text()) {
    //         chapters.push(chapter);
    //     }
    // });
    // eslint-disable-next-line consistent-return
    return chapters;
};

const getMangaData = async (title) => {
    const mangas = {};
    const { data } = await getDataFromMangaReader(title);

    mangas[title] = formatData(data);
    return new Promise((resolve, reject) => {
        resolve(mangas);
        reject(new Error('failed to get manga'));
    });
};
module.exports = getMangaData;
