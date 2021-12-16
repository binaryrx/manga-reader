import gql from "graphql-tag";

const CREATE_USER_FAVORITE = gql`
    mutation($user_id: String!, $manga_id: Int!) {
        createUserFavorite(user_id: $user_id, manga_id: $manga_id) {
            id
            user_id
            manga_id
        }
    }
`;

export default CREATE_USER_FAVORITE;