import preactRefresh from '@prefresh/vite'
import * as path from 'path'
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
	configureServer: ({root, app, watcher}) => {
		watcher.add(path.resolve(root, './public/**/*'))
		const publicPath = path.resolve(root, './public')
		watcher.on('change', function (path) {
			if (path.startsWith(publicPath)) {
				watcher.send({
					type: 'full-reload',
					path,
				})
			}
		})
	},
}

export default config
