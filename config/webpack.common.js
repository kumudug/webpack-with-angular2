//Webpack is a NodeJS-based tool so its configuration is a JavaScript commonjs module file that begins with require statements as such files do.

//We will define separate configurations for development, production, and test environments. All three have some configuration in common. We'll gather that common configuration in a separate file called webpack.common.js.

//Webpack is a NodeJS-based tool so its configuration is a JavaScript commonjs module file that begins with require statements as such files do.
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    //We feed Webpack with one or more entry files and let it find and incorporate the dependencies that radiate from those entries. We are splitting our application into three bundles:
    entry: {
        'polyfills': './src/polyfills.ts', //the standard polyfills we require to run Angular 2 applications in most modern browsers. Load Zone.js early, immediately after the other ES6 and metadata shims.
        'vendor': './src/vendor.ts', //the vendor files we need: Angular 2, lodash, bootstrap.css...
        'app': './src/main.ts' //our application code.
    },

    //But most of our import statements won't mention the extension at all. So we tell Webpack to resolve module file requests by looking for matching files with
    resolve: {
        extensions: ['', //an explicit extension
            '.js', //.js extension
            '.ts'] //.ts extension
    },

    //Webpack can bundle any kind of file: JavaScript, TypeScript, CSS, SASS, LESS, images, html, fonts, whatever. Webpack itself doesn't know what to do with a non-JavaScript file. We teach it to process such files into JavaScript with loaders. Here we configure loaders for TypeScript and CSS:
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', //a loader to transpile our Typescript code to ES5, guided by the tsconfig.json file
                    'angular2-template-loader'] //loads angular components' template and styles
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'), //application-wide styles. excludes .css files within the /src/app directories where our component-scoped styles sit. It includes only .css files located at or above /src; these are the application-wide styles
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'), //filters for component-scoped styles and loads them as strings via the raw loader — which is what Angular expects to do with styles specified in a styleUrls metadata property.
                loader: 'raw'
            }
        ]
    },

    //Webpack has a build pipeline with well-defined phases. We tap into that pipeline with plugins such as the uglify minification plugin:
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        //We want the app.js bundle to contain only app code and the vendor.js bundle to contain only the vendor code. Our application code imports vendor code. Webpack is not smart enough to keep the vendor code out of the app.js bundle. We rely on the CommonsChunkPlugin to do that job.

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
        //Webpack generates a number of js and css files. We could insert them into our index.html manually. That would be tedious and error-prone. Webpack can inject those scripts and links for us with the HtmlWebpackPlugin.
    ]
};
