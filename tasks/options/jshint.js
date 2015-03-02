module.exports = {
    all: ["src/js/**/*.js"],
    options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
    }
};