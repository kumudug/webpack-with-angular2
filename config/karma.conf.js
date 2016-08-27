var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  };

  config.set(_config);
};


//We're telling Karma to use webpack to run the tests. We don't precompile our TypeScript; Webpack transpiles our Typescript files on the fly, in memory, and feeds the emitted JS directly to Karma. There are no temporary files on disk.

//The karma-test-shim tells Karma what files to pre-load and primes the Angular test framework with test versions of the providers that every app expects to be pre-loaded.