const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = (env, options) => {
    const devMode = options.mode !== "production";

return {
    entry: {
        index: path.resolve(__dirname, "src", "index.js")
    },
    output: {
        filename: devMode ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
           {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'sass-loader',
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            },
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                parse: toml.parse,
                }
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                parse: yaml.parse,
                }
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                parse: json5.parse,
                }
            },
        ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            favicon: "./src/favicon.ico"
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
        })
    ],
}
};