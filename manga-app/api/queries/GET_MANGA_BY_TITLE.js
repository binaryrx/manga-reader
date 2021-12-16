import gql from 'graphql-tag';

const GET_MANGA_BY_TITLE = gql`
  query mangaByTitle($title: String!) {
    mangaByTitle(contains: $title) {
        manga_name
        alt_names
        cover_url
        status
        author
        artist
        description,
        genres,
        latest_chapter,
        updated_at
        chapters{
            id
            manga_name
            chapter_name
            chapter_num
            updated_at
        }
    }
  }
`;

export default GET_MANGA_BY_TITLE;