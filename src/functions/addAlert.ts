import {h} from 'snabbdom/src/package/h'

import ALERT_COLORS from '@/src/constants/alertColors'
import ALERT_ICONS from '@/src/constants/alertIcon'
import ALERT_SOUNDS from '@/src/constants/alertSound'
import EVENT_SHOW_DELAY from '@/src/constants/eventShowDelay'
import getSentence from '@/src/functions/getSentence'
import icon from '@/src/functions/icon'
import OverlayAlert from '@/src/types/overlayAlert'
import State from '@/src/types/state'
import StreamLabsEvent from '@/src/types/streamLabsEvent'

function addAlert(state: State, e: StreamLabsEvent): void {
	const eventId = e.event_id
	const type = e.type
	const eventMessage = e.message[0]
	const name = (eventMessage.name || eventMessage.to) as string

	let title = type as string
	switch (type) {
		case 'bits':
			title = `${eventMessage.amount} bits`
			break
		case 'donation':
			title = `Donation — ${eventMessage.formatted_amount}`
			break
		case 'gift_sub':
			title = `Cadeau — ${eventMessage.from} offre un sub`
			break
		case 'cgift_sub':
			title = `Cadeaux — ${eventMessage.from} offre des subs`
			break
		case 'host':
			title = `Host — ${eventMessage.viewers} viewers`
			break
		case 'raid':
			title = `Raid — ${eventMessage.raiders} raiders`
			break
		case 'resub':
			title = `Resub — ${eventMessage.months as number} mois`
			break
	}

	const messageVNode = h('div.alert', {
		key: eventId,
		attrs: {
			style: [
				`--alert-text-color: ${ALERT_COLORS[type][0]}`,
				`--alert-background-start: ${ALERT_COLORS[type][1]}`,
				`--alert-background-end: ${ALERT_COLORS[type][3]}`,
			].join(';'),
		},
	}, [
		icon(ALERT_ICONS[type]),
		h('span.alert--title', title),
		h('div.alert--body', [
			getSentence(type, name, eventMessage.message),
		]),
		h('audio.alert--sound', {
			attrs: {
				autoplay: true,
				src: `./sounds/${ALERT_SOUNDS[type]}.mp3`,
			},
		}),
	])

	const alert: OverlayAlert = {
		type,
		timeout: +new Date() + EVENT_SHOW_DELAY,
		messageVNode,
	}

	state.alerts.push(alert)
}

export default addAlert
