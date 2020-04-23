const webpack = require('webpack');

module.exports = {
    entry: './3d/index.js',
    output: {
        filename: 'main.js',
    },
    devServer: {
        inline: true,
        port: 8080
    },
}
