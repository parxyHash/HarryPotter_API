// * GraphQL Related
import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import depth from 'graphql-depth-limit';
import typeDefs from './typeDefs';
// * Database Related
import Char from './mongo/models/Character';
import House from './mongo/models/House';
import mongoose from 'mongoose';
// * .env config Related
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  validationRules: depth(5),
  context() {
    return {
      House,
      Char,
      mongoose,
    };
  },
});

export default async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      })
      .then(() => {
        server.listen({ port: 4000 }).then(({ url }) => {
          console.log(`Server is ready at ${url}`);
        });
      });
  } catch (err) {
    console.error('OOPS! Something went wrong!', err);
  }
};
