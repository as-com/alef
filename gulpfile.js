const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourceMaps = require("gulp-sourcemaps");

const tsProjectCJS = ts.createProject("tsconfig.json", {
	module: "commonjs"
});

const tsProjectES = ts.createProject("tsconfig.json", {
	module: "es6"
});

gulp.task("default", ["lib", "es"]);

gulp.task("lib", function() {
	tsProjectCJS.src()
		.pipe(sourceMaps.init())
		.pipe(tsProjectCJS())
		.pipe(sourceMaps.write("."))
		.pipe(gulp.dest("lib"));
});

gulp.task("es", function () {
	tsProjectES.src()
		.pipe(sourceMaps.init())
		.pipe(tsProjectES())
		.pipe(sourceMaps.write("."))
		.pipe(gulp.dest("es"));
});
