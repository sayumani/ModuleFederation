const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

const commmon = require("./webpack.common");

module.exports = merge(commmon, {
  mode: "production",
  output: {
    publicPath: "/container/",
    filename: "[name].[contenthash].js",
  },
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
      name: "container",
      remotes: {
        login: "login@http://localhost:8081/remoteEntry.js",
        signup: "signup@http://localhost:8083/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
});
