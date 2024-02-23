import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  query Query {
    books {
      id
      title
      year
      author
    }
  }
`;

export const BOOK_MUTATION = gql`
  mutation Mutation($title: String!, $year: Int!, $author: String!) {
    create(title: $title, year: $year, author: $author) {
      id
      title
      year
      author
    }
  }
`;

export const DELETE_BOOK_MUTATION = gql`
  mutation Mutattion($id: ID!) {
    delete(id: $id)
  }
`;

export const EDIT_BOOK_MUTATION = gql`
  mutation Mutation($id: ID, $title: String, $year: Int) {
    edit(id: $id, title: $title, year: $year) {
      id
      title
      year
    }
  }
`;
