const path=require("path");

module.exports={
	build:{
        env:require("./prod.env"),
		assetsRoot:path.resolve(__dirname,"../dist"),//文件存入本地的目录
		assetsSubDirectory:'public/assets',//文件存入本地的目录的子目录
		assetsPublicPath:"/",
		sourceMap:true,
		productionSourceMap:true
	},
	dev:{
        env:require("./dev.env"),
		assetsSubDirectory:'static',
		assetsPublicPath:"/",
		cssSourceMap:true
	}
}
