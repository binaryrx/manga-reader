import ChaptersService from "#root/adapters/ChaptersService";

const chaptersResolvers = async () => {
    return await ChaptersService.fetchAllChapters()
}

export default chaptersResolvers;


