import ChaptersService from "#root/adapters/ChaptersService";

const chapterUrlsByNameResolvers = async (obj, mangaName, context) => {
    return await ChaptersService.fetchChaptersUrlsByName(mangaName.contains)
}

export default chapterUrlsByNameResolvers;