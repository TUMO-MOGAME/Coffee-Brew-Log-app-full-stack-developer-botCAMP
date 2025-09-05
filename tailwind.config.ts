import type  { Config } from "tailwindcss";

const config = {
    darkMode: ["class", ".dark"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: "",
    theme:{
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            color:{
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            primary: {
                default: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                default: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            muted: {
                default: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
                default: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            card: {
                default: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },

        },
    },
    },
    plugins: [],
    }satisfies Config;

export default config;