import gql from "graphql-tag";

const CREATE_USER = gql`
    mutation($email: String!, $password: String!, $name: String! ){
        createUser(email: $email, password: $password, name: $name) {
            id,
            email,
            name
        }
    }
`;

export default CREATE_USER;