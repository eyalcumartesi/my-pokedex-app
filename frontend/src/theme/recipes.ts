import { cva } from "../../styled-system/css";

export const button = cva({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "8px",
		fontWeight: "bold",
		textTransform: "uppercase",
		cursor: "pointer",
		transition: "all 0.3s ease",
	},
	variants: {
		visual: {
			solid: { bg: "yellow.300", color: "black", border: "2px solid black" },
			outline: { bg: "transparent", border: "2px solid black", color: "black" },
		},
		size: {
			sm: { padding: "8px 16px", fontSize: "12px" },
			md: { padding: "12px 24px", fontSize: "16px" },
			lg: { padding: "16px 32px", fontSize: "20px" },
		},
		state: {
			active: { transform: "scale(0.95)" },
			disabled: { opacity: 0.5, cursor: "not-allowed" },
		},
	},
	defaultVariants: {
		visual: "solid",
		size: "md",
	},
});

export const input = cva({
	base: {
		width: "100%",
		paddingStart: "20rem",
		borderRadius: "8px",
		border: "2px solid var(--ion-color-secondary)",
		fontSize: "16px",
		color: "black",
		transition: "all 0.3s ease",
	},
	variants: {
		size: {
			sm: { padding: "8px 12px", fontSize: "14px" },
			md: { padding: "12px 16px", fontSize: "16px" },
			lg: { padding: "16px 20px", fontSize: "18px" },
		},
		state: {
			focus: {
				boxShadow: "0 0 0 3px rgba(255, 223, 0, 0.5)",
			},
			disabled: { cursor: "not-allowed" },
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const select = cva({
	base: {
		padding: "12px 16px",
		borderRadius: "8px",
		border: "2px solid var(--ion-color-secondary)",
		fontSize: "16px",

		transition: "all 0.3s ease",

		appearance: "none",
	},
	variants: {
		size: {
			sm: { padding: "8px 12px", fontSize: "14px" },
			md: { padding: "12px 16px", fontSize: "16px" },
			lg: { padding: "16px 20px", fontSize: "18px" },
		},
		state: {
			focus: {
				boxShadow: "0 0 0 3px rgba(255, 223, 0, 0.5)",
			},
			disabled: { cursor: "not-allowed", background: "#f0f0f0" },
		},
	},
	defaultVariants: {
		size: "md",
	},
});
