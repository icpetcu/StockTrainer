const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    context: resolve(__dirname, 'src'),

    entry: [
        './index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|jpg|woff|woff2|ico|gif)$/, use: ['url-loader?limit=8192']},
            {test: /\.(ttf|otf|svg|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['file-loader']}
        ]
    },

    plugins: [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
    ]
};
