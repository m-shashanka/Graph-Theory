const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname,'src/index.js'),
    output:{
        library: {
            name: 'lib',
            type: 'var',
        }
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Graph Visualizer',
            filename: './index.html',
            template: './src/index.html',
            favicon: "./src/favicon.ico",
        }),
    ],
}