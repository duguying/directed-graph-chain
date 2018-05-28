/**
 * Copyright 2018 Rex Lee
 *
 * THIS FILE IS PART OF directed-graph PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/26.
 */

const path = require('path');

const version = require("./package.json").version;

module.exports = {
    entry: './src/wrapper.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: 'ts-loader',
                exclude: [
                    path.resolve(__dirname, './node_modules/'),
                    path.resolve(__dirname, 'test')
                ]
            }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    output: {
        filename: `d-graph-${version}.js`,
        path: path.resolve(__dirname, 'dist/release')
    }
};