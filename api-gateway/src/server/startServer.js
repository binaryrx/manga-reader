import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/typeDefs";
import accessEnv from "#root/helpers/accessEnv";
import formatGraphQLErrors from "./formatGraphQLErrors";
import injectSession from "./injectSession";

const PORT = accessEnv("PORT", 7001);

const debugPlugin = {

    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
      console.log('Request started! Query:\n' +
        requestContext.request.query);
  
      return {
  
        // Fires whenever Apollo Server will parse a GraphQL
        // request to create its associated document AST.
        parsingDidStart(requestContext) {
          console.log('Parsing started!');
        },
  
        // Fires whenever Apollo Server will validate a
        // request's document AST against your GraphQL schema.
        validationDidStart(requestContext) {
          console.log('Validation started!');
        },
  
      }
    },
  };

const apolloServer = new ApolloServer({
    context: a => a,
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs,
    playground: true,
    introspection: true,
    // plugins: [
    //     debugPlugin
    // ]
})

const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
)

app.use(injectSession);

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

app.listen(PORT, () => {
    console.info(`API gateway listening on ${PORT}`);
})
