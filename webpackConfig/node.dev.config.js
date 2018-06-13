const merge=require("webpack-merge")
const path = require("path");
const webpack = require("webpack");
const entries = require("./webpack.base.js").entry;
const utils=require("./utils");
const config=require("../config");
const baseConfig=require("./webpack.base.js");

//需要在开发环境生成的打包文件中加入热更新组件的客户端js文件:client.js

Object.keys(entries).forEach(function (value) {
	entries[value] = ["webpack-hot-middleware/client?reload=true"].concat(entries[value])
})
module.exports = merge(baseConfig,{
	devtool: "inline-source-map",
	mode: "development",
	module:{
		rules:utils.styleLoaders({sourceMap:config.dev.cssSourceMap})
	},
	//	entry:entries,  //直接在原有的entry上修改了，不需要再写一次，否则会报twice错误
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
})
