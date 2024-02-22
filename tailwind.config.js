import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'login': "url('/img/hero.jpg')",
                'login-logo': "url('/img/logo.png')",
            },
            colors: {
                'primary': '#E4002B',
                'secondary': '#D4002B',
                'fondo-primary': '#F5ECEB',
                'pantone': '#e4002b',
            },
        },
    },

    plugins: [],
};
