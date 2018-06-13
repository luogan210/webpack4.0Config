process.env.NODE_ENV = "production"

const proConfig=require("./webpack.product.config.js");
const webpack=require("webpack");


webpack(proConfig,function(params) {
    console.log("webpack build for production finished",params)
})
