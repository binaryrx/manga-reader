import { gql } from "apollo-server";

const typeDefs = gql`
    scalar Date
    
    type Manga {
        id: ID!
        manga_name: String!
        alt_names: String
        cover_url: String!
        status: String!
        author: String!
        artist: String!
        description: String!
        updated_at: Date
        genres: [String!]
        latestChapter: String!
        latestChapterNum: Float!
        chapters: [Chapter]
    }

    type Chapter {
        id: ID
        manga_id: ID
        manga_name: String
        chapter_name: String
        chapter_num: String
        img_urls: [String]
        updated_at: Date
    }

    type User {
        email: String!,
        id: ID!,
        name: String
    }
    type UserSession {
        created_at: Date!
        expires_at: Date!
        id: ID!
        user: User!
    }

    type Mutation {
        createUser(email: String!, password: String!, name: String): User!
        createUserSession(email: String!, password: String!): UserSession!
        deleteUserSession(session_id: ID!): Boolean!
    }

    type Query {
        mangaByTitle(contains: String): Manga!
        mangas: [Manga!]!
        mangasByGenre(contains: String): [Manga!]!
        chapters: [Chapter!]!
        chapterById(contains: String): Chapter!
        chapterByName(where: String!, contains: String!): Chapter!
        chaptersUrlsByName(contains: String!): [Chapter!]!
        userSession(me: Boolean!): UserSession
    }

    
`;

export default typeDefs;
