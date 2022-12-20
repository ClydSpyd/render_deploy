const webpack = require('webpack');
const path = require('path');

module.exports = {
    //Use the src/index.js file as entry point to bundle it. 
    //If the src/index.js file imports other JavaScript files, bundle them as well.
    entry: path.resolve(__dirname, './src/index.js'), 

    //Tell Webpack on which files to use the loader (e.g. .js/.jsx files) 
    //and optionally which folders to exclude from the process (e.g. node_modules)
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                    },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx']
    },
    
    //The bundled source code files shall result in a bundle.js file in the /dist folder.
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },

    //Hot module replacement plugin
    plugins: [new webpack.HotModuleReplacementPlugin()],

    //The /dist folder will be used to serve our application to the browser.
    devServer: {
        static: path.resolve(__dirname, './build'),
        proxy: {
            '/api': 'http://localhost:5000/',
        },
    },
};