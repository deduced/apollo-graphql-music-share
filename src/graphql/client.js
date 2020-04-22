// import ApolloClient from "apollo-boost";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import { GET_QUEUED_SONGS } from "./queries";

const apolloClient = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://apollo-graphql-music-share.herokuapp.com/v1/graphql",
    options: {
      reconnect: true
    }
  }),
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      artist: String!
      duration: Float!
      id: uuid!
      thumbnail: String!
      title: String!
      url: String!
    }

    input SongInput {
      artist: String!
      duration: Float!
      id: uuid!
      thumbnail: String!
      title: String!
      url: String!
    }

    type Query {
      queuedSongs: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS
        });
        if (queryResult) {
          const { queuedSongs } = queryResult;
          const isInQueue = queuedSongs.some(song => song.id === input.id);
          const newQueuedSongs = isInQueue
            ? queuedSongs.filter(song => song.id !== input.id)
            : [...queuedSongs, input];

          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queuedSongs: newQueuedSongs }
          });

          return newQueuedSongs;
        }
        return [];
      }
    }
  }
});

const data = {
  queuedSongs: []
};

apolloClient.writeData({ data });

// const apolloClient = new ApolloClient({
//   uri: "https://apollo-graphql-music-share.herokuapp.com/v1/graphql"
// });

export default apolloClient;
