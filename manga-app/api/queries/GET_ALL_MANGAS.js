import gql from "graphql-tag";

const GET_ALL_MANGAS = gql`{
    mangas{
        manga_name
        status
        genres
        cover_url
        updated_at
        latest_chapter
        latest_chapter_num
    }
}`;
export default GET_ALL_MANGAS;