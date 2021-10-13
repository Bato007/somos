const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|jpg|png|gif|woff|woff2|eot|ttf|pdf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
        options: {
          outputPath: 'images',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/static/favicon.png',
      templateContent:
      `<html>
        <title>SOMOS</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <body>
          <div id="root"></div>
        </body>
      </html> `,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/static', to: 'static' },
      ],
    }),
  ],
}
