import gql from "graphql-tag";

const GET_MANGAS_BY_GENRE = gql`
    query mangasByGenre($manga_name: String!) {
        mangasByGenre(contains: $manga_name) {
            manga_name
            status
            author
            genres
            cover_url
            updated_at
            latestChapter
            latestChapterNum
        }
    }
`;
export default GET_MANGAS_BY_GENRE;