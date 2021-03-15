const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "helloWorld",
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => "Hello World"
            }
        })
    })
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(4000, () => {
    console.log("server running on port 4000")
})