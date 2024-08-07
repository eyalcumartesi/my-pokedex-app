self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open("pokemon-cache").then((cache) => {
			return cache
				.addAll([
					"/",
					"/index.html",
					"/src/main.tsx",
					// Add other files to cache here
					"/favicon.ico",
					"/manifest.json",
					"/logo192.png",
					"/logo512.png",
				])
				.catch((error) => {
					console.error("Failed to cache during install: ", error);
				});
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
				} catch (error) {
					console.error(
						"Failed to fetch from network, attempting cache: ",
						error
					);
					return await cache.match(event.request);
				}
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request).then((response) => {
				return (
					response ||
					fetch(event.request).catch((error) => {
						console.error("Fetch failed: ", error);
					})
				);
			})
		);
	}
});
