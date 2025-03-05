import {defineConfig, loadEnv} from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
	plugins: [
		basicSsl({name: 'test', certDir: loadEnv('development', process.cwd(), '').VITE_CERT_PATH}),
		solidPlugin(),
	],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
})
