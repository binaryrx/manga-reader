import gql from 'graphql-tag';

const GET_CHAPTER_BY_ID = gql`
  query chapterById($id: String!) {
    chapterById(contains: $id) {
        id
        manga_id
        manga_name
        chapter_name
        chapter_num
        img_urls
    }
  }
`;

export default GET_CHAPTER_BY_ID;