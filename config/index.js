import Endpoint from './Endpoint.js';

const baseConfig = (mode) => {
  return {
    PORT: 3000,
    APP_CONFIG: {
      ...Endpoint[mode],
    },
  };
};


export const Config = {
  getConfig:(mode) => {
    let config = {};
    switch (mode) {
      case 'develop':
        config = {
          env: 'development',
          ...baseConfig(mode)
        };
        break;
  
      case 'production':
        config = {
          env: 'production',
          ...baseConfig(mode)
        };
        break;
      
      default:
        config = {
          env: 'none',
          ...baseConfig(mode)
        };
        break;
    }
    return config;
  }
}


export const { getConfig } = Config;