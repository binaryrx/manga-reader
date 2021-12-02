import MangasService from "#root/adapters/MangasService";

const mangasResolvers = async () => {
    return await MangasService.fetchAllMangas()
}

export default mangasResolvers;


