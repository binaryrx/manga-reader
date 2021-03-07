const fs = require('fs');
const express = require('express');
const getMangaData = require('./crawlers/crawlManga');
const getChapterImages = require('./crawlers/crawlChapter');

const app = express();

app.get('/', async (req, res) => {
    try {
        let count = 0;

        const MangaData = async (mangaName) => {
            console.time('crawling');
            const mangaData = await getMangaData(mangaName);

            const chapterImagesArray = Array.from({ length: mangaData[mangaName].length }).map((async (_, i) => {
                count += 1;
                console.log(count);
                const currentNumber = mangaData[mangaName][i].number;
                const indexOfLastSpace = currentNumber.search(/ [^ ]*$/);
                mangaData[mangaName][i].chapterNum = currentNumber.substr(indexOfLastSpace, currentNumber.length);

                mangaData[mangaName][i].chapterImages = [];

                const chapterImages = await getChapterImages(mangaData[mangaName][i].chapterLink);
                mangaData[mangaName][i].chapterImages.push(chapterImages.images);
                console.log(mangaData);
            }));
            Promise.all(chapterImagesArray)
                .then(() => {
                    const jsonString = JSON.stringify(mangaData);
                    // console.log(mangaData);

                    res.send(mangaData);
                    console.timeEnd('crawling');
                    fs.promises.writeFile(`./data/${mangaName}.json`, jsonString, 'utf8')
                        .then(() => console.log(`Written into data/${mangaName}.json`))
                        .catch((err) => console.log(`Error Writing into data/${mangaName}.json - ${err}`));
                    return mangaData;
                });
        };
        const mangaName = 'road-to-naruto-the-movie';
        MangaData(mangaName);
    } catch (error) {
        console.log(`an error occoured: ${error}`);
    }
});

const server = app.listen(3000, () => {
    // const host = server.address().address;
    const { port } = server.address();

    console.log(`listening at http://localhost:${port}`);
});
