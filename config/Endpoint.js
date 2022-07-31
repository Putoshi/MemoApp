export default {
  develop: {
    ENDPOINT: {
      LOGIN_URL: 'http://localhost:8080/login'
    }
  },
  staging: {
    ENDPOINT: {
      LOGIN_URL: 'http://staging/login'
    }
  },
  production: {
    ENDPOINT: {
      LOGIN_URL: 'http://production/login'
    }
  },
};