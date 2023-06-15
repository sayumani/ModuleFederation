const { merge } = require("webpack-merge");
const commmon = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");
const path = require("path");

module.exports = merge(commmon, {
  entry: "./demo/index.js",
  output: {
    publicPath: "http://localhost:8083/",
    filename: "[name].[contenthash].js",
  },
  mode: "development",
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
      directory: path.join(__dirname, "./")
    },
    port: 8083,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "signup",
      filename: "remoteEntry.js",
      exposes: {
        "./Signup": "./src/Signup",
      },
      shared: {
        ... packageJson.dependencies,
        react: { singleton: true, eager: true, requiredVersion: packageJson.dependencies.react },
        "react-dom": { singleton: true, eager: true, requiredVersion: packageJson.dependencies["react-dom"] }
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
});
