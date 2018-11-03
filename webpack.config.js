const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project = require('./package');
const outputDirectory = 'dist';

module.exports = {
    entry: path.join(__dirname, '/src/js/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, outputDirectory)
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }]
    }
    ,
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin(
            {
                template: path.join(__dirname, '/src/index.html'),
                title: 'MineSweeper',
                version: project.version
            }
        )
    ]
};