import apiClient from './ApiClient';

const LOGIN_MUTATION = `
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
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
  login: (username, password) => {
    return apiClient.post('/graphql/', {
      query: LOGIN_MUTATION,
      variables: { username, password },
    });
  },

  getMe: () => {
    return apiClient.post('/graphql/', {
      query: ME_QUERY,
    });
  },
};

export default AuthService;
