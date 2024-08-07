module.exports = {
	globDirectory: "dist/",
	globPatterns: ["**/*.{html,js,css,png,svg,json}"],
	swDest: "dist/service-worker.js",
	ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
