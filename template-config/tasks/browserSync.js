'use strict';

const browserSync = require('browser-sync').create();

module.exports = function(options) {

	return function() {
		browserSync.init({
			server: {
				baseDir: options.baseFolder
			},
			files: options.src
		})
	};

	// return function() {
	// 	browserSync.init({
	// 		proxy: options.proxyDir,
	// 		files: options.src,
	// 		port: 80,
	// 	})
	// };
	
};

