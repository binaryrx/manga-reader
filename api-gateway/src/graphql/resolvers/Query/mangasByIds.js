import MangasService from "#root/adapters/MangasService";

const mangasByIdsResolvers = async (obj, {mangas_ids}, context) => {
    return await MangasService.fetchMangasByIds({mangas_ids})
}

export default mangasByIdsResolvers;


