const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './demo/router.js',
    output: {
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                    presets: [
                        [require.resolve('@babel/preset-typescript'), {jsxPragma: 'h'}],
                        [require.resolve('@babel/preset-env'), {
                            targets: {
                                browsers: ['last 2 versions', 'IE >= 9']
                            },
                            modules: false,
                            loose: true
                        }],
                        [require.resolve('@babel/preset-react')],
                    ],
                    plugins: [
                        [require.resolve('@babel/plugin-transform-runtime')],
                        [require.resolve('@babel/plugin-transform-react-jsx'), {pragma: 'h', pragmaFrag: 'Fragment'}],
                        [require.resolve('@babel/plugin-proposal-decorators'), {legacy: true}],
                        [require.resolve('@babel/plugin-proposal-class-properties'), {loose: true}],
                    ]
                }
            },
            {
                test: /\.s?css$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./demo/index.html"),
        })
    ]
};
