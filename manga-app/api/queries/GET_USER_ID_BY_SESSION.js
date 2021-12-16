import gql from "graphql-tag";

const GET_USER_ID_BY_SESSION = gql`
    query userIdBySession($session: String!) {
        userIdBySession(contains: $session) {
            id
            user{
                email
                id
                name
            }
        }
    }
`;

export default GET_USER_ID_BY_SESSION;