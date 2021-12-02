import Axios from "axios";
import cheerio from "cheerio";
import fs  from "fs";
import Path  from "path";
import fetch from "node-fetch"
import slugify from "../utils/slugify";

import knex from "#root/db/connection";
import tableNames from "#root/constants/tableNames";
import generateUUID from "#root/helpers/generateUUID";

/*
    ----------------------------------------------------------------
                                Helpers
    ----------------------------------------------------------------
*/

async function getPageData(url) {
    try{

        const req = await Axios({
            url,
            method: "GET",
            
        }).catch( (e) => {  
            throw e;
        })

        if(req && req.data) {
            return cheerio.load(req.data);
        }


    }catch(e){
        throw new Error(`Failed to fetch: ${url}, ${e.message}`)
    }
}

async function getMangaUrl(searchString, searchUrl, selector) {
    const $ = await getPageData(searchUrl);

    return $(selector).map( (i, el) => {
        
        if(searchString.trim().toLowerCase() === ($(el).text().trim().toLowerCase())) {

            return $(el).attr("href");
        }
        
    })[0];

}

class DownloadImage {

    constructor(options, chapter){
        if( !options && !options.url || options.url.length == 0) {
            return new Error("Must provide a valid image url")
        }

        this.url = options.url
        this.downloadDirectory = options.downloadDirectory;
        this.filename = options.filename;
        this.ext = options.ext;

        this.base = "imgHub";
        this.basePath =  Path.resolve(this.base)
        
        this.chapter = chapter || false;
        this.mangaName = options.mangaName || null;

        if(this.chapter) {
            this.mangaDownloadPath = Path.resolve(this.basePath, this.mangaName)    
        }

        this.downloadPath = Path.resolve(this.basePath, this.downloadDirectory)

        
        this.downloadPathFilenameExt = Path.resolve(this.downloadPath, `${this.filename}.${this.ext}`)

    }


    createDownloadDirectory () {
        if(this.chapter) {
            if(!fs.existsSync(this.mangaDownloadPath)) {
                fs.mkdirSync(this.mangaDownloadPath)
            }
        }

        if(!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath)
        }

        if(!fs.existsSync(this.downloadPath)) {
            fs.mkdirSync(this.downloadPath)
        }
        
        
      
    }


    async createDownloadStream () {
        this.createDownloadDirectory();


        if(fs.existsSync(this.downloadPathFilenameExt)) {
            return {
                status: "completed",
                from: this.url,
                to: this.downloadPathFilenameExt,
            }
         }
        
        try{
            const req = await Axios({
                url: this.url,
                method: 'GET',
                responseType: 'stream'
            }).catch((e=>console.log(e)))

            if (req && req.data && req.data.statusCode === 200) {

                const writer = await req.data.pipe(fs.createWriteStream(this.downloadPathFilenameExt));

                console.log(`downloading to ${this.downloadPathFilenameExt}`)

                return new Promise((resolve, reject) => {
                    
                    writer.on("end", resolve())
                    writer.on('error', reject())

                }).then( () => {
                    
                    return {
                        "status": "finished",
                        from: this.url,
                        to: this.downloadPathFilenameExt,
                    };

                }).catch( (e) => {
                    return {
                        "status": "failed",
                        "message": e.message
                    };
                })
            }

        }catch(e){
            throw new error(e)
        }
    }
    

}



/*
    ----------------------------------------------------------------
                            Manga + Chapter Classes
    ----------------------------------------------------------------
*/

class Manga {
    constructor(options) {
        this.title = options.title || null;
        this.slug = options.slug || null;
        this.alt_names = options.alt_names || "";
        this.cover_url = options.cover_url || "";
        this.status = options.status || "";
        this.author = options.author || "";
        this.artist = options.artist || "";
        this.description = options.description || "";
        this.genres = options.genres || "";
        this.crawler_cover_url = options.kissCoverUrl || "";

        this.init();
    }


    async addToDB () {
        //check if manga exisits
        const mangaFromDB = await knex(tableNames.manga).select("*").where("title", this.title);
        if (mangaFromDB.length !== 0) {
            console.log('manga exisits')
            return mangaFromDB;
        }

        // try adding to db
        try {
            const newManga = await knex(tableNames.manga).insert({
                id: generateUUID(),
                title: this.title,
                slug: this.slug,
                alt_names: this.alt_names,
                cover_url: this.cover_url,
                status: this.status,
                author: this.author,
                artist: this.artist,
                description: this.description,
                genres: this.genres 
            }, "*")

            return this.manga = newManga


        } catch (e) {
            throw new Error('failed inserting manga into db', e.message)
        }
    }

    

    async init() {
        console.log("init manga")
        // console.log(this);
        await this.addToDB()
    }
}

class Chapter {
    constructor(options) {
        this.manga_id = options.manga_id || null;
        this.manga_name = options.manga_name || null;
        this.chapter_name = options.chapter_name || null;
        this.chapter_num = options.chapter_num || null;
        this.chapter_url = options.chapter_url || null;
        this.download = "waiting";

        this.init()
    }

    async getImageUrls() {

        const $ = await getPageData(this.chapter_url)

        return $(".wp-manga-chapter-img").map( (i, el) => {

            const src = $(el).attr("src").trim()

            return src
        
    }).get();
    }

    async addToDB () {
        //check if manga exisits
        const [chapter] = await knex(tableNames.chapter).select("*").where("chapter_name", this.chapter_name);
        if (chapter && chapter.chapter_name.length !== 0) {
            // console.log('chapter exists')
            return chapter.download;
        }

        this.img_urls = await this.getImageUrls()

        // try adding to db
        try {
            const newChapter = await knex(tableNames.chapter).insert({
                id: generateUUID(),
                manga_id: this.manga_id,
                chapter_name: this.chapter_name,
                chapter_num: this.chapter_num,
                img_urls: this.img_urls,
                download: this.download
            }, "*")

            console.log("added chapter to DB:" ,this.chapter_name)
            return this.manga = newChapter


        } catch (e) {
            throw new Error('failed inserting chapter into db', e.message)
        }
    }

    async init(){
        
        await this.addToDB()
    }

}

/*
    ----------------------------------------------------------------
                            Crawler Classes
    ----------------------------------------------------------------
*/

class MangaHere{
    constructor(mangaName) {
        this.manga_name = mangaName;
        this.slug = slugify(this.manga_name)
        this.search_url = `https://mangahere.onl/search?q=${encodeURIComponent(this.manga_name)}`;
    }

    async getMangaData() {
        const $ = await getPageData(this.manga_url);

        const alt_names = $("h1 small").text().trim();
        const author = $("h1+div div:nth-of-type(1) span+span").text().trim();
        const artist = $("h1+div div:nth-of-type(2) span+span").text().trim();
        const status = $("h1+div div:nth-of-type(3) span+span").text().trim();
        const description = $(".noanim-content-tab-pane-99").text().trim();
        const crawler_cover_url = $(".img-responsive.manga-thumb").attr("src");

        console.log(crawler_cover_url);

        return {
            alt_names,
            author,
            artist,
            status,
            description,
            crawler_cover_url
        }
    }

    async crawl() {
        console.log("mangaHere crawl")

        this.manga_url = await getMangaUrl(this.manga_name, this.search_url, ".media-heading a");
        this.mangaData = await this.getMangaData();

        this.cover_url_ext = this.mangaData.crawler_cover_url.substr(this.mangaData.crawler_cover_url.lastIndexOf(".") + 1)

        console.log(this.cover_url_ext)
        
        const d = await new DownloadImage({
            url: this.mangaData.crawler_cover_url,
            downloadDirectory: this.slug,
            filename: `${this.slug}-cover`,
            ext: this.cover_url_ext,
        }).createDownloadStream();

        console.log(d);
    

        return this;
    }
}

class KissManga {

    constructor(mangaName) {
        this.manga_name = mangaName;
        this.slug = slugify(this.manga_name)
        this.search_url = `https://kissmanga.in/?s=${encodeURIComponent(this.manga_name)}&post_type=wp-manga`;
    }

    async getMangaID(mangaUrl){
        const $ = await getPageData(mangaUrl);
        const id = $("body").attr("class").split(" ").filter( s => s.startsWith("postid"))[0].split('-')[1]
        return id;
    }

    async getMangaData() {
        const $ = await getPageData(this.mangaUrl);

        const genres = $(".genres-content a").map((i,el) => $(el).text()).get();

        const genresFromDB = await knex(tableNames.genre).whereIn("name", genres).select("id");
        const genresIds = genresFromDB.map((v, i) => v.id)

        return {
            description: $(".summary__content p").text(),
            crawler_cover_url: $(".summary_image img").attr("src"),
            genres: genresIds 
        };

    }

    async getChaptersData (id) {
        try{
            const res = await fetch("https://kissmanga.in/wp-admin/admin-ajax.php", {
                "headers": {
                  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": `action=manga_get_chapters&manga=${id.trim()}`,
                "method": "POST",
            })
            .catch( (e) => {  
                throw e;
            })

            if (res) {
                return cheerio.load(await res.text())
            }

        }catch(e){
            throw new Error(`Failed to fetch: https://kissmanga.in/wp-admin/admin-ajax.php, Fn: getChaptersData , ${e.message}`)

        }
        
    }

    async getChaptersDetails(mangaID) {
        const $ = await this.getChaptersData(mangaID)

        return $(".wp-manga-chapter a").map( (i, el) => {

                const name = $(el).text().trim()
                const num =  $(el).text().trim().split(" ")[1] || $(el).text().trim().split(".")[1]

                return{
                    chapter_name: name, 
                    chapter_num: num,
                    chapter_url: $(el).attr("href"),
                    manga_name: this.manga_name
                };
            
        }).get();

    }

    async crawl() {
        console.log("KissManga crawl")

        
        this.mangaUrl = await getMangaUrl(this.manga_name, this.search_url, ".post-title a") // returns the manga url
        this.mangaData = await this.getMangaData();
        
        
        this.cover_url_ext = this.mangaData.crawler_cover_url.substr(this.mangaData.crawler_cover_url.lastIndexOf(".") + 1)

        this.cover_url = await new DownloadImage({
            url: this.mangaData.crawler_cover_url,
            downloadDirectory: this.slug,
            filename: `${this.slug}-cover`,
            ext: this.cover_url_ext,
        }).createDownloadStream();


        this.mangaId = await this.getMangaID(this.mangaUrl)
        this.chapters = await this.getChaptersDetails(this.mangaId)

        return this;
    }
}

class Crawler{

    constructor(title) {
        if( !title ){
            throw new Error("Title must be provided upon initialization");
        }
        this.title = title
        this.slug = slugify(this.title);
        
        this.init();
    }

    async getMangaId() {

        const [{id}] = await knex(tableNames.manga).select("id").where("title", this.title);

        return id;
    }



    downloadChapterImages(chapter) {
        // console.log(chapter);
            return Promise.all(chapter.img_urls.map( (url,i) => {
                console.log(i)
                const ext = url.substr(url.lastIndexOf(".") + 1)
                return new DownloadImage({
                    url,
                    downloadDirectory: `${slugify(this.title)}/${slugify(chapter.chapter_name)}`,
                    filename: i,
                    ext,
                    mangaName: slugify(this.title)
                },true).createDownloadStream();
            })).then( async (res) => {
                //update chapter db , download column to true
                await knex(tableNames.chapter).where({chapter_name: chapter.chapter_name}).update("download", "completed").returning("*");

            })

    }

    downloadImagesWithDelay(chapter,delay) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("delay - ",chapter.chapter_num)
            this.downloadChapterImages(chapter)
      
            resolve();
          }, delay);
        });
      }


    processWaitingChapters() {
        // process the chapter sequentially
        this.waitingChapters.reduce( (accumulatorPromise, chapter) => {

            return accumulatorPromise.then( () => {
                return this.downloadImagesWithDelay(chapter,3500)
                
            })
        }, Promise.resolve())
        
    }
    

    async init(){
        console.log('init Crawler class')

        try{

            const [{id}] = await knex(tableNames.manga).select("id").where("title", this.title);
        
            this.waitingChapters = await knex(tableNames.chapter).select("*").where({
                download: "waiting",
                manga_id: id
            });

            console.log("----------------------------------------------------")
            console.log("Amount of chapters waiting to download images:", this.waitingChapters.length)
            console.log("----------------------------------------------------")
            if(this.waitingChapters.length > 0) {
                // there are chapters watings to download the images
    
                //download the chapter images in sequence,
    
                // once finished downloading, move on to next chapter
    
                // console.log(waitingChapters)
                console.log('chapters waiting to download img urls exists')
                
                this.processWaitingChapters()
                
                
                console.log('stop here')
                return;
            }
        } catch(e){
            console.log(e);
        }


       

        // const mangaFromDB = await knex(tableNames.manga).select("*").where("title", this.title);
        // if (mangaFromDB.length !== 0) {
        //     console.log(mangaFromDB)
            
        //     console.log('The Manga Already Exists^')
        //     console.log("stop here")
        //     return mangaFromDB;
        // }



        const mangaHere = await new MangaHere(this.title).crawl();
        const kissManga = await new KissManga(this.title).crawl();


        const MangaHere_cover_url = `imgHub/${this.slug}/${this.slug}-cover.${mangaHere.cover_url_ext}`;
        const KissManga_cover_url = `imgHub/${this.slug}/${this.slug}-cover.${kissManga.cover_url_ext}`;

        const mangaOptions = {
            title: this.title,
            slug: slugify(this.title),
            cover_url: KissManga_cover_url,
            cover_url: MangaHere_cover_url,
            ...mangaHere.mangaData,
            ...kissManga.mangaData,
        }

        const manga = await new Manga(mangaOptions)

        const manga_id = await this.getMangaId()

        console.log("chapters to create:", kissManga.chapters.length)
        const chapters = Promise.all(kissManga.chapters.map( (chapter) => {

            const chapterOptions = {
                chapter_name: chapter.chapter_name,
                chapter_num: chapter.chapter_num,
                chapter_url: chapter.chapter_url,
                manga_name: chapter.manga_name,
                manga_id
            }

            return new Chapter(chapterOptions)
        }));

        await chapters

        const [{id}] = await knex(tableNames.manga).select("id").where("title", this.title);
        
        this.waitingChapters = await knex(tableNames.chapter).select("*").where({
            download: "waiting",
            manga_id: id
        });

        if(this.waitingChapters.length > 0) {
          
            console.log('chapters waiting to download img urls exists ----- 2')
            
            this.processWaitingChapters()
            
            return;
        }
    }

}

export default Crawler