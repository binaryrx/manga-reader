const Axios = require('axios')
const cheerio = require('cheerio');
const Path = require('path')
const fs = require('fs')
// const mv = require('mv');

const downloadImage = require("../download-image");
const errorsFile = "downloadErrors.txt"


class Chapter {
    constructor(url, mangaName, slug, downloadPath) {
        this.url = url;
        this.imgBaseUrl = "https://img.mghubcdn.com/file/imghub/"
        this.graphQLURL = "https://api.mghubcdn.com/graphql";
        this.slug = slug
        this.mangaName = mangaName;
        this.chapterName = this.getChapterName();
        this.chapterNum = this.getChapterNum()
        this.downloadPath = downloadPath;
        this.downloads;
    }

    getChapterNum() {
        return Number(this.url.substr(this.url.lastIndexOf('chapter-') + 'chapter-'.length, this.url.length));
    }

    getChapterName() {
        return this.url.substr(this.url.lastIndexOf('/') + 1, this.url.length)
    }

    async getImagsUrls() {
        const query = JSON.stringify({
            query: `{chapter(x:mh01,slug:"${this.slug}",number:${this.chapterNum}){id,title,mangaID,number,slug,date,pages,noAd,manga{id,title,slug,mainSlug,author,isWebtoon,isYaoi,isPorn,isSoftPorn,unauthFile,isLicensed}}}`,
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
                fs.appendFile(errorsFile, `${this.mangaName} ${this.chapterName} \n`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            })


        if (req && req.data) {
            return Object.values(JSON.parse(req.data.data.chapter.pages)).map((v, i) => this.imgBaseUrl + v)
        }

    }

    async getChapterImages() {
        const imgUrls = await this.getImagsUrls()

        let count = 0;
        let countAC = 0;
        const downloadPaths = [];

        return imgUrls.reduce((accumulatorPromise, imgUrl) => {

            const path = Path.resolve(this.downloadPath, `${this.mangaName}/${this.chapterName}`, `${count += 1}.jpg`)

            return accumulatorPromise
                .then(() => {
                    const options = {
                        imgUrl,
                        path,
                        mangaName: this.mangaName,
                        chapterName: this.chapterName,
                        imgNum: countAC += 1,
                        downloadPath: this.downloadPath
                    }
                    // console.log(options)
                    return downloadImage(options);
                })
                .then((res) => {
                    if (res) downloadPaths.push(res.path)
                })


        }, Promise.resolve())
            .then(() => {
                console.log(`Finished Downloading ${this.chapterName}!`)
                this.downloads = downloadPaths;
                fs.promises.appendFile(`./data/${this.mangaName}/${this.mangaName}-chapters.json`, JSON.stringify(this.downloads), 'utf8')
                    .then(() => console.log(`Written into data/${this.mangaName}-chapters.json`))
                    .catch((err) => console.log(`Error Writing into data/${this.mangaName}-chapters.json - ${err}`));
            })
            .catch(e => {
                console.log(e)
            })

    }
}


class mangaHere {
    constructor(url, downloadPath, completedPath) {
        this.mangaUrl = url;
        this.downloadPath = downloadPath;
        this.completedPath = completedPath;
        this.mangaName = this.getName();
        this.slug = this.getSlug();
        this.chaptersUrls;
        this.chapters = [];
    }

    getName() {
        if (this.mangaUrl.indexOf("_") != -1) {

            const name = this.mangaUrl.substr(this.mangaUrl.lastIndexOf('/') + 1, this.mangaUrl.length)
            return name.substr(0, name.indexOf('_'));
        }

        return this.mangaUrl.substr(this.mangaUrl.lastIndexOf('/') + 1)
    }

    getSlug() {
        return this.mangaUrl.substr(this.mangaUrl.lastIndexOf('/') + 1, this.mangaUrl.length)
    }

    getMangaInfo() {
        const info = this.$('h1+div').children().map((i, el) => {
            if (i != 4) {
                const last = this.$(el).children().last().text()
                return last
            }


        }).get()

        const genere = this.$('h1+div').children().map((i, el) => {
            if (i == 4) {
                return this.$(el).children().children().map((i, el) => {
                    return this.$(el).text();
                }).get()
            }
        }).get()
        const summary = this.$('.tab-content p').text();

        const scheme = ["author", "artist", "status", "latest", "genre", "summary"]

        return this.info = scheme.reduce((acc, current, i) => {
            if (i === 4) {
                acc[current] = genere
            } else if (i === 5) {
                acc[current] = summary
            } else {
                acc[current] = info[i]
            }
            return acc;
        }, {})


    }

    async getPageData() {
        const req = await Axios({
            url: this.mangaUrl,
            method: 'GET',
            headers: {
                Cookie: `__cfduid=d3762523f8b2b398a3faba5f5558aa58b1615568730; ads||exoclick-sticky={"count":1,"lastTime":1615568762203}; splashWeb-4079724-42=1; nb-no-req-4079724=true; recently={"1615568762064":{"mangaID":20671,"number":261},"1615568882534":{"mangaID":20,"number":1}}; id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Y0OTQwLTgzNTUtMTFlYi1iYzMxLWRmZjI0ODdmMDhmNSIsImRpc3BsYXlOYW1lIjoiQmluYXJ5UngiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1XY0NPNS1jRVNYVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrZGRfendtQy16Q1Fkd2dMZFhFUFRmaXBITHJRL3M5Ni1jL3Bob3RvLmpwZz9zej0xNjAiLCJlbWFpbCI6ImJpbmFyeXJ4QGdtYWlsLmNvbSIsImlhdCI6MTYxNTU2ODkxMywiZXhwIjoxNjQ3MTA0OTEzfQ.M0vm3jrTEVUpzECUEE4h1TQ3Oi7l2Jh-EZ5IULk_55U`
            }
        })
            .catch((err) => {
                console.log(`Axios: Failed getPageData(): mangaUrl: ${this.url} ${err.code}`)
                fs.appendFile(errorsFile, `${this.mangaName} ${this.chapterName} \n`, (err) => {
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
            this.chapters.push(new Chapter(this.$(el).attr('href'), this.mangaName, this.slug, this.downloadPath))
            return this.$(el).attr('href');
        }).get();
    }

    async downloadChapters() {
        let count = 0;
        let result = this.chapters.reverse().reduce((accumulatorPromise, imgUrl) => {
            return accumulatorPromise.then(async () => {
                return this.chapters[count].getChapterImages(count += 1)
            });

        }, Promise.resolve());

        result.then(async () => {
            console.log(`Finished Downloading ${this.mangaName} Chapters!`);

            // const path = Path.resolve(__dirname, `../data/images/${this.mangaName}`)

            // mv(path, this.completedPath, (err) => {
            //     if (err) throw err
            //     console.log(`moved ${this.mangaName} chapters to ${this.completedPath}`)
            // })

            // fs.promises.writeFile(`./data/${this.mangaName}/${this.mangaName}.json`, JSON.stringify(this.info), 'utf8')
            //     .then(() => console.log(`Written into data/${this.mangaName}.json`))
            //     .catch((err) => console.log(`Error Writing into data/${this.mangaName}.json - ${err}`));
        });
    }


    async init() {
        await this.getPageData()
        await this.getChaptersUrls();
        await this.getMangaInfo()
        if (!fs.existsSync(`./data/${this.mangaName}`)) {
            fs.mkdirSync(`./data/${this.mangaName}`);
        }

        fs.promises.writeFile(`./data/${this.mangaName}/${this.mangaName}.json`, JSON.stringify(this.info), 'utf8')
            .then(() => console.log(`Written into data/${this.mangaName}.json`))
            .catch((err) => console.log(`Error Writing into data/${this.mangaName}/${this.mangaName}.json - ${err}`));

        await this.downloadChapters()


    };


}


module.exports = {
    mangaHere
}