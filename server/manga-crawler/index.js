const { mangaHere } = require("./crawlers/mangaHere");
const fs = require('fs');
const Path = require('path');


(async () => {

    const downloadsDirectory = Path.resolve(__dirname, "../m");

    if (!fs.existsSync(downloadsDirectory)) {
        fs.mkdirSync(downloadsDirectory);
    }

    // const manga = await new mangaHere("https://mangahere.onl/manga/dolkara_101", downloadsDirectory)
    // const manga = await new mangaHere("https://mangahere.onl/manga/mousou-megane", downloadsDirectory)
    const manga = await new mangaHere("https://mangahere.onl/manga/death-note_114", downloadsDirectory)
    // const m = await new mangaHere("https://mangahere.onl/manga/kanmitsu-danshi", downloadPath, completedPath)
    await manga.init()

    await manga.downloadChapters();

    const seedManga = {
        title: manga.mangaName,
        alt_names: manga.altName,
        cover_url: manga.posterPath,
        status: manga.status,
        author: manga.author,
        artist: manga.artist,
        description: manga.summary,
    }

    const seedChapters = manga.chapters.map((chap, i) => {
        return {
            chapter_name: chap.chapterName,
            chapter_num: chap.chapterNum,
            img_urls: chap.downloads
        }
    }, {})


    const jsonManga = Path.resolve(downloadsDirectory, `${manga.slugClean}.json`)
    const jsonChapters = Path.resolve(downloadsDirectory, `${manga.slugClean}-chapters.json`)
    const jsonGenre = Path.resolve(downloadsDirectory, `${manga.slugClean}-genre.json`)

    fs.promises.writeFile(jsonManga, JSON.stringify(seedManga), 'utf8')
        .then(() => console.log(`Written into ${jsonManga}`))
        .catch((err) => console.log(`Error Writing into ${jsonManga} - ${err}`));

    fs.promises.writeFile(jsonChapters, JSON.stringify(seedChapters), 'utf8')
        .then(() => console.log(`Written into ${jsonChapters}`))
        .catch((err) => console.log(`Error Writing into ${jsonChapters} - ${err}`));

    fs.promises.writeFile(jsonGenre, JSON.stringify(manga.genre), 'utf8')
        .then(() => console.log(`Written into ${jsonGenre}`))
        .catch((err) => console.log(`Error Writing into ${jsonGenre} - ${err}`));


})();
