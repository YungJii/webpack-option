const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 抽离的css进行压缩
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// webpack中集成了局部热更新的功能
const webpack = require('webpack')

// console.log(process)
console.log('------------------------------------------------------------------------')
// console.log(require('./public/config'))
// {
//   dev: { template: { title: '你好', header: false, footer: false } },
//   build: { template: { title: '你好才怪', header: true, footer: false } }
// }

module.exports = {
    // 入口文件： 也是默认配置
    // entry: './src/index.js',
	
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 必须是绝对路径
        filename: '[name].[hash:6].js',
        publicPath: '/'
    },

    // 找寻文件的规则    
    resolve: {
        // 先找 js文件、然后是.vue文件、最后是.json文件。且在引入时可以省略文件后缀：import dialog from '../dialog';
        extensions: ['.js', '.vue', '.json'],
        // 配置webpack去哪些目录下寻找第三方模块
        modules: ['./src/components', 'node_modules'],
        // 别名
        alias: {
            '@C': './src/components'
        }
    },

    // 局部热更新
    devServer: {
        hot: true
    },

    // 告知webpack使用相应模式的内置优化
    devtool: 'cheap-module-eval-source-map', // 开发环境下使用 映射到开发环境下的代码行
    mode: isDev ? 'development' : 'production',
    // 数组， 放着所有的webpack插件
    // 其中自动插入了 script 脚本， 引入的是我们打包之后的js 文件
    plugins: [
        // 第一个页面
        new HtmlWebpackPlugin({
        	template: './public/index.html',
        	filename: 'index.html', // 打包后的文件名
        	// minify: {
        	// 	removeAttributeQuotes: false, // 是否删除属性的双引号
        	// 	collapseWhitespace: false, // 是否折叠空白
        	// }
            chunks: ['index'], // 指定引入的js和css
        	config: config.template
        }),
        // 第二个页面
         new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html', // 打包后的文件名
            // minify: {
            //  removeAttributeQuotes: false, // 是否删除属性的双引号
            //  collapseWhitespace: false, // 是否折叠空白
            // }
            chunks: ['login'], // 指定引入的js
            config: config.template
        }),
        // 将在html 引入的js文件融入到bundle文件里
        new CopyWebpackPlugin([
                {
                    from: 'public/js/*.js',
                    to: path.resolve(__dirname, 'dist', 'js'),
                    flatten: true
                },
                // 还可以继续配置其它要拷贝的文件
            ],
            // {
            //     // 访问都访问不到
            //     ignore: ['other.js']
            // }
        ),
        // 抽离Css 这个对象需要先声明在后面的module才能够引入
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // 抽离的css进行压缩
        new OptimizeCssPlugin(),

        // webpack中的热更新插件
        new webpack.HotModuleReplacementPlugin()
        // ,
        // // 找到 outoptPath 每次build就清除一遍
        // new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(c|le)ss$/,
                // style-loader 动态创建style标签，将css插入到head中
                // css-loader 负责处理@import等语句
                // postcss-loader 和 autoprefixer， 自动生成浏览器兼容性前缀 样式的兼容性前缀
                // less-loader 负责处理编译 .less 文件， 将其转为 css
                use: [ 
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: isDev,
                                reloadAll: true,
                            }
                        }, 
                        'css-loader', 
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugin: function() {
                                    return [
                                        require('autoprefixer')()
                                    ]
                                }
                            }
                        }, 
                        'less-loader'
                     ], // 从右往左边执行的load栈
                exclude: /node_modules/
            },
            {
                // 解决样式的图片引入
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        // 图片/字体文件处理
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false,
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            }
            // ,
            // {   
            //     // 解决html中路径的引入, 但是使用后不能用 vm ejs 的模板了
            //     // 可以使用<img src="<%= require('./thor.jpeg') %>" /> 解决
            //     test: /.html$/,
            //     use: 'html-withimg-loader'
            // }
        ]
    },
    // 配置 webpack-dev-server的其它配置
    devServer: {
        port: '3000', // 默认是8080
        quiet: false, // 默认不启用
        inline: true, // 默认开启inline模式， 如果设置为false，开启iframe模式
        stats: "errors-only", // 终端仅打印error
        overlay: false,
        clientLogLevel: "silent" , // 日志等级
        compress: true // 是否启用gzip压缩
    }
}