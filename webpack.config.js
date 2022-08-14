var webpack = require('webpack');

module.exports = {
    entry:"./background_beforecompile.js",
    output: {
        path:__dirname,
        filename:"background.js"
    },
    /* devtool:"source-map", */
    /* optimization:{
        minimize:false,
    } */
}