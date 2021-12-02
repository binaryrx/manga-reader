import UsersService from '#root/adapters/UsersService';

const createUserResolver = async (obj, { email, password, name }) => {
    const [data] = await UsersService.createUser({ email, password, name })
    return data
}

export default createUserResolver;