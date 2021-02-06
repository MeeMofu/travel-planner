import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CHECK_USERNAME = gql`
  mutation checkUsername($username: String!) {
    checkUsername(username:$username)
  }
`;
export const CHECK_EMAIL = gql`
  mutation checkEmail($email: String!) {
    checkEmail(email:$email)
  }
`;