module.exports = function (grunt) {
  grunt.registerTask("assets", function () {
    grunt.task.run(["less", "js"]);
    if (grunt.config.get("prod")) {
      grunt.task.run(["uglify", "rev"]);
    }
  });
};