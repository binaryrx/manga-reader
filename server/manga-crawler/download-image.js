const fs = require('fs')
const request = require('request')
const Path = require('path')
const Axios = require('axios')
const errorsFile = "downloadErrors.txt"


module.exports = async function downloadImage(options) {
    const { imgUrl, path, mangaName, chapterName, imgNum, downloadPath } = options

    const dPath = Path.resolve(downloadPath);
    const dirName = Path.resolve(dPath, mangaName);
    const dirChapter = `${dPath}/${mangaName}/${chapterName}`;


    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }

    if (!fs.existsSync(dirChapter)) {
        fs.mkdirSync(dirChapter);
    }

    const req = await Axios({
        url: imgUrl,
        method: 'GET',
        responseType: 'stream'
    })
        .catch((err) => {
            console.log(`Axios: Failed Fetching ${chapterName} ${err.code}`)
            fs.appendFile(errorsFile, `${mangaName} ${chapterName} ${imgNum},`, (err) => {
                if (err) {
                    throw err;
                }
            });
        })


    if (req && req.data && req.data.statusCode === 200) {

        const writer = await req.data.pipe(fs.createWriteStream(path));

        // if (!fs.existsSync(path)) {

        return new Promise((resolve, reject) => {

            writer.on('end', resolve({
                message: `finished downloading ${mangaName} ${chapterName} ${imgNum} img`,
                url: imgUrl,
                path: path.substr(path.indexOf("\\data"), path.length)
            }));

            writer.on('error', reject)
        })
            .then(console.log.bind(console, `downloaded: ${mangaName} ${chapterName} ${imgNum}`))


        // } else {
        //     return new Promise((resolve, reject) => resolve())
        // }

    }

}