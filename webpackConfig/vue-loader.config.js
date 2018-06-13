const utils = require("./utils");
const config = require("../config");
const isProduction = process.env.NODE_ENV === "production";
const sourceMap = isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap;

const loaders = utils.cssLoaders({
    sourceMap: sourceMap,
    extract: isProduction
})

module.exports={
    loaders:loaders
}