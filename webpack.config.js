var path = require('path');
fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var entries = {};
function getEntry(folderPath, ext) {
    function finder(fp) {
        var files = fs.readdirSync(fp);
        files.forEach(function (val) {
            var fPath = path.resolve(fp, val);
            var stats = fs.statSync(fPath);
            //if(stats.isDirectory()) finder(fPath); // get files recursively
            if (stats.isFile() && fPath.endsWith(ext)) {
                console.log(fPath);
                entries[val.substr(0, val.lastIndexOf('.'))] = fPath;
            }else{
                console.log('exclude file: ' + fPath);
            }
        });
    }
    console.log("************* begin to find entry files *****************");
    finder(folderPath);
    console.log("************* find entry files finish *****************");
    if(entries.length <= 0){
        console.log('Warning: no file find to build!!!');
    }
    return entries;
}

var plugins = [];
function getPlugins() {
    for(var name in entries){
        plugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'template.html'),
                filename: '../'+name+'.html',
                chunks: [name],
                hash:true,
            }));
    }
    return plugins;
}


module.exports = {
    entry: getEntry('./src', '.jsx'),
    output: {
        path: path.join(__dirname, "build/js/"),
        //publicPath: "build/js/",
        filename: "[name].js",
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
            }
        ]
    },
    plugins:getPlugins(),
    devtool: 'source-map',
};