/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                avenir: ['Avenir', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            fontWeight: {
                book: '400',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
}
