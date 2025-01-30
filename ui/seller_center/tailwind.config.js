/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-voucher": "url('src/assets/images/VoucherBG.png')",
      },
    },
  },
  plugins: [],
};
