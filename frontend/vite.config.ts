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
			// workbox: {
			// 	globDirectory: "dist",
			// 	globPatterns: ["**/*.{html,js,css,png,svg,json}"],
			// 	swDest: "dist/service-worker.js",
			// 	runtimeCaching: [
			// 		{
			// 			urlPattern: ({ request }) => request.destination === "document",
			// 			handler: "NetworkFirst",
			// 			options: {
			// 				cacheName: "html-cache",
			// 			},
			// 		},
			// 		{
			// 			urlPattern: ({ request }) => request.destination === "script",
			// 			handler: "CacheFirst",
			// 			options: {
			// 				cacheName: "js-cache",
			// 			},
			// 		},
			// 		{
			// 			urlPattern: ({ request }) => request.destination === "style",
			// 			handler: "CacheFirst",
			// 			options: {
			// 				cacheName: "css-cache",
			// 			},
			// 		},
			// 		{
			// 			urlPattern: ({ request }) => request.destination === "image",
			// 			handler: "CacheFirst",
			// 			options: {
			// 				cacheName: "image-cache",
			// 			},
			// 		},
			// 	],
			// },
		}),
	],
	build: {
		outDir: "dist",
	},
});
