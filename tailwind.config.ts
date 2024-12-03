import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                pampas: {
                    50: "#f4f2ee",
                    100: "#efece6",
                    200: "#ddd7cb",
                    300: "#c7bcaa",
                    400: "#b09e87",
                    500: "#a0886f",
                    600: "#937863",
                    700: "#7b6353",
                    800: "#655247",
                    900: "#52433c",
                    950: "#2b221f",
                },
            },
        },
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },
    },
};
