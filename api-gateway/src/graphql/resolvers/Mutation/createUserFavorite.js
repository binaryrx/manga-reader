import UserService from "#root/adapters/UsersService";

const createUserFavoriteResolver = async (obj, { user_id, manga_id }, context) => {

    const [data] = await UserService.createUserFavorite({ user_id, manga_id });

    return data;
}

export default createUserFavoriteResolver;