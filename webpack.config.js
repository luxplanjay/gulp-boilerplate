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

const isProductionMode = yargs.argv.production;

export default {
    entry: createEntryConfig('./src/'),
    mode: isProductionMode ? 'production' : 'development',
    devtool: isProductionMode ? false : 'inline-source-map',
    output: {
        filename: isProductionMode ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
        chunkFilename: isProductionMode ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
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
