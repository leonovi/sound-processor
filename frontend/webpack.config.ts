import path from 'node:path';
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config: Configuration = {
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
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.BUNDLE_ANALYZER
        ? 'server'
        : 'disabled',
    }),
  ],
  resolve: {
    alias: {
      components: path.join(__dirname, '/src/components'),
      configs: path.join(__dirname, '/src/configs'),
      context: path.join(__dirname, '/src/context'),
      hooks: path.join(__dirname, '/src/hooks'),
      icons: path.join(__dirname, '/src/icons'),
      store: path.join(__dirname, '/src/store'),
      'style-guide': path.join(
        __dirname,
        '/src/style-guide'
      ),
      utils: path.join(__dirname, '/src/utils'),
    },
  },
};

export default config;
