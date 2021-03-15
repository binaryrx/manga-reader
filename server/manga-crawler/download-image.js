const fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const errorsFile = "downloadErrors.txt"


module.exports = async function downloadImage(options, isChapter = false) {
    const { imgUrl, downloadsDirectory, slugClean, chapterName, imgName } = options
    let fullDownloadPath = "";

    fullDownloadPath = Path.resolve(downloadsDirectory, `${slugClean}`);

    if (isChapter) {
        fullDownloadPath = Path.resolve(fullDownloadPath, `${chapterName}`);
    }
    fullDownloadPath = Path.resolve(fullDownloadPath, `${imgName}.jpg`);

    console.log()


    const chapterDirectory = Path.resolve(downloadsDirectory, `${slugClean}/${chapterName}`);

    if (isChapter && !fs.existsSync(chapterDirectory)) {
        fs.mkdirSync(chapterDirectory)
    }

    if (fs.existsSync(fullDownloadPath)) {
        return new Promise((resolve, reject) => {
            resolve({
                status: "done",
                message: `image already exists: ${fullDownloadPath}`,
                downloadedFrom: imgUrl,
                downloadDirectory: fullDownloadPath,
                path: fullDownloadPath.substr(fullDownloadPath.indexOf("\\m\\"), fullDownloadPath.length).replace(/\\/g, "/")
            })
        })
    }


    const req = await Axios({
        url: imgUrl,
        method: 'GET',
        responseType: 'stream'
    })
        .catch((err) => {
            console.log(`Axios: Failed Fetching ${chapterName} ${err.code}`)
            fs.appendFile(errorsFile, `${slugClean} ${chapterName} ${imgName},`, (err) => {
                if (err) {
                    throw err;
                }
            });
        })



    if (req && req.data && req.data.statusCode === 200) {

        const writer = await req.data.pipe(fs.createWriteStream(fullDownloadPath));

        return new Promise((resolve, reject) => {

            writer.on('end', resolve((() => {

                return {
                    message: `finished downloading: ${slugClean} ${chapterName ? chapterName : ""} ${imgName} img`,
                    status: "done",
                    downloadedFrom: imgUrl,
                    downloadDirectory: fullDownloadPath,
                    path: fullDownloadPath.substr(fullDownloadPath.indexOf("\\m\\"), fullDownloadPath.length).replace(/\\/g, "/")
                }
            })()

            ));

            writer.on('error', reject)
        })
        // .then(console.log.bind(console, `downloaded: ${slugClean} ${chapterName ? chapterName : ""} ${imgName}.jpg`))

    }

}