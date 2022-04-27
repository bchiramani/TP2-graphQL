import { GraphQLServer } from 'graphql-yoga';
import { Query } from './resolvers/query.js'
import { Mutation } from './resolvers/Mutation.js'
import { Todo } from './resolvers/Todo.js'
import { db } from './data/db.js'

// schema : le contrat entre graphQl et l utilisateur de l'API
const typeDefs = "schema/schema.graphql";
//resolvers: implementation du contrat
const resolvers = {
    //Query: {
    //hello: (_, { name }) => `Hello ${name ||'World'}`,

    // hello: (parent, { name }, context, info) => {
    //     console.log('parent : ', parent);
    //     console.log('context : ', context);
    //     console.log('info : ', info);
    //     retun `hello ${args.name ||'World'}`;
    // },
    //},
    Query,
    Mutation
};
const context = {
    db,
    pubsub
}
const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))