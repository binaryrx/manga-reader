import gql from "graphql-tag";

const DELETE_USER_FAVORITE = gql`
    mutation($user_id: String!, $manga_id: Int!) {
        deleteUserFavorite(user_id: $user_id, manga_id: $manga_id) 
    }
`;

export default DELETE_USER_FAVORITE;