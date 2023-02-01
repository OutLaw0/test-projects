const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

/* global API_URL */
const API_URL = {
  production: JSON.stringify('/promo/federal/'),
  development: JSON.stringify('')
}

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
  mode: mode,
  entry: {
    scripts: './src/index.js',

  },
  output: {
    filename: '[name].js', // '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "assets/[name][ext][query]", // "assets/[hash][ext][query]",
    clean: true
  },
  devtool: 'eval-source-map',
  devServer: {
    open: true,
    hot: true,
    port: 'auto',
    static: {
      directory: './src',
      watch: true,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css' //'[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      env: API_URL[mode]
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        }
      ]
    }),
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      'API_URL': API_URL[mode]
    }),
  ],
  module: {
    rules: [{
      test: /\.html$/i,
      loader: 'html-loader'
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader, // (mode === 'development') ?  'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    //options
                  },
                ],
              ],
            },
          },
        },
        "sass-loader",
      ]
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: (name) => {
          /**
           * @description Remove first & last item from ${path} array.
           * @example
           *      Orginal Path: 'src/images/avatar/image.jpg'
           *      Changed To: 'images/avatar'
           */
          const path = name.filename.split("/").slice(1, -1).join("/");
          return `${path}/[name][ext][query]`;
        },
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource'
    },


    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }


      }
    }

    ]
  },
  /* stats: {
       children: true,
     },*/
};