
// 拆分成三个文件

const dotenv = require("dotenv");
dotenv.config();

const {merge} =require('webpack-merge');
const baseConfig = require('./webpack.common.js')

module.exports = merge(baseConfig, {
    entry: "./src/index-num.ts", 
    mode: "development",

    devServer: {
        historyApiFallback: true,
        port:8080,
        hot:true
    }
});