const isProd = process.env.NODE_ENV === 'production'
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.styl(us)?$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true }
                            },
                            'stylus-loader'
                        ],
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                // exclude: /node_modules/
            },
            // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            { test: /\.ts$/, use: 'ts-loader' }
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
    })],
    
    // rules: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'vue-loader',
    //     options: {
    //       compilerOptions: {
    //         preserveWhitespace: false
    //       }
    //     }
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.(png|jpg|gif|svg)$/,
    //     loader: 'url-loader',
    //     options: {
    //       limit: 10000,
    //       name: '[name].[ext]?[hash]'
    //     }
    //   },
    // ]
};