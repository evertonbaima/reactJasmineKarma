var path = require('path');
var testHelperPath = path.resolve('test/testHelper.js')

module.exports = function(config) {
  config.set({
    // use the PhantomJS browser
    browsers: ['PhantomJS'],
    // use Jasmine
    frameworks: ['jasmine'],

    // files that Karma will server to the browser
    files: [
      // entry file for Webpack
      testHelperPath
    ],

    // before serving test/testHelper.js to the browser
    preprocessors: {
      [testHelperPath]: [
        // use karma-webpack to preprocess the file via webpack
        'webpack',
        // use karma-sourcemap-loader to utilize sourcemaps generated by webpack
        'sourcemap'
      ]
    },

    // webpack configuration used by karma-webpack
    webpack: {
      // generate sourcemaps
      devtool: 'inline-source-map',
      // enzyme-specific setup
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      module: {
        // lint JavaScript with Eslint
        //preLoaders: [
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                loader: "eslint-loader"
          }
        ],
        // use same loaders as Create React App
        loaders: [
          {
            exclude: [
              /\.(js|jsx)$/,
              /\.css$/,
              /\.json$/,
            ],
            loader: 'file',
            query: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.css$/,
            loader: 'style!css'
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ]
      },
      // relative path starts out at the src folder when importing modules
      resolve: {
        //root: path.resolve('./src')
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
      }
    },

    webpackMiddleware: {
      // only output webpack error messages
      stats: 'errors-only'
    },
  })
}