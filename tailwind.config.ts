import type { Config } from "tailwindcss";

/**
 * "Almanac" identity — a warm statistical data-plate.
 * Data colors (brand/teal, rust, gold) are validated for colorblind separation
 * and contrast on the paper surface (see the dataviz palette validator).
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#F2ECDE", 2: "#E9DEC8", 3: "#E1D5BC" },
        ink: {
          DEFAULT: "#221D15",
          soft: "#6B6154",
          mute: "#8A7E6A",
          card: "#201B14",
        },
        rule: "#D6C9AE",
        brand: { DEFAULT: "#0E8C7A", ink: "#0A6B5D" }, // teal — brand + group A
        rust: { DEFAULT: "#BE4A2F", ink: "#A83A28" }, // group B / warmth
        gold: { DEFAULT: "#9A6B12", ink: "#8A5A0E" }, // the lurking variable
      },
      fontFamily: {
        display: [
          '"Fraunces Variable"',
          "Fraunces",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          '"Space Grotesk Variable"',
          '"Space Grotesk"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
    },
  },
  plugins: [],
} satisfies Config;
