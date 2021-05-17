import fs from 'fs';

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

export default {
    entry: createEntryConfig('./src/js/'),
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
