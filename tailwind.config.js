/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        theme: {
          primary: "var(--color-text-base)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          btnColor: "var(--color-btn-text)",
          btnBgText: "var(--color-btn-color)",
        },
      },
      backgroundColor: {
        theme: {
          primaryBg: "var(--color-bg-primary)",
          secondaryBg: "var(--color-bg-secondary)",
          btnBg: "var(--color-btn-background)",
          btnColorHover: "var(--color-btn-hover)",
        },
      },
      borderColor: {
        theme: {
          primaryBorder: "var(--color-border-accent)",
        },
      },
    },
  },
  plugins: [],
};
