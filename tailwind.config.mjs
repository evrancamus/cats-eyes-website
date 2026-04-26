/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'cat-yellow': '#F4B828', // Jaune enseigne
				'cat-teal': '#006366',   // Vert logo
				'cat-pine': '#0B352E',   // Vert mur foncé
				'cat-wood': '#E8D5B5',   // Étagères bois
				'cat-pink': '#D842A1',   // LED Rose/Magenta
			},
		},
	},
	plugins: [],
}