const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

const commmon = require("./webpack.common");

module.exports = merge(commmon, {
  entry: "./src/index.js",
  output: {
    publicPath: "/auth/",
    filename: "[name].[contenthash].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  optimization: {
    minimizer: [new UglifyJsPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "login",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/Login",
      },
      shared: packageJson.dependencies,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
});
