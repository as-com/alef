const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourceMaps = require("gulp-sourcemaps");
const del = require("del");

const tsProjectES = ts.createProject("tsconfig.json", {
	module: "es6"
});

gulp.task("default", ["es"]);

gulp.task("clean", function () {
	return del([
		"es/**/*"
	]);
});

gulp.task("es", ["clean"], function () {
	tsProjectES.src()
		.pipe(sourceMaps.init())
		.pipe(tsProjectES())
		.pipe(sourceMaps.write("."))
		.pipe(gulp.dest("es"));
});
