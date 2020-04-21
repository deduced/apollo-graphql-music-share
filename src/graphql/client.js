// import ApolloClient from "apollo-boost";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

const apolloClient = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://apollo-graphql-music-share.herokuapp.com/v1/graphql",
    options: {
      reconnect: true
    }
  }),
  cache: new InMemoryCache()
});

// const apolloClient = new ApolloClient({
//   uri: "https://apollo-graphql-music-share.herokuapp.com/v1/graphql"
// });

export default apolloClient;
