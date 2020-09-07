import {init} from 'snabbdom/src/package/init'
import {attributesModule} from 'snabbdom/src/package/modules/attributes'
import {classModule} from 'snabbdom/src/package/modules/class'
import {VNode} from 'snabbdom/src/package/vnode'
import * as io from 'socket.io-client'

import ALERT_TYPES from '@/src/constants/alertTypes'
import KEEP_ALERTS from '@/src/constants/keepAlerts'
import addAlert from '@/src/functions/addAlert'
import showConfetti from '@/src/functions/showConfetti'
import view from '@/src/functions/view'
import State from '@/src/types/state'
import StreamLabsEvent from '@/src/types/streamLabsEvent'

const state: State = {
	alerts: [],
}

const app: HTMLElement = document.getElementById('app') as HTMLElement

const patch = init([
	attributesModule,
	classModule,
])

const streamlabs = io(`https://sockets.streamlabs.com?token=${STREAMLABS_SOCKET_API_TOKEN}`, {transports: ['websocket']})

streamlabs.on('event', (event: StreamLabsEvent) => {
	if (!ALERT_TYPES.includes(event.type)) {
		return
	}

	addAlert(state, event)
	render(state)
	showConfetti(event.type)
})

let oldVNode: VNode

function render(state: State): void {
	const newVNode = view(state)
	patch(oldVNode || app, newVNode)
	oldVNode = newVNode
}

render(state)

setInterval(() => {
	if (KEEP_ALERTS) {
		return
	}

	state.alerts = state.alerts.filter((event) => {
		return event.timeout > +new Date()
	})
	render(state)
}, 100)
