const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackcPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/ts/app.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false
                        }
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  process.env.NODE_ENV !== 'production'
                    ? 'style-loader'
                    : MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            three: path.resolve("./node_modules/three")
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js'
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: false,
        port: 8000
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackcPlugin({
            template: "src/html/index.html"
        }),
    ]
};