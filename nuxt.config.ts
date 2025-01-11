// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        "@nuxt/ui",
        "@nuxtjs/tailwindcss",
        "@sidebase/nuxt-auth",
        "@nuxtjs/google-fonts",
    ],

    router: {
        options: {
            scrollBehaviorType: "smooth",
        },
    },

    auth: {
        provider: {
            type: "authjs",
        },
        globalAppMiddleware: {
            isEnabled: true,
        },
        baseURL: `http://localhost:${process.env.PORT ?? 3000}`,
    },

    googleFonts: {
        families: {
            Inter: "100..900",
            "Libre+Caslon+Text": {
                wght: [400, 700],
            },
        },
        display: "swap",
    },

    compatibilityDate: "2024-12-11",
});
