/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    900: '#0f172a', // Deep slate blue/navy
                    800: '#1e293b', // Lighter slate for cards
                    700: '#334155', // Borders/Accents
                    gold: '#d4af37', // Classic Metallic Gold
                    'gold-light': '#f3e5ab', // Light Gold for clear text/bg
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
