module.exports = {
    console: {
        src: ["src/js/**/*_spec.js"],
        options: {
            reporter: ["dot"]
        }
    },
    watch: {
        src: ["src/js/**/*_spec.js"],
        options: {
            reporter: ["dot"]
        }
    },
    ci: {
        src: ["src/js/**/*_spec.js"],
        options: {
            reporter: ["XUnit"],
	    captureFile: "junit-report.xml"
        }
    }
};
