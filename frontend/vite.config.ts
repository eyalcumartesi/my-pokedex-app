import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			// registerType: "autoUpdate",
			injectRegister: "auto",
			manifest: {
				icons: [
					{
						src: "/icon.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},

			workbox: {
				globDirectory: "dist",
				globPatterns: ["**/*.{html,js,css,png,svg,json}"],
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === "document",
						handler: "NetworkFirst",
						options: {
							cacheName: "html-cache",
						},
					},
					{
						urlPattern: ({ request }) => request.destination === "script",
						handler: "CacheFirst",
						options: {
							cacheName: "js-cache",
						},
					},
					{
						urlPattern: ({ request }) => request.destination === "style",
						handler: "CacheFirst",
						options: {
							cacheName: "css-cache",
						},
					},
					{
						urlPattern: ({ request }) => request.destination === "image",
						handler: "CacheFirst",
						options: {
							cacheName: "image-cache",
						},
					},
					{
						urlPattern: ({ url }) => {
							return (
								url.pathname.includes("/pokemon/update") ||
								url.pathname.includes("/pokemon/delete")
							);
						},
						handler: "NetworkFirst" as const,
						options: {
							cacheName: "api-cache",
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
		}),
	],
	build: {
		outDir: "dist",
	},
});
