import fs from 'fs';
import yargs from 'yargs';

const createEntryConfig = dirPath => {
    return fs
        .readdirSync(dirPath)
        .filter(filename => filename.endsWith('.js'))
        .reduce((config, filename) => {
            const key = filename.replace('.js', '');
            config[key] = dirPath + filename;
            return config;
        }, {});
};

const isProdMode = yargs.argv.production;

export default {
    entry: createEntryConfig('./src/js/'),
    mode: isProdMode ? 'production' : 'development',
    devtool: isProdMode ? false : 'inline-source-map',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
};
