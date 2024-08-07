import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { register } from "./serviceWorkerRegistration";

const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

// Register the service worker
register();
