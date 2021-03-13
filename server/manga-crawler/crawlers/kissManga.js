const Axios = require('axios')
const cheerio = require('cheerio');
const FormData = require('form-data');
const Path = require('path')
const fs = require('fs')

const { all } = require('../utils');

const downloadImage = require("../download-image");
const errorsFile = "downloadErrors.txt"


class Chapter {
    constructor(url, mangaName, downloadPath) {
        this.url = url;
        this.downloadPath = downloadPath
        this.chapterName = this.getChapterName();
        this.mangaName = mangaName;
        this.downloads = [];

    }

    getChapterName() {
        const urlNoSlash = this.url.substr(0, this.url.length - 1);
        return urlNoSlash.substr(urlNoSlash.lastIndexOf('/') + 1, urlNoSlash.length)
    }

    async getChapterImagesUrls() {
        const req = await Axios({
            url: this.url,
            method: 'GET',
        })
            .catch((err) => {

                console.log("axios error");

                console.log(`Failed getChapterImagesUrls(): Fetching ${this.chapterName} image urls ${err.code}`)
                fs.appendFile(errorsFile, `${this.mangaName} ${this.chapterName} \n`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            })

        if (req && req.data) {
            const $ = cheerio.load(req.data, null);
            const images = [];

            $('img.wp-manga-chapter-img').each((i, el) => {
                try {
                    images.push($(el).attr('src').trim());
                } catch (e) {
                    console.log(e);
                }
            })

            return images;
        } else return [];

    }

    async getChapterImages(chapterNum) {
        const imgUrls = await this.getChapterImagesUrls()
        let count = 0;
        let countAC = 0;

        return imgUrls.reduce((accumulatorPromise, imgUrl) => {

            const path = Path.resolve(this.downloadPath, `images/${this.mangaName}/${this.chapterName}`, `${count}.jpg`)
            count++

            return accumulatorPromise.then(() => {
                return downloadImage(imgUrl, path, this.mangaName, this.chapterName, countAC += 1, this.downloadPath);
            });

        }, Promise.resolve())
            .then(e => {
                console.log(`Finished Downloading ${this.chapterName}!`)
            });

    }
}


class kissManga {
    constructor(url, downloadPath) {
        this.mangaUrl = url;
        this.downloadPath = downloadPath
        this.ajaxUrl = "https://kissmanga.in/wp-admin/admin-ajax.php";
        this.cheerioMangaData = this.getMangaData();
        this.mangaId = this.getMangaId();
        this.mangaName = this.getMangaName();
        this.chaptersUrls;
        this.chapters = [];

    }

    async getMangaData() {
        const req = await Axios({
            url: this.mangaUrl,
            method: 'GET',
        })
            .catch((err) => {
                console.log(`Axios: Failed getMangaData(): mangaUrl: ${this.url} ${err.code}`)
                fs.appendFile(errorsFile, `${this.mangaName} ${this.chapterName} \n`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            })

        if (req && req.data) {
            return this.cheerioMangaData = cheerio.load(req.data);
        }
    }

    async getMangaId() {
        try {
            const $ = await this.cheerioMangaData;
            return Number($('body').attr("class").split(' ').find(str => str.startsWith("postid")).replace("postid-", ""));
        } catch (e) {
            console.log(`failed getMangaId() ${this.mangaName} data, url:${this.mangaUrl}, ${e}`)
        }
    }

    async getMangaName() {
        try {
            const $ = await this.cheerioMangaData;
            return this.mangaName = $('.post-title').text().trim("").replace(":", "");
        } catch (e) {
            console.log(`failed getMangaName() ${this.mangaName} data, url:${this.mangaUrl}, ${e}`)
        }
    }

    async getChaptersUrls() {
        // console.time(`fetch ${this.mangaName} chapter urls`)

        const data = new FormData();
        data.append('action', 'manga_get_chapters');
        data.append('manga', await this.mangaId);

        const response = await Axios({
            method: 'post',
            url: this.ajaxUrl,
            data: data,
            headers: {
                ...data.getHeaders()
            }
        })
            .catch((err) => {
                if (err.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
                fs.appendFile(errorsFile, `Failed Fetching Chapters urls \n`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            })

        const $ = cheerio.load(response.data, null, null);

        return this.chaptersUrls = $('.wp-manga-chapter a').map((i, el) => {
            const url = $(el).attr('href').trim();
            this.chapters.push(new Chapter(url, this.mangaName, this.downloadPath))
            return url;
        }).get();


    }


    async init() {
        await this.getMangaName();
        await this.getChaptersUrls();
        console.log(this.mangaName);
        // console.log($.html())

        // fs.promises.writeFile(`./data/${this.mangaName}.json`, JSON.stringify(chapterUrls), 'utf8')
        //     .then(() => console.log(`Written into data/${this.mangaName}.json`))
        //     .catch((err) => console.log(`Error Writing into data/${this.mangaName}.json - ${err}`));


        let count = 0;
        let result = this.chapters.reduce((accumulatorPromise, imgUrl) => {

            return accumulatorPromise.then(async () => {
                let i = this.chapters.length - count - 1
                return this.chapters[i].getChapterImages(count += 1)
            });

        }, Promise.resolve());

        result.then(async (e) => {
            console.log(`Finished Downloading ${await this.mangaName} Chapters!, ${e}`);
        });


    };


}


module.exports = {
    kissManga
}