module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [ 'jasmine' ],
        files: [
            { pattern: 'tests/main.spec.ts', watched: false }
        ],
        preprocessors: {
            'tests/main.spec.ts': [ 'webpack', 'sourcemap' ]
        },
        webpack: require('./webpack.config')({env: 'test'}),
        reporters: [ 'spec' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [ 'PhantomJS' ],
        singleRun: true,
        concurrency: Infinity
    })
};