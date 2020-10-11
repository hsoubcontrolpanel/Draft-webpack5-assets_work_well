const path = require('path');
const ASSET_PATH = process.env.ASSET_PATH || '/';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  
    entry:  {
      'main': './src/index.js',
      'assets/js/banner': './src/assets/js/banner.js',
    },
  
    output: {
      publicPath: ASSET_PATH,
      path: path.join(__dirname, "/dist"),
      filename: '[name].js',
    }, 

    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        port: 8087,
        writeToDisk: true,
        // overlay :true
    },
    

    module: {
        rules: [
    
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    }
                ]
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '/',
                    },
                  },
                // 'style-loader',
                'css-loader', 
                'postcss-loader',
                'sass-loader'
                ]
            },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 sourceMap: true,
            //                 name: '[name].[ext]',
            //                 outputPath: "/assets/css",
            //             },
            //         },
            //         {
            //             loader: "extract-loader",
            //             // options: {
            //             //     publicPath: "../",
            //             // }
            //         },
            //         {
            //             loader: "css-loader",
            //         },
            //         {
            //             loader: "postcss-loader",
            //         },
            //         {
            //             loader: "sass-loader",
            //         },

            //     ],
            // },
                    
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                exclude: /fonts/,
                use: [
                    {
                        loader: "file-loader", 
                        options: {
                        name: '[name].[ext]',
                        outputPath: "assets/images",
                        // esModule: false,
                        }
                    }
                ]
            },

            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                exclude: /images/,
                use: [
                    {
                        loader: "file-loader", 
                        options: {
                        name: '[name].[ext]',
                        outputPath: "assets/fonts",
                        }
                    }
                ]
            },

        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({ 
          filename: "index.html",
          template: "./src/index.html",
          chunks: ['main'],
         
        }),
      
        new MiniCssExtractPlugin({filename: "./assets/css/styles.css"}),
        new OptimizeCSSAssetsPlugin({}),
       
    ]
    
}  