export function requireAuth(gssp) {
    return async (context) => {
        const { req, resolvedUrl } = context
        const session = req?.cookies?.userSessionId;

        if(!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=${encodeURIComponent(resolvedUrl)}`,
                    statusCode: 302,
                }
            }
        }

        return await gssp(context);
    }
}