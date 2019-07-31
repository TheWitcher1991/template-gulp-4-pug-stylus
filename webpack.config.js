'use strict';

const path                 = require('path'),
      webpack              = require('webpack'),
      HtmlWebpackPlugin    = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CopyWebpackPlugin    = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    build: path.join(__dirname, './build'),
    assets: 'static/'
};

module.exports = {
    entry: [
        `${PATHS.src}/public/script/index.js`,
        `${PATHS.src}/public/style/index.css`
    ],
    output: {
        path: path.resolve(__dirname, PATHS.build),
        filename: `${PATHS.assets}script/script.bundle.js`,
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
                        name: '[name].[ext]',
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
        new MiniCssExtractPlugin({filename: `${PATHS.assets}style/style.bundle.css`}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: `${PATHS.src}/index.html`,
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: `${PATHS.src}/public/libs/jquery.min.js`,
            jQuery: `${PATHS.src}/public/libs/jquery.min.js`,
            'window.$': `${PATHS.src}/public/libs/jquery.min.js`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/public/img`, to: `${PATHS.assets}img` }
        ])
    ]
}