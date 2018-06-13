const merge = require("webpack-merge");
const cleanWebapckPlugin = require("clean-webpack-plugin");
const path = require("path");
const baseConfig = require("./webpack.base.js");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const config = require("../config");
const utils=require("./utils");
const extractTextWebapckPlugin=require("extract-text-webpack-plugin");

function mkAssetsPath(_path) {
	return path.posix.join(config.build.assetsSubDirectory, _path)
}

var rules=utils.styleLoaders({
	sourceMap:config.build.productionSourceMap,
	extract:true
})
console.log("rules",rules)

module.exports = merge(baseConfig, {
	mode:"production",
	module: {
		rules:rules
	},
	output: {
		path: config.build.assetsRoot,
		filename: mkAssetsPath("js/[name].[chunkhash].js")
	},
	optimization: {
		runtimeChunk: {
			name: "manifest"
		},
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	},
	plugins: [
		new cleanWebapckPlugin(["./dist"], {
            root: path.resolve(__dirname, "../")
		}),
		new extractTextWebapckPlugin({
			filename:mkAssetsPath("css/[name].css")
		})
	]
})
