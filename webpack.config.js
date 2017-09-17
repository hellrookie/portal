var path = require('path');
fs = require('fs');

module.exports = {
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "buid/js/"),
        publicPath: "buid/js/",
        filename: "[name].js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            }
        ]
    }
};

function getEntry() {
    return {
        "components": getFiles('./src/components', '.js')
    }
}

function getFiles(folderPath, ext) {
    var result = [];

    function finder(fp) {
        var files = fs.readdirSync(fp);
        files.forEach(function (val) {
            var fPath = path.resolve(fp, val);
            var stats = fs.statSync(fPath);
            //if(stats.isDirectory()) finder(fPath); // get files recursively
            if (stats.isFile() && fPath.endsWith(ext)) {
                console.log(fPath);
                result.push(fPath);
            }else{
                console.log('exclude file: ' + fPath);
            }
        });
    }
    console.log("************* begin to find entry files *****************");
    finder(folderPath);
    console.log("************* find entry files finish *****************");
    return result;
}