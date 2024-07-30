export const handleError = (res: any, error: unknown) => {
	if (error instanceof Error) {
		res.status(400).json({ message: error.message });
	} else {
		res.status(400).json({ message: "Unknown error" });
	}
};
