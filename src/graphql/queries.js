import { gql } from "apollo-boost";

export const GET_SONGS = gql`
  query getSongs {
    songs(order_by: { created_at: desc }) {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
`;

// mutation addSong {
//     insert_songs(
//       objects: {
//         title: "Ibiza Summer Mix"
//         artist: "Ibiza"
//         thumbnail: "http://i3.ytimg.com/vi/0IA1vCyffos/hqdefault.jpg"
//         duration: 250
//         url: "https://www.youtube.com/watch?v=0IA1vCyffos"
//       }
//     ) {
//       returning {
//         id
//         duration
//         created_at
//         artist
//         thumbnail
//         title
//         url
//       }
//     }
//   }
