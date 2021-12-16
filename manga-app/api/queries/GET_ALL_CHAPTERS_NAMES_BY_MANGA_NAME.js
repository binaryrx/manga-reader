import gql from 'graphql-tag';

const GET_ALL_CHAPTERS_NAMES_BY_MANGA_NAME = gql`
  query chaptersUrlsByName($mangaName: String!) {
    chaptersUrlsByName( contains: $mangaName) {
        chapter_name
        chapter_num
    }
  }
`;

export default GET_ALL_CHAPTERS_NAMES_BY_MANGA_NAME;