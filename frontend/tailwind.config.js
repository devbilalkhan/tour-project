
module.exports = {
	purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				brandLight: "#404767",
				brandVia: "#282D44",
				brandDark: "#262A41",
				'blue-beaut': "#00adff",
				'blue-whale': "#151f38",
				"yellow-button": "#ffc200"
			},
			letterSpacing: {
				'ultra-wide': '.25em',
				'ultra-widest': '.35em'
			}
		},
	},
	variants: {
		extend: {
			backgroundColor: ["active"],
			transitionDuration: ['focus', 'focus']
		},
	},
	plugins: [],
}
