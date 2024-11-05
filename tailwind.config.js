/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/preline/preline.js'],

	theme: {
		extend: {
			fontWeight: {
				'custom-weight': 525
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateX(100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 100%, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateZ(0)'
					}
				},
				flipInY: {
					'0%': {
						transform: 'perspective(400px) rotateY(90deg)',
						animationTimingFunction: 'ease-in',
						opacity: '0'
					},
					'40%': {
						transform: 'perspective(400px) rotateY(-20deg)',
						animationTimingFunction: 'ease-in'
					},
					'60%': {
						transform: 'perspective(400px) rotateY(10deg)',
						opacity: '1'
					},
					'80%': {
						transform: 'perspective(400px) rotateY(-5deg)'
					},
					'100%': {
						transform: 'perspective(400px)'
					}
				},
				flipOutY: {
					'0%': {
						transform: 'perspective(400px)'
					},
					'30%': {
						transform: 'perspective(400px) rotateY(-15deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'perspective(400px) rotateY(90deg)',
						opacity: '0'
					}
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
				flipInY: 'flipInY 0.75s ease-in-out',
				flipOutY: 'flipOutY 0.75s ease-in-out',
				spin: 'spin 1.5s cubic-bezier(1, 0.1, 0.25, 1) infinite',
				fadeInUp: 'fadeInUp 0.5s ease-out',
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
				error: '#e74c3c'
			}
		},
		fontFamily: {
			poppins: ['"poppins"', 'sans-serif'],
			Just_sans: ['"Just Sans"', 'sans-serif'],
			Just_sans_medium: ['"Just Sans Medium"', 'sans-serif'],
			Orlean: ['"Orlean"', 'sans-serif']
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
