import gql from "graphql-tag";

const GET_MANGAS_BY_IDS = gql`
    query mangasByIds($mangas_ids: [Int!]!) {
        mangasByIds(mangas_ids: $mangas_ids) {
            id
            manga_name
            status
            author
            genres
            cover_url
            updated_at
            latest_chapter
            latest_chapter_num
        }
    }
`;
export default GET_MANGAS_BY_IDS;