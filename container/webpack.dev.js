const { merge } = require("webpack-merge");
const commmon = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");
const path = require("path");

module.exports = merge(commmon, {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
    filename: "[name].[contenthash].js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./demo")
    },
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        login: "login@http://localhost:8081/remoteEntry.js",
        signup: "signup@http://localhost:8083/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8085/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
});
