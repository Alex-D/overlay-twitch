import {h} from 'snabbdom/src/package/h'
import {VNode} from 'snabbdom/src/package/vnode'

import IconId from '~src/types/iconId'

function icon(iconId: IconId): VNode {
	return h('svg.icon', [
		h('use', {
			attrs: {
				'xlink:href': `#icon-${iconId}`,
			},
		}),
	])
}

export default icon
