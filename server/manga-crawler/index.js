const { mangaHere } = require("./crawlers/mangaHere");
const fs = require('fs');
const Path = require('path');


(async () => {

    const downloadPath = Path.resolve(__dirname, "data");
    const completedPath = Path.resolve(__dirname, "downloaded");


    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath);
    }

    const m = await new mangaHere("https://mangahere.onl/manga/death-note_114", downloadPath, completedPath)
    // const m = await new mangaHere("https://mangahere.onl/manga/kanmitsu-danshi", downloadPath, completedPath)
    await m.init()


})();
