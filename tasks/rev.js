module.exports = function (grunt) {


  grunt.registerTask("rev", ["filerev", "writeSummary"]);

  grunt.registerTask("writeSummary", function () {
    grunt.task.requires("filerev");
    var result = {};
    var keys = Object.keys(grunt.filerev.summary);
    keys.forEach(function (key) {
      result[key.replace("public", "")] = grunt.filerev.summary[key].replace("public", "");
    });
    grunt.file.write(grunt.template.process("<%= buildDir %>/map.json"), JSON.stringify(result));
  });
};