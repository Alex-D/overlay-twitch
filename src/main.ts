import './assets/styles/style.scss'

import {h, render} from 'preact'
import io from 'socket.io-client'

import App from '~src/components/App.tsx'
import ALERT_TYPES from '~src/constants/alertTypes'
import KEEP_ALERTS from '~src/constants/keepAlerts'
import addAlert from '~src/functions/addAlert'
import getFormattedDate from '~src/functions/getFormattedDate'
import showConfetti from '~src/functions/showConfetti'
import State from '~src/types/state'
import StreamLabsEvent from '~src/types/streamLabsEvent'

const state: State = {
	alerts: [],
	date: getFormattedDate(),
}

const app: HTMLElement = document.getElementById('app') as HTMLElement

render(h(App), app)



// function renderView(state: State): void {
// 	const newVNode = view(state)
// 	render(newVNode, app)
// }
//
// renderView(state)
//
// setInterval(() => {
// 	if (KEEP_ALERTS) {
// 		return
// 	}
//
// 	state.alerts = state.alerts.filter((event) => {
// 		return event.timeout > new Date().getTime()
// 	})
// 	renderView(state)
// }, 100)
//
// setInterval(() => {
// 	state.date = getFormattedDate()
// 	renderView(state)
// }, 1000)
