import UserService from "#root/adapters/UsersService";

const userFavoritesResolvers = async (obj , {user_id} , context) => {
    return await UserService.fetchUserFavorites({user_id});
}

export default userFavoritesResolvers;