import UsersService from "#root/adapters/UsersService";

const userIdBySessionResolvers = async (obj, session, context) => {
    return await UsersService.fetchUserSession({session_id: session.contains})
}

export default userIdBySessionResolvers;


