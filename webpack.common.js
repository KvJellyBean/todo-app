const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            fileName: 'index.html',
            favicon: './src/images/todoLogo.svg',
            title: 'Jellist',
            templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html lang="en"><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"content\"></div></body></html>',
            meta: {
                description: { name: 'description', content: 'A responsive task management app that transcends the ordinary. Effortlessly manage your tasks with intuitive features, easily navigate through categories like today\'s tasks, weekly goals, and completed assignments. Prioritize with precision based on urgency and organize seamlessly by project. Experience a refined and organized approach to task management with Jellist, empowering you to conquer your daily responsibilities with ease.' },
                keyword: { name: 'keywords', content: 'task management, to do app, productivity' },
                author: { name: 'author', content: 'KvJellyBean' },
                viewport: 'width=device-width, initial-scale=1.0'
            }
        }),
    ]
}