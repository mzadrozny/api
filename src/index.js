// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Schemat w GraphQL
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

let notes = [
  {
    id: '1',
    content: 'To jest notatka',
    author: 'Horacy'
  },
  {
    id: '2',
    content: 'Oto następna notatka',
    author: 'Augustyn'
  },
  {
    id: '3',
    content: 'A to jest ostatnia notatka',
    author: 'Maurycy'
  },
]

// Resolver w GraphQL

const resolvers = {
  Query: {
    hello: () => 'Witaj, świecie!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note=> note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express();

// Apollo configuration

const server = new ApolloServer({
  typeDefs, resolvers
});

server.applyMiddleware({app, path: '/api'});

const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello World!!!'));
app.listen(port, () => console.log(`Server GraphQL on port: ${port}${server.graphqlPath}`));
