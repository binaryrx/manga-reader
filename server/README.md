# Dependencies

- Docker
- Node js


# How To

install dependencies
```
npm install
```


create .env file
use .env.example as reference


run docker
```
docker-compose up 
```

once db is ready:
```
npm run migrate
npm run seed
```

Go to localhost:8080 for adminer panel to view created db

# Model Manga Reader Database

lucid chart of db 
https://lucid.app/invitations/accept/ae69bd80-2b66-414c-936f-b00fad625fb4

Every Record will have:  
Created At - datetime  
Updated At - datetime  
Deleted at - datetime  

## Entities in the Manga Reader Database
Dependencies:
   - [axios](https://www.npmjs.com/package/axios)
   - [cheerio](https://www.npmjs.com/package/cheerio)
   - [express](https://www.npmjs.com/package/express)

* [X] Manga
* [X] Chapter
* [X] Genre

## Crawl Manga Websites for data

Dependencies:
  - PostgreSQL client for Node.js. [pg](https://www.npmjs.com/package/pg)
  - SQL query builder for Postgres [knex](https://www.npmjs.com/package/knex)
  - loads environment variables from a .env [dotenv](https://www.npmjs.com/package/dotenv)
  - A library to help you hash passwords. [bcrypt](https://www.npmjs.com/package/bcrypt)

* [] MangaReader 
    * [] get Manga
        * [X] title
        * [] alt names
        * [] cover url
        * [] year of release
        * [] status
        * [] authur
        * [] artist
        * [] reading direction
        * [X] chapters

    * [X] get chapter
        * [X] chapter title
        * [X] array of images urls
        * [X] chapter amount

    * [V] 

* [] FanFox
    * [] get Manga
        * [] description
        * [] genres



## Seed the Database with crawlers

* [ ] Manga
* [ ] Chapter
* [ ] Genre

## API Endpoints

* [ ] Manga
    * [ ] Create
    * [ ] Get All
    * [ ] Get One
    * [ ] Update
    * [ ] Delete

* [ ] Chapter
    * [ ] Create
    * [ ] Get
    * [ ] Update
    * [ ] Delete

* [ ] Genre 
    * [ ] Create
    * [ ] Get
    * [ ] Update
    * [ ] Delete