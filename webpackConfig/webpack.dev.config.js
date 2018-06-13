process.env.NODE_ENV = "development"
const utils=require("./utils")
const merge = require("webpack-merge");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const baseConfig = require("../webpackConfig/webpack.base.js")
const config=require("../config");

module.exports = merge(baseConfig, {
	devtool: "cheap-eval-source-map",
	mode: "development",
	module:{
		rules:utils.styleLoaders({sourceMap:config.dev.cssSourceMap})
	},
	devServer: {
		contentBase: path.join(__dirname, "..", "dist"),
		open: true,
		hot: true,
		host: "localhost",
		port: 8090,
		openPage:"index.html"
	},
	output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
})