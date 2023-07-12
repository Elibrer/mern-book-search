import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      username
      savedBooks {
        title
        link
        image
        description
        bookId
        authors
      }
      email
      bookCount
      _id
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      username
      savedBooks {
        title
        bookId
      }
    }
  }
`;

export const SAVE_BOOK_IDS = gql`
  mutation saveBookIds($bookId: ID!) {
    saveBookIds(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
      }
    }
  }
`;

export const DELETE_BOOK_IDS = gql`
  mutation deleteBookIds($bookId: ID!) {
    deleteBookIds(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
      }
    }
  }
`;
