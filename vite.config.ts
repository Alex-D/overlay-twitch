import preactRefresh from '@prefresh/vite'
import {UserConfig} from 'vite'
import tsResolver from 'vite-tsconfig-paths'

const config: UserConfig = {
	optimizeDeps: {
		include: [
			'date-fns/locale',
		],
	},
	base: './',
	assetsDir: '.',
	resolvers: [
		tsResolver,
	],
	jsx: {
		factory: 'h',
		fragment: 'Fragment',
	},
	plugins: [
		preactRefresh(),
	],
}

export default config
