import gql from "graphql-tag";

const GET_USER_FAVORITES = gql`
    query userFavorites($user_id: String!) {
        userFavorites(user_id: $user_id) {
            id
   	        user_id
            manga_id
        }
    }
`;

export default GET_USER_FAVORITES;