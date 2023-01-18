/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                main_bg: "#08313E",
                main_white: "#d9d9d9",
                main_grey: "rgba(117, 117, 117, 0.5)",
                main_darkblue: "#041421",
                main_darkblueselect: "rgba(4, 20, 33, 0.5)",
                main_blackblue: "#010910",
                main_darktext: "#042630",
                main_lighttext: "#A5C4C5",
                main_green: "#50A45E",
                main_red: "#DB392F",
                main_cyan: "#0ED4FF",
                main_yellow: "#F3BB1C",
                main_weakcyan: "#76C9C9",
            },
            borderWidth: {
                1.5: "1.5px",
                2.5: "2.5px",
                3: "3px",
                3.5: "3.5px",
            },
            fontSize: {
                "2xs": "0.7rem",
                "3xs": "0.6rem",
                "4xs": "0.5rem",
                "5xs": "0.3rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
