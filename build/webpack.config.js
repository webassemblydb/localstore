const path = require("path")
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
    }
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
    //   {
    //     test: /\.styl(us)?$/,
    //     use: isProd
    //       ? ExtractTextPlugin.extract({
    //           use: [
    //             {
    //               loader: 'css-loader',
    //               options: { minimize: true }
    //             },
    //             'stylus-loader'
    //           ],
    //           fallback: 'vue-style-loader'
    //         })
    //       : ['vue-style-loader', 'css-loader', 'stylus-loader']
    //   },
    // ]
};