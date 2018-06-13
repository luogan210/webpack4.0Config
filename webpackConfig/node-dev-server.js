const merge=require("webpack-merge")
const express=require("express");
const webpackDevMiddleware=require("webpack-dev-middleware");
const webpack=require("webpack");
const webpackDevServer=require("webpack-dev-server");
process.env.NODE_ENV ="development"


const app=express();
const devConfig=require("./node.dev.config.js");

console.log("devConfig",devConfig)

const compiler=webpack(devConfig);


const hotMiddleware=require("webpack-hot-middleware")(compiler);


const devMiddleware=webpackDevMiddleware(compiler,{
	noInfo:true,
	publicPath:"/"
})


app.use(devMiddleware);

app.use(hotMiddleware);


devMiddleware.waitUntilValid(function(){
	console.log("devser is valid");
})

app.listen(3000,function(){
	console.log("devServer is running at 3000");
})



