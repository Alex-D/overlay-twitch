import StreamLabsEvent from 'src/types/streamLabsEvent'

import OverlayAlert from '~src/types/overlayAlert'

export default function getOverlayAlert(e: StreamLabsEvent): OverlayAlert {
	const eventId = e.event_id.toString()
	const type = e.type
	const eventMessage = e.message[0]
	const name = (eventMessage.name || eventMessage.to) as string
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

	return {
		eventId,
		type,
		name,
		title,
		message,
	}
}
