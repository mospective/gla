module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: [
            "> 0.3%",
            "last 7 versions",
            "Android >= 4",
            "Firefox >= 20",
            "iOS >= 8",
            "ie > 9"
        ],
        autoprefixer: {
            grid: true
        }
        },
    },
};
