const cheerio = require('cheerio');
const { getDataFromMangaReader } = require('./crawlerUtils');

let count = 0;
const getChapterDocument = async (chapterLink) => {
    const formatData = (data) => {
        try {
            count += 1;
            const $ = cheerio.load(data);
            const script = $('#main > script').html();
            // console.log(chapterNumber)
            console.log((script) ? `true ${count}` : `false ${count}`);
            const documentRegex = `${script.match(/^document(.*)/)[1]}`;
            const regDocument = documentRegex;
            const regDocumentRemoveSa = regDocument.substr(0, regDocument.indexOf(',"sa"'));
            const document = JSON.parse(`${regDocumentRemoveSa.substr(regDocumentRemoveSa.indexOf('{'), regDocumentRemoveSa.length)}}`);
            return document;
        } catch (e) {
            return new Error('failed: Formating Chapter Document Object');
        }
    };

    try {
        const { data } = await getDataFromMangaReader(null, chapterLink);
        return new Promise((resolve, reject) => {
            // resolve('done')
            resolve(formatData(data));
            reject(new Error('Failed: fetching chapterLength'));
        });
    } catch (e) {
        console.log(`Failed: getting chapter data - ${chapterLink}`, e);
        throw new Error(e);
    }
};

const getChapterImages = async (chapterLink) => {
    let chapterDocument = null;

    try {
        chapterDocument = await getChapterDocument(chapterLink);

        const chapterLength = chapterDocument.im.length || document.mn.length;
        const images = chapterDocument.im.reduce((accumulator, current) => {
            if (current) accumulator.push(current.u.substr(2, current.u.length));
            return accumulator;
        }, []);
        return {
            document: chapterDocument,
            images,
            chapterLength,
            chapterLink
        };
    } catch (e) {
        throw new Error(e.message);
    }
    // try{
    // const chapterDocument = await getChapterDocument(mangaName,chapterNum);
    // }catch(e){
    //     throw new Error(e.message)
    // }
    // console.log(`Chapter length: ${chapterLength}`)
    // console.log(chapterDocument.im)
    // console.log(images)
    // const chapterImagesArray = Array.from({length:chapterLength}).map( (async (_,i) => {
    //     return await getChapterImg(mangaName,chapterNum,i+1);
    // }))
    // return Promise.all(chapterImagesArray)
};
module.exports = getChapterImages;
