import {h} from 'snabbdom/src/package/h'
import {VNode} from 'snabbdom/src/package/vnode'

import KEEP_ALERTS from '~src/constants/keepAlerts'
import State from '~src/types/state'

function view(state: State): VNode {
	return h(
		'ul.alerts',
		state.alerts.map((alert) => {
			return h('li', {
				class: {
					'slide-out': KEEP_ALERTS ? false : (alert.timeout - 500) < +new Date(),
				},
			}, alert.messageVNode)
		}),
	)
}

export default view
