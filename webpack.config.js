const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/public/',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              import: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    alias: {
      components: path.join(__dirname, '/src/components'),
      context: path.join(__dirname, '/src/context'),
      data: path.join(__dirname, '/src/data'),
      hooks: path.join(__dirname, '/src/hooks'),
      icons: path.join(__dirname, '/src/icons'),
      models: path.join(__dirname, '/src/models'),
      'style-guide': path.join(__dirname, '/src/style-guide'),
      utils: path.join(__dirname, '/src/utils'),
      worklets: path.join(__dirname, '/src/worklets'),
    },
  },
};
