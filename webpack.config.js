'use strict';

const path                 = require('path'),
      webpack              = require('webpack'),
      HtmlWebpackPlugin    = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [
        './src/public/script/index.js',
        './src/public/style/index.css'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './static/script/script.bundle.js',
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'static/img/**/[name].[ext]',
                    }
                }]
            },
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.html', '.css']
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "static/style/style.bundle.css"}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: './src/public/libs/jquery.min.js',
            jQuery: './src/public/libs/jquery.min.js',
            'window.$': './src/public/libs/jquery.min.js'
        })
    ]
}