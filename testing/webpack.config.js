const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const productionConfig = require('./webpack.prod.config');
const developmentConfig = require('./webpack.dev.config');

module.exports = (env) => {
  switch(env) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}