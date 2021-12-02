import MangasService from "#root/adapters/MangasService";

const mangasByGenreResolvers = async (obj, genre, context) => {
    return await MangasService.fetchMangasByGenre(genre.contains)
}

export default mangasByGenreResolvers;


