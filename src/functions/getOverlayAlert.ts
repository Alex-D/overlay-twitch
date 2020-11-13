import StreamLabsEvent from 'src/types/streamLabsEvent'

import AlertType from '~src/types/alertTypes'
import OverlayAlert from '~src/types/overlayAlert'

function getEventType(e: StreamLabsEvent): AlertType {
	const eventMessage = e.message[0]

	if (e.type === 'subscription' && typeof eventMessage.gifter_display_name !== 'undefined') {
		return 'gift_sub'
	}

	return e.type
}

export default function getOverlayAlert(e: StreamLabsEvent): OverlayAlert {
	const eventId = e.event_id.toString()
	const type = getEventType(e)
	const eventMessage = e.message[0]
	const name = (eventMessage.name || eventMessage.from_display_name) as string
	const message = eventMessage.message

	let title = type as string
	switch (type) {
		case 'bits':
			title = `${eventMessage.amount} bits`
			break
		case 'donation':
			title = `Donation — ${eventMessage.formatted_amount}`
			break
		case 'gift_sub':
			title = `Cadeau — ${eventMessage.gifter_display_name} offre un sub`
			break
		case 'cgift_sub':
			title = `Cadeaux — ${eventMessage.gifter_display_name} offre des subs`
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

	return {
		eventId,
		type,
		name,
		title,
		message,
	}
}
