import { gql } from '@apollo/client';

export const GET_ME = gql`
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
                image
                link
                title
            }
        }
    }
`;

export const GET_BOOK = gql`
    query getBook($bookId: ID!) {
        book(bookId: $bookId) {
            _id
            bookId
            authors
            description
            image
            link
            title
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

export const GET_SINGLE_USER = gql`
    query getSingleUser($userId: ID!) {
        user(userId: $userId) {
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
