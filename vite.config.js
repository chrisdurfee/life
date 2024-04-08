import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [],
	base: '/life/',
	publicDir: 'static',
	server: {
		open: true
	}
});
