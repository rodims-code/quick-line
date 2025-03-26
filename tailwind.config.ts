import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Inclut tous les fichiers dans le dossier app
    "./pages/**/*.{js,ts,jsx,tsx}", // Si vous avez un dossier pages
    "./components/**/*.{js,ts,jsx,tsx}", // Si vous avez un dossier components
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("daisyui"),
  ],
daisyui: {
  themes: [
    {
      mytheme: {
        primary: "#1d4ed8",
        secondary: "#9333ea",
        accent: "#14b8a6",
        neutral: "#64748b",
        "base-100": "#f3f4f6",
        info: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
    },
  ],
},
};

export default config;