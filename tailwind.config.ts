
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#043638',
					foreground: '#ffffff',
					50: '#f0f9ff',
					100: '#e0f2fe',
					500: '#043638',
					600: '#0c343c',
					700: '#043638',
					800: '#043638',
					900: '#043638'
				},
				secondary: {
					DEFAULT: '#EFEFEF',
					foreground: '#043638'
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: '#EFEFEF',
					foreground: '#868789'
				},
				accent: {
					DEFAULT: '#EFEFEF',
					foreground: '#043638'
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#043638'
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#043638'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				rmh: {
					primary: '#043638',
					secondary: '#0c343c',
					accent: '#165A5D',
					light: '#EFEFEF',
					gray: '#868789',
					darkGray: '#8b848b',
					lightGray: '#9ca2a3',
					white: '#FFFFFF',
					black: '#000000'
				}
			},
			fontFamily: {
				sans: ['Raleway', 'system-ui', 'sans-serif'],
				heading: ['Ruda', 'system-ui', 'sans-serif'],
				body: ['Raleway', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
