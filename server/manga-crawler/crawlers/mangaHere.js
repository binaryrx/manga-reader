const Axios = require('axios')
const cheerio = require('cheerio');
const Path = require('path')
const fs = require('fs')
// const mv = require('mv');

const downloadImage = require("../download-image");
const { throws } = require('assert');
const errorsFile = "downloadErrors.txt"


class Chapter {
    constructor(options) {
        this.url = options.url;
        this.imgBaseUrl = "https://img.mghubcdn.com/file/imghub/"
        this.graphQLURL = "https://api.mghubcdn.com/graphql";
        this.slugDirty = options.slugDirty
        this.slugClean = options.slugClean;
        this.chapterName = this.getChapterName();
        this.chapterNum = this.getChapterNum()
        this.downloadsDirectory = options.downloadsDirectory;
        this.downloads = [];
    }

    getChapterNum() {
        return Number(this.url.substr(this.url.lastIndexOf('chapter-') + 'chapter-'.length, this.url.length));
    }

    getChapterName() {
        return this.url.substr(this.url.lastIndexOf('/') + 1, this.url.length)
    }

    async getImagsUrls() {
        const query = JSON.stringify({
            // query: `{chapter(x:mh01,slug:"${this.slugClean}",number:${this.chapterNum}){id,title,mangaID,number,slug,date,pages,noAd,manga{id,title,slug,mainSlug,author,isWebtoon,isYaoi,isPorn,isSoftPorn,unauthFile,isLicensed}}}`,
            query: `{chapter(x:mh01,slug:"${this.slugDirty}",number:${this.chapterNum}){id,title,mangaID,number,slug,date,pages,noAd,manga{id,title,slug,mainSlug,author,isWebtoon,isYaoi,isPorn,isSoftPorn,unauthFile,isLicensed}}}`,
            variables: {}
        });

        const config = {
            method: 'get',
            url: this.graphQLURL,
            headers: {
                'Cookie': '__cfduid=d3762523f8b2b398a3faba5f5558aa58b1615568730; ads||exoclick-sticky={"count":1,"lastTime":1615568762203}; splashWeb-4079724-42=1; nb-no-req-4079724=true; recently={"1615568762064":{"mangaID":20671,"number":261},"1615568882534":{"mangaID":20,"number":1}}; id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Y0OTQwLTgzNTUtMTFlYi1iYzMxLWRmZjI0ODdmMDhmNSIsImRpc3BsYXlOYW1lIjoiQmluYXJ5UngiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1XY0NPNS1jRVNYVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrZGRfendtQy16Q1Fkd2dMZFhFUFRmaXBITHJRL3M5Ni1jL3Bob3RvLmpwZz9zej0xNjAiLCJlbWFpbCI6ImJpbmFyeXJ4QGdtYWlsLmNvbSIsImlhdCI6MTYxNTU2ODkxMywiZXhwIjoxNjQ3MTA0OTEzfQ.M0vm3jrTEVUpzECUEE4h1TQ3Oi7l2Jh-EZ5IULk_55U',
                'Content-Type': 'application/json'
            },
            data: query
        };

        const req = await Axios(config)
            .catch((err) => {
                console.log(`Axios: Failed getImagsUrls(): Fetching ${this.chapterName} image urls ${err}`)
                fs.appendFile(errorsFile, `${this.slugDirty} ${this.chapterName} \n`, (err) => {
                    if (err) {
                        throw err;
                    }
                });

                this.getImagsUrls();
            })


        if (req && req.data) {
            return Object.values(JSON.parse(req.data.data.chapter.pages)).map((v, i) => this.imgBaseUrl + v)
        }

    }

    async getChapterImages() {
        const imgUrls = await this.getImagsUrls()

        let count = 0;

        return imgUrls.reduce((accumulatorPromise, imgUrl) => {

            return accumulatorPromise
                .then(() => {

                    const options = {
                        imgUrl,
                        downloadsDirectory: this.downloadsDirectory,
                        slugClean: this.slugClean,
                        chapterName: this.chapterName,
                        imgName: count += 1,
                    }
                    return downloadImage(options, true);
                })
                .then((res) => {
                    console.log(res.message)
                    this.downloads.push(res.path)
                }).catch(e => {
                    console.log(`Failed: getChapterImages(): imgUrl: ${imgUrl} ${e.code}`)
                    fs.appendFile(errorsFile, `${this.slugClean} ${this.chapterName} ${count},`, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                })


        }, Promise.resolve())
            .then(() => {
                console.log(`Finished Downloading ${this.chapterName}!`)
                // fs.promises.appendFile(`./data/${this.slugDirty}/${this.slugDirty}-chapters.json`, JSON.stringify(this.downloads), 'utf8')
                //     .then(() => console.log(`Written into data/${this.slugDirty}-chapters.json`))
                //     .catch((err) => console.log(`Error Writing into data/${this.slugDirty}-chapters.json - ${err}`));
            })
            .catch(e => {
                console.log(e)
            })

    }
}


class mangaHere {
    constructor(url, downloadsDirectory) {
        this.url = url;
        this.slugDirty = this.getPartialSlug();
        this.slugClean = this.getSlug();
        this.chaptersUrls;
        this.chapters = [];
        this.downloadsDirectory = downloadsDirectory;
        this.mangaDirectory = Path.resolve(this.downloadsDirectory, `${this.slugClean}`)
    }

    getSlug() {
        if (this.url.indexOf("_") != -1) {
            const name = this.url.substr(this.url.lastIndexOf('/') + 1, this.url.length)
            return name.substr(0, name.indexOf('_'));
        }

        return this.url.substr(this.url.lastIndexOf('/') + 1)
    }

    getPartialSlug() {
        return this.url.substr(this.url.lastIndexOf('/') + 1, this.url.length)
    }

    // getName() {
    //     return this.slugDirty.split('-').join(" ");
    // }

    getMangaInfo() {
        const info = this.$('h1+div').children().map((i, el) => {
            if (i != 4) {
                const last = this.$(el).children().last().text()
                return last
            }
        }).get()

        const genre = this.$('h1+div').children().map((i, el) => {
            if (i == 4) {
                return this.$(el).children().children().map((i, el) => {
                    return this.$(el).text();
                }).get()
            }
        }).get()

        const altName = this.$("h1 small").text();
        const title = this.$("h1").children().remove().end().text();
        const summary = this.$('.tab-content p').text();
        const posterUrl = this.$('.container-fluid .row div img.manga-thumb').attr('src');

        this.mangaName = title;
        this.posterUrl = posterUrl;
        this.altName = altName;
        this.summary = summary;
        this.genre = genre;

        const scheme = ["author", "artist", "status", "latest"]

        scheme.forEach((val, i) => {
            this[val] = info[i];
        })

        return this;
    }

    async getMangaPoster() {

        const imgName = `${this.slugClean}`;
        const imgUrl = this.posterUrl;
        console.log(this.slugClean)

        const options = {
            imgUrl,
            downloadsDirectory: this.downloadsDirectory,
            slugClean: this.slugClean,
            chapterName: null,
            imgName,
        }
        // console.log(options)
        return await downloadImage(options)
            .then((data) => this.posterPath = data.path)
    }

    async getPageData() {
        const req = await Axios({
            url: this.url,
            method: 'GET',
            headers: {
                Cookie: `__cfduid=d3762523f8b2b398a3faba5f5558aa58b1615568730; ads||exoclick-sticky={"count":1,"lastTime":1615568762203}; splashWeb-4079724-42=1; nb-no-req-4079724=true; recently={"1615568762064":{"mangaID":20671,"number":261},"1615568882534":{"mangaID":20,"number":1}}; id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Y0OTQwLTgzNTUtMTFlYi1iYzMxLWRmZjI0ODdmMDhmNSIsImRpc3BsYXlOYW1lIjoiQmluYXJ5UngiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1XY0NPNS1jRVNYVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrZGRfendtQy16Q1Fkd2dMZFhFUFRmaXBITHJRL3M5Ni1jL3Bob3RvLmpwZz9zej0xNjAiLCJlbWFpbCI6ImJpbmFyeXJ4QGdtYWlsLmNvbSIsImlhdCI6MTYxNTU2ODkxMywiZXhwIjoxNjQ3MTA0OTEzfQ.M0vm3jrTEVUpzECUEE4h1TQ3Oi7l2Jh-EZ5IULk_55U`
            }
        })
            .catch((err) => {
                console.log(`Axios: Failed getPageData(): url: ${this.url} ${err.code}`)
                fs.appendFile(errorsFile, `${this.slugDirty} ${this.chapterName} \n`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            })

        if (req && req.data) {
            return this.$ = cheerio.load(req.data);
        }
    }

    async getChaptersUrls() {
        return this.$('.list-group-item a').map((i, el) => {
            this.chapters.push(new Chapter({
                url: this.$(el).attr('href'),
                slugDirty: this.slugDirty,
                slugClean: this.slugClean,
                downloadsDirectory: this.downloadsDirectory,
            }))
            return this.$(el).attr('href');
        }).get();
    }

    async downloadChapters() {
        let count = 0;
        let result = this.chapters.reverse().reduce((accumulatorPromise, imgUrl) => {
            return accumulatorPromise.then(async () => {
                return this.chapters[count].getChapterImages(count += 1)
            })


        }, Promise.resolve());

        return result.then(async () => {
            console.log(`Finished Downloading ${this.slugDirty} Chapters!`);
        });
    }


    async init() {
        console.log(this.mangaDirectory)
        if (!fs.existsSync(this.mangaDirectory)) {
            fs.mkdirSync(this.mangaDirectory);
        }

        await this.getPageData();
        await this.getChaptersUrls();
        await this.getMangaInfo();
        await this.getMangaPoster();


        // if (!fs.existsSync(`./data/${this.slugDirty}`)) {
        //     fs.mkdirSync(`./data/${this.slugDirty}`);
        // }

        // fs.promises.writeFile(`./data/${this.slugDirty}/${this.slugDirty}.json`, JSON.stringify(this.info), 'utf8')
        //     .then(() => console.log(`Written into data/${this.slugDirty}.json`))
        //     .catch((err) => console.log(`Error Writing into data/${this.slugDirty}/${this.slugDirty}.json - ${err}`));

    };


}


module.exports = {
    mangaHere
}