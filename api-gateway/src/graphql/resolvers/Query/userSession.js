
const userSessionResolver = async (obj, args, context) => {
    if (args.me !== true) throw new Error("Unsuported argument value");

    console.log(context)

    return context.res.locals.userSession;
}

export default userSessionResolver;


