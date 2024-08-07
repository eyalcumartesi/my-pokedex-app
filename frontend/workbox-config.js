module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{ts,tsx,css}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};