import ChaptersService from "#root/adapters/ChaptersService";

const chapterByIdResolvers = async (obj, id, context) => {
    return await ChaptersService.fetchChapterById(id.contains)
}

export default chapterByIdResolvers;


