const glob = require("glob");
const path = require("path");
const config = require("../config")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports.getEntries = function (globPath, type) {

    var entries = {};
    var entriesPath = glob.sync(globPath);
    var isHTML = type == !undefined ? true : false
    if (isHTML) {
        entriesPath.forEach(function (value, key) {
            var entryKey = value.split("/").splice(-2)[0];
            entries[entryKey] = value;
        })
    } else {
        entriesPath.forEach(function (value, key) {
            var entryKey = value.split("/").splice(-2)[0];
            entries[entryKey] = value;
        })
    }

    //	console.log("entries",entries);
    return entries
}
module.exports.mkAssetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV == "production" ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    console.log("mkAssetsPath",path.posix.join(assetsSubDirectory, _path))
    return path.posix.join(assetsSubDirectory, _path)
}

module.exports.cssLoaders = function (options) {
    options = options || {};
    const cssLoader = {
        loader: "css-loader",
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: "postcss-loader",
        options: {
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

        if (loader) {
            loaders.push({
                loader: loader + "-loader",
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: "style-loader"
            })
        } else {
            return ["style-loader"].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders("less"),
        sass: generateLoaders("sass", {
            indentedSyntax: true
        }),
        scss: generateLoaders("scss"),
        stylus: generateLoaders("stylus"),
        styl: generateLoaders("stylus")
    }

}
module.exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

// module.exports.getEntries("./src/entryPages/**/*.js")