import {UserConfig} from 'vite'
import tsResolver from 'vite-tsconfig-paths'

const config: UserConfig = {
	base: './',
	assetsDir: '.',
	resolvers: [
		tsResolver,
	],
}

export default config
