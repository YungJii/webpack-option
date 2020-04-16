const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const webpack = require('webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(
	merge(baseWebpackConfig, {
	    mode: 'development',
	    plugins: [
	    	// 定义环境变量，可以在dev的环境下js获取DEV的值 
	        new webpack.DefinePlugin({
	            DEV: JSON.stringify('dev'), //字符串
	            FLAG: 'true' //FLAG 是个布尔类型
	        })
	    ]
	    //...其它的一些配置
	})
)


