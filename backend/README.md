# Dendencies

- Docker
- Node js


# How To

make sure docker is running,§
```
docker-compose up 
```

```
npm run migrate
npm run seed
```

go to localhost:8080 to view created db, default credentials in .env

# Model a Manga Reading Database

Every Record will have:  
Created At - datetime  
Updated At - datetime  
Deleted at - datetime  

## Entities in the Manga Reader Database

* [X] Manga
* [X] Chapter
* [X] Genre
* [X] Related Manga

## Seed the Database 

* [ ] Manga
* [ ] Chapter
* [ ] Genre
* [ ] Related Manga

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

* [ ] Pagination