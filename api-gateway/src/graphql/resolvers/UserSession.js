import UsersService from '#root/adapters/UsersService';

const UserSession = {
    user: async userSession => {
        console.log(userSession)
        const data = await UsersService.fetchUser({ user_id: userSession.user_id })
        return data;
    }
}

export default UserSession;