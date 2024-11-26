  import { BG_IMG } from "./app/constants/tailwind/backGroundImages.constants";
  import { SCREENS } from "./app/constants/tailwind/screens.constants";
  import { FONT_SIZE } from "./app/constants/tailwind/fonts.constants";
  import { COLORS } from "./app/constants/tailwind/colors.constants";
  import { BOX_SHADOWS } from "./app/constants/tailwind/boxShadows.constants";
  import { DROP_SHADOWS } from "./app/constants/tailwind/dropShadows.constants";
  import { WIDTHS } from "./app/constants/tailwind/widths.constants";
  import type { Config } from "tailwindcss";

  export default {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          ...BG_IMG
        },
        screens: {
          ...SCREENS
        },
        fontSize: {
          ...FONT_SIZE
        },
        colors: {
          ...COLORS,
          primary: "#1E88E5", 
        },
        boxShadow: {
          ...BOX_SHADOWS
        },
        dropShadow: {
          ...DROP_SHADOWS
        },
        width: {
          ...WIDTHS
        },
        maxWidth: {
          ...WIDTHS
        }
      }
    },
    plugins: [],
  } satisfies Config;
