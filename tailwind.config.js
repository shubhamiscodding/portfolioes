/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				// Semantic tokens used in index.css via CSS variables (@apply bg-background text-foreground)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				// Map all usages of white/black and any blue shade to requested HEX values
				white: '#C9C7BA',
				black: '#29292B',
				// Ensure dark sections using bg-gray-900 render as #030712
				gray: {
					900: '#030712',
				},
				blue: {
					50: '#29292B',
					100: '#29292B',
					200: '#29292B',
					300: '#29292B',
					400: '#29292B',
					500: '#29292B',
					600: '#29292B',
					700: '#29292B',
					800: '#29292B',
					900: '#29292B',
					950: '#29292B',
				},
			},
		},
	},
	plugins: [],
}

