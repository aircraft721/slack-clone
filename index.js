import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './models';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const types = fileLoader(path.join(__dirname, './schema'));
const typeDefs = mergeTypes(types);

const resolve = fileLoader(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolve);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

const graphqlEndpoint = '/graphql';

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema, context : {
    models,
    user: {
        id: 1
    },
}}));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(x => {
    app.listen(8080, () => {
        console.log('working');
    });
})
