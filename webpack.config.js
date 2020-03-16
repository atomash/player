const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/index.ts', './src/scss/style.scss'],
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          /* // for development mode
            {
                loader: "style-loader",
                options: {
                    singleton: true
                }
            },
            */
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist',
              minimize: true
            }
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'style.css' })],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
