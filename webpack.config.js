const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');


module.exports = {
  entry: "./react/app.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "http://localhost:3000/js/",
    filename: "app.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 3000,
    // publicPath: "http://localhost:3000/js/",
    hot: true,
    hotOnly: true,
    disableHostCheck: true
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
          filename: `public/css/app.css`
        }),
  ]
};
