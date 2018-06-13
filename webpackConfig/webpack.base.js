const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const utils = require("./utils.js");
const webpack = require("webpack");
const vueLoaderConfig = require("./vue-loader.config.js")
var srcDir = path.resolve(__dirname, "../src");
var entries = utils.getEntries(srcDir + "/entryPages/**/*.js");
const {VueLoaderPlugin}=require("vue-loader");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    entry: entries,
    resolve: {
        alias: {
            "css": resolve("src/assets/styles"),
            "js": resolve("src/assets/js"),
            "img": resolve("src/assets/img"),
            "utils": resolve("src/utils"),
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [new VueLoaderPlugin()],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: [resolve("src")]
            }, {
                test: /\.(png|jpg|svg|gif)$/,
                loader: "file-loader",
                options: {
                    name: utils.mkAssetsPath("img/[name].[ext]")
                }
            }
        ]
    }
}
var templates = utils.getEntries("./src/entryPages/**/*.html", 1);
var templateName = "";
var config = {};
var chunkNames;
var index;

for (var pathName in templates) {
    chunkNames = Object.keys(templates);
    templateName = pathName;
    index = chunkNames.indexOf(templateName);
    chunkNames.splice(index, 1)
    config = {
        filename: templateName + ".html", //可以指定文件的输出路径pages/index.html,根目录根据outut参数的path决定
        template: templates[pathName],
        inject: true,
        // chunks: [templateName],
        excludeChunks: chunkNames,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    }

    // console.log("excludeChunks", config)


    module.exports.plugins.push(new htmlWebpackPlugin(config))
}