const path = require('path');


/** Plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },

    devServer: {
        port: 9000,
        static: {  			// Directorio de acceso
            directory:path.resolve(__dirname, './dist'),
        },
        devMiddleware: {                                // Indicamos la raiz del proyecto
            index: 'index.html',
            writeToDisk: true                               // default(false) Genera el dist mientras se ejecuta
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        })
    ]
}