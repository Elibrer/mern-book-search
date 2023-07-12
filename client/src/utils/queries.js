import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;

mongodb+srv://elibrer:Dacx3100@zweck-book-search.tpfqzon.mongodb.net/?retryWrites=true&w=majority