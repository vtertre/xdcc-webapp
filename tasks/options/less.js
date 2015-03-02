module.exports = {
    options: {
        cleancss: "<%= prod %>",
        sourceMap: "<%= !prod %>"
    },
    all: {
        files: [{
            expand: true,
            cwd: "src/less",
            src: ["*.less"],
            dest: "<%= buildDir %>/css",
            ext: ".css"
        }]
    }
};