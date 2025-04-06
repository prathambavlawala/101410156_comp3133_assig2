import gql from 'graphql-tag';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      department
      position
    }
  }
`;

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      token
    }
  }
`;