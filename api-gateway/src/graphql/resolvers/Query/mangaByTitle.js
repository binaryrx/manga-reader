import MangasService from "#root/adapters/MangasService";

const mangaByTitleResolvers = async (obj, mangaName, context) => {
    return await MangasService.fetchByTitleManga(mangaName.contains)
}

export default mangaByTitleResolvers;


