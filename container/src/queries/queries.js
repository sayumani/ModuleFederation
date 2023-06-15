import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      author {
        name
      }
    }
  }
`;

const getBooksDetailsQuery = gql`
  query($id: ID!){
    book (id: $id) {
      name
      id
      genre
      author {
        name
        id
        books{
          id
          name
        }
      }
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name,
      id
    }
  }
`;

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name,
      age,
      id
    }
  }
`;

const deleteBookMutation = gql`
  mutation($id: ID!) {
    deleteBook(bookId: $id) {
      id
    }
  }
`;

const deleteAuthorMutation = gql`
  mutation($id: ID!) {
    deleteAuthor(authorId: $id) {
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, addAuthorMutation, getBooksDetailsQuery, deleteBookMutation, deleteAuthorMutation };
