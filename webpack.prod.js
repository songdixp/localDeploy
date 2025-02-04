// 生产环境
const dotenv = require("dotenv");
dotenv.config();

const {merge} =require('webpack-merge');
const baseConfig = require('./webpack.common.js')

module.exports = merge(baseConfig, {
    mode: "production",

    
});