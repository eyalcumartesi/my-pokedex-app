self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open("pokemon-cache").then((cache) => {
			return cache.addAll([
				"/",
				"/index.html",
				"/static/js/bundle.js",
				"/static/js/0.chunk.js",
				"/static/js/main.chunk.js",
				"/favicon.ico",
				"/manifest.json",
				"/logo192.png",
				"/logo512.png",
			]);
		})
	);
});

self.addEventListener("fetch", (event) => {
	if (event.request.url.includes("/api/")) {
		event.respondWith(
			caches.open("api-cache").then(async (cache) => {
				try {
					const response = await fetch(event.request);
					cache.put(event.request.url, response.clone());
					return response;
				} catch {
					return await cache.match(event.request);
				}
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request).then((response) => {
				return response || fetch(event.request);
			})
		);
	}
});
