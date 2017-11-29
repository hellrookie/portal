var path = require('path');
fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entries = {
    vendorDOM:['react', 'react-dom'],
    vendorThird:['jquery', 'bootstrap'],
};

var entryFiles = [];

function getEntry(folderPath, ext) {
    function finder(fp) {
        var files = fs.readdirSync(fp);
        files.forEach(function (val) {
            var fPath = path.resolve(fp, val);
            var stats = fs.statSync(fPath);
            //if(stats.isDirectory()) finder(fPath); // get files recursively
            if (stats.isFile() && fPath.endsWith(ext)) {
                console.log(fPath);
                var fileName = val.substr(0, val.lastIndexOf('.'));
                entryFiles.push(fileName);
                entries[fileName] = fPath;
            } else {
                console.log('exclude file: ' + fPath);
            }
        });
    }

    console.log("************* begin to find entry files *****************");
    finder(folderPath);
    console.log("************* find entry files finish *****************");
    if (entries.length <= 0) {
        console.log('Warning: no file find to build!!!');
    }
    return entries;
}

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendorDOM', 'vendorThird'],
        minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendorDOM', 'vendorThird'],
    }),
    new CleanWebpackPlugin(['build'],
        {
            root: __dirname,
            verbose: true,
            dry: false,
        }),
    new ExtractTextPlugin('style.css'),
];

function getPlugins() {
    for (var pos in entryFiles) {
        plugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'template.html'),
                filename: '../' + entryFiles[pos] + '.html',
                chunks: ['manifest', 'vendorDOM', 'vendorThird', entryFiles[pos]],
                chunksSortMode: 'manual'
            }));
    }
    return plugins;
}


module.exports = {
    entry: getEntry('./src', '.jsx'),
    output: {
        path: path.join(__dirname, "build/js/"),
        //publicPath: "build/js/",
        filename: "[name].[chunkhash].js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test:require.resolve('jquery'),
                use:[
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            {
                test:   /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader:
                    {
                        loader: 'url-loader',
                        options: 'limit=1000000'
                    }
            },
        ]
    },
    plugins: getPlugins(),
    devtool: 'source-map',
};