process.env.NODE_ENV = "production"

const proConfig=require("./webpack.product.config.js");
const webpack=require("webpack");


webpack(proConfig,function(params,stats) {
    console.log("webpack build for production finished",params)

    process.stdout.write(stats.toString({
        colors:true,
        modules:true,
        children:false,
        chunks:true,
        chunkModules:true
    }))
})
