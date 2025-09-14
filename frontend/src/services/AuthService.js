import apiClient from './ApiClient';

const LOGIN_MUTATION = `
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

const ME_QUERY = `
  query {
    me {
      id
      email
      firstName
      lastName
      rol {
        id
        nombre
      }
    }
  }
`;

const AuthService = {
  login: (email, password) => {
    return apiClient.post('/graphql/', {
      query: LOGIN_MUTATION,
      variables: { email, password },
    });
  },

  getMe: () => {
    return apiClient.post('/graphql/', {
      query: ME_QUERY,
    });
  },
};

export default AuthService;
