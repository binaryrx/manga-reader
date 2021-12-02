export function requireAuth(gssp) {
    return async (context) => {
        const { req, res, query } = context
        const session = req?.cookies?.userSessionId;

        console.log(session)
        console.log("query:",query)

        if(!session) {
            return {
                redirect: {
                    destination: "/login",
                    statusCode: 302,
                }
            }
        }

        return await gssp(context);
    }
}