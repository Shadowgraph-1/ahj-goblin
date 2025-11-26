const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  // Получаем имя репозитория из переменной окружения или используем пустую строку для локальной разработки
  const repoName = process.env.REPO_NAME || '';
  const publicPath = isProd && repoName ? `/${repoName}/` : '/';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
      publicPath,
    },
    devtool: isProd ? false : 'source-map',
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 8080,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.s[ac]ss$|\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'Goblin Game',
      }),
      ...(isProd ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })] : []),
    ],
  };
};