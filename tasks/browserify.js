module.exports = function (grunt) {

  var watchify = require("watchify");
  var browserify = require("browserify");
  var _ = require("underscore");

  grunt.registerTask("js", ["vendor", "app"]);

  grunt.registerTask("vendor", function () {
    var done = this.async();
    var shims = require("../shim.js"),
      sharedModules = Object.keys(shims);
    var packages = require("../package.json");
    var vendor = createBundle({
      debug: true,
      noParse: sharedModules
    }).transform(["browserify-shim"]);

    sharedModules.forEach(function (shareModule) {
      vendor.require(require.resolve("../" + packages.browser[shareModule]), {expose: shareModule});
    });
    bundle(vendor, grunt.template.process("<%= buildDir%>/js/vendor.js"), false, createCountingNotification(1, false, done));
  });

  grunt.registerTask("app", function () {
    var done = this.async();
    var shims = require(".././shim.js"),
      sharedModules = Object.keys(shims);

    var appMapping = grunt.file.expandMapping(["*.js", "!*_spec.js", "!vendor.js"], grunt.template.process("<%= buildDir %>/js"), {
      flatten: true,
      cwd: "./src/js"
    });
    var doneNotification = createCountingNotification(appMapping.length, grunt.option("watch"), done);

    appMapping.forEach(function (mapping, index) {
      var app = createBundle({}, grunt.option("watch"));
      app.external(sharedModules);
      app.transform("browserify-shim");
      app.transform("browserify-ngannotate");
      mapping.src.forEach(function (file) {
        grunt.log.writeln("Creating bundle for " + file);
        app.add("./" + file);
      });
      bundle(app, mapping.dest, grunt.option("watch"), doneNotification);
    });
  });

  function createBundle(options, watch) {
    options = _.extend(options || {}, {debug: !grunt.option("prod")});
    if (watch) {
      return browserify(_.extend(options, watchify.args));
    }
    return browserify(options);
  }

  function bundle(b, output, watch, notifyDone) {
    if (watch) {
      grunt.log.writeln("Watchify " + output);
      var w = watchify(b);
      w.on("update", function () {
        callBundle(w);
      });
      w.on("log", grunt.log.ok);
      callBundle(w);
    } else {
      callBundle(b);
    }

    function callBundle(wrapper) {
      wrapper.bundle(function (err, buff) {
        if (err) {
          grunt.log.error(err.toString());

        } else {
          grunt.file.write(output, buff);
          grunt.log.ok("Writing to " + output);
        }
        notifyDone(err);
      });
    }
  }


  function createCountingNotification(count, watch, done) {
    var currentCount = 0;
    return function (err) {
      currentCount++;
      if (currentCount === count && !watch) {
        notify(err, done);
      }
    };
  }

  function notify(err, done) {
    if (err) {
      done(false);
    } else {
      grunt.log.ok("Bundling done");
      done();
    }
  }
};

