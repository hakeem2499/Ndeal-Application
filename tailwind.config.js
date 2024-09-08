/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/preline/preline.js'],

	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateX(100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				fadeHero: {
					'0%': { opacity: '0', transform: 'translateY(75%)' },
					'50%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(-100%)' }
				}
			},
			animation: {
				fadeIn: 'fadeIn 0.5s ease-in-out',
				spin: 'spin 1.5s cubic-bezier(1, 0.1, 0.25, 1) infinite',
				fadeHero: 'fadeHero 3s cubic-bezier(0.42, 0, 0.58, -0.5) forwards'
			},
			colors: {
				primary: '#171717;',
				secondary: '#d1cdc2',
				accent: '#ffe5b4',
				background: '#f4f4f4',
				text: '#333',
				'text-light': '#777',
				border: '#ddd',
				success: '#2ecc71',
				warning: '#f39c12',
				error: '#e74c3c',
			  },
		},
		fontFamily: {
			poppins: ['"poppins"', 'sans-serif'],
			Modern: ['"Modern Futuristic"', 'sans-serif']
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'),]
};

