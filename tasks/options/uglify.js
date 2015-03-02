module.exports = {
    prod: {
        files: [{
            expand: true,
            cwd: "<%= buildDir %>",
            src: "js/*.js",
            dest: "<%= buildDir %>/js/",
            flatten: true
        }]
    }
};