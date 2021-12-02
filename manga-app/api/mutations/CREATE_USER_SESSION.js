import gql from "graphql-tag";

const CREATE_USER_SESSION = gql`
    mutation($email: String!, $password: String! ){
        createUserSession(email: $email, password: $password) {
            id
            user {
                email
                id
            }
        }
    }
`;

export default CREATE_USER_SESSION;