const gulp=require('gulp');
const less=require('gulp-less');

gulp.task('less',function(){
	gulp.src('less/*.less')
  	.pipe(less())
  	.pipe(gulp.dest('css'))
});

gulp.task('watch', function(){
  gulp.watch('less/*.less', ['less']);
});

gulp.task('default', ['watch','less']);