import ChaptersService from "#root/adapters/ChaptersService";

const chapterByNameResolvers = async (obj, props, context) => {
    return await ChaptersService.fetchChapterByName({mangaName: props.where, chapterName: props.contains})
}

export default chapterByNameResolvers;