module.exports = function (grunt) {

    grunt.registerTask("dev", function () {
        var backgroundWatch = grunt.util.spawn({grunt: true, args: ["js", "--watch"]}, function () {
            grunt.log.writeln("done");
        });
        backgroundWatch.stdout.pipe(process.stdout);
        backgroundWatch.stderr.pipe(process.stderr);
        grunt.task.run(["less", "jshint", "mochaTest:console", "watch"]);
    });

};