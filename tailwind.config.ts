import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                "navy-blue": {
                    "50": "#f1f3ff",
                    "100": "#e5e8ff",
                    "200": "#cfd7ff",
                    "300": "#a8b2ff",
                    "400": "#7781ff",
                    "500": "#4145ff",
                    "600": "#231aff",
                    "700": "#1209f8",
                    "800": "#0e07d0",
                    "900": "#0e08aa",
                    "950": "#010176",
                },
            },
        },
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            serif: ["Libre Caslon Text", "serif"],
        },
    },
};
