const path = require('path');
const HWP = require('html-webpack-plugin');
const project = require('./package');

module.exports = {
    entry: path.join(__dirname, '/src/js/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
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
        new HWP(
            {
                template: path.join(__dirname, '/src/index.html'),
                title: 'Minesweeper',
                version: project.version
            }
        )
    ]
};