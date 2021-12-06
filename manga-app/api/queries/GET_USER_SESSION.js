import gql from "graphql-tag";

const GET_USER_SESSION = gql`
    {
        userSession(me: true){
            id
            user{
                email
                id
                name
            }
        }
    }
`;

export default GET_USER_SESSION;