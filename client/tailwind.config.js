module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./formkit.config.{js,ts}",
  ],
  darkMode: "class",
  attributify: false,
  extract: {
    include: [
      "./components/**/*.{vue,js}",
      "./composables/**/*.{js,ts}",
      "./content/**/*.md",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./utils/**/*.{js,ts}",
      "./app.vue",
    ],
  },
  theme: {
    extend: {
      width: {
        sidebar: "232px",
      },
      padding: {
        sidebar: "232px",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  shortcuts: {
    "light-img": "block dark:hidden",
    "dark-img": "hidden dark:block",
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
