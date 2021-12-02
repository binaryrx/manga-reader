import gql from 'graphql-tag';

const GET_CHAPTER_BY_NAME = gql`
  query chapterByName($mangaName: String!, $chapterName: String!) {
    chapterByName(where: $mangaName, contains: $chapterName) {
        id
        manga_id
        manga_name
        chapter_name
        chapter_num
        img_urls
    }
  }
`;

export default GET_CHAPTER_BY_NAME;