import UsersService from '#root/adapters/UsersService';



const createUserSessionResolver = async (obj, { email, password }, context) => {
    const [data] = await UsersService.createUserSession({ email, password })
    
    context.res.cookie("userSessionId",data.id, {httpOnly: true})
    
    return data
}



export default createUserSessionResolver;