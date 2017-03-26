const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    context: resolve(__dirname, 'src'),

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader?modules', 'postcss-loader']}
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
