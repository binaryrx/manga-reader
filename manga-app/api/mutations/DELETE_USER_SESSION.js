import gql from "graphql-tag";

const DELETE_USER_SESSION = gql`
    mutation($session_id: ID!){
        deleteUserSession(session_id: $session_id)
    }
`;

export default DELETE_USER_SESSION;