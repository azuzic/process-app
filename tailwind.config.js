/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                main_bg: "#08313E",
                main_white: "rgb(217, 217, 217)",
                main_grey: "rgba(117, 117, 117, 0.5)",
                main_darkblue: "rgb(4, 20, 33)",
                main_blackblue: "#010910",
                main_darktext: "#042630",
                main_lighttext: "#A5C4C5",
                main_green: "#50A45E",
                main_red: "#DB392F",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
