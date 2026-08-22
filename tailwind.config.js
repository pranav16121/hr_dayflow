/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fafafa",
        surface: "#ffffff",
        border: "rgba(228, 228, 231, 0.8)",
        text: {
          primary: "#18181b",
          secondary: "#52525b",
          muted: "#a1a1aa",
        },
        primary: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          active: "#3730a3",
          light: "#f5f3ff",
          outline: "rgba(79, 70, 229, 0.1)",
        },
        success: {
          50: "#f0fdf4",
          700: "#047857",
        },
        warning: {
          50: "#fffbeb",
          700: "#b45309",
        },
        danger: {
          50: "#fef2f2",
          700: "#b91c1c",
        },
        info: {
          50: "#f0f9ff",
          700: "#0369a1",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        button: "0.5rem",
        card: "0.75rem",
        modal: "1rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.02)",
        modal: "0 25px 50px -12px rgba(0,0,0,0.07)",
        outline: "0 1px 2px rgba(0,0,0,0.02)",
      },
      spacing: {
        sidebar: "16rem",
        navbar: "4rem",
      },
    },
  },
  plugins: [],
};
