import UserService from "#root/adapters/UsersService";

const deleteUserFavoriteResolver = async (obj, { user_id, manga_id }, context) => {
    return await UserService.deleteUserFavorite({user_id, manga_id});
}

export default deleteUserFavoriteResolver;