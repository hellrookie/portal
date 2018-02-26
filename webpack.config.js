var path = require('path');
fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
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
    if (entryFiles.length <= 0) {
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
        chunksSortMode: function (a, b) {
            const orders = ['manifest', 'vendor', 'main'];
            return orders.indexOf(a.names[0]) - orders.indexOf(b.names[0]);
        }
    }),
    new CleanWebpackPlugin(['dist'],
        {
            root: __dirname,
            verbose: true,
            dry: false,
        }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackHarddiskPlugin(),
];

function getPlugins() {
    for (var pos in entryFiles) {
        plugins.push(
            new HtmlWebpackPlugin({
            template: path.join(__dirname, 'template.html'),
            title: entryFiles[pos],
            filename: entryFiles[pos] + '.html',
            chunks: ['manifest', 'vendorThird', 'vendorDOM', entryFiles[pos]],
            chunksSortMode: 'manual',
            alwaysWriteToDisk: true,
        }));
    }
    return plugins;
}


module.exports = {
    entry: getEntry('./src', '.jsx'),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name].js",
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
            {
                test:   /\.(jpg|png)$/,
                loader:
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: './images/[name].[ext]',
                        }
                    }
            },
        ]
    },
    plugins: getPlugins(),
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 20001,
        openPage: 'home.html',
    }
};