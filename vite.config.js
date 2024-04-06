import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [],
	base: '/life/',
	server: {
		open: true
	},
	resolve: {
		alias: {
			'@': '/src', // Shortcut to access the src directory
		}
	}
});
