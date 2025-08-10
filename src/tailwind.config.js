/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan all your React component files
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff', // A nice, modern blue
          dark: '#0056b3',
        },
        secondary: {
          DEFAULT: '#1a202c', // A dark charcoal for text and backgrounds
          light: '#2d3748',
        },
        accent: {
          DEFAULT: '#28a745', // A vibrant green for success states
          dark: '#218838',
        },
        danger: {
          DEFAULT: '#e53e3e', // A modern red for errors and warnings
          light: '#fee2e2',
        }
      },
      fontFamily: {
        // You can add custom fonts here later if you wish
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}