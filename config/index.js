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
    return {
      env: mode,
      ...baseConfig(mode)
    };
  }
};


export const { getConfig } = Config;
