import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "https://apollo-graphql-music-share.herokuapp.com/v1/graphql"
});

export default apolloClient;
