const webpack = require("webpack");
const path = require("path");
const config = {
    devtool: "eval-source-map",
    entry: path.join(__dirname, "app/App.js"),
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{loader: "babel-loader"}]
        }]
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true
    },
}

if ( process.env.NODE_ENV === "production" ) {
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglyfyJsPlugin({comments:true}),
        new webpack.DefinePlugin({
            "process.env": {NODE_ENV: JSON.stringify("production")}
        })
    ];
};

module.exports = config;