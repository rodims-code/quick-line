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

};

export default config;