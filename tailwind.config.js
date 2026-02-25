/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                surface: 'var(--surface)',
                foreground: 'var(--foreground)',
                primary: 'var(--primary)',
                'primary-muted': 'var(--primary-muted)',
            },
            fontFamily: {
                serif: ['"Instrument Serif"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
