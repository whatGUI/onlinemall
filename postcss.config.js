module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewPortWidth: 375,
            viewPortHeight: 667,
            unitPrecision: 5,
            viewPortUnit: 'vw',
            selectorBlackList: ['ignore'],
            minPixelValue: 1,
            mediaQuery: false
        }

    }
}