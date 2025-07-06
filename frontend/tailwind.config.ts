import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#670099",
        brandHover: "#8811c2",
        brandSecondary: "#370053",
        background: "#EFEFEF",
        backgroundSecondary: "#F1F2F1",
        backgroundTertiary: "#FFFFFF",
        text: "#413D3D",
        textPlaceholder: "#989898",
        border: "#C9D5E1",
        danger: "#C42F29",
        success: "#6FAF38",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
        light: "300",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
      },
      spacing: {
        0: "0px",
        1: "4px", // 0.25rem
        2: "8px", // 0.5rem
        3: "12px", // 0.75rem
        4: "16px", // 1rem
        5: "20px", // 1.25rem
        6: "24px", // 1.5rem
        8: "32px", // 2rem
        10: "40px", // 2.5rem
      },
    },
  },
  plugins: [],
};

export default config;
