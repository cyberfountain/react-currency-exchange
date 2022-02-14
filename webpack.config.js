const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        mode: env.WEBPACK_BUILD ? 'production' : 'development',
        entry: './src/index.jsx',
        output: {
            path: __dirname + '/dist/',
        },
        devServer: {
            proxy: {
                "*": "http://[::1]:80"
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: { loader: 'babel-loader' }
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                },
                {
                    test: /\.(jpg|png)$/,
                    use: {
                        loader: 'url-loader',
                    },
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000,
                            },
                        },
                    ],
                },
            ]
        },
        devtool: env.WEBPACK_BUILD ? undefined : 'source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/assets/img/favicon.ico'
            })
        ]
    }
};