/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#004CFF",
                secondary: "#EC4E4E",
                muded: "#94a3b8",
                destructive: "#e11d48",
                ["slate-message"]: "#E5EBFC",
            },
        },
    },
    plugins: [],
};
