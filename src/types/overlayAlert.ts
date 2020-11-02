import AlertType from '~src/types/alertTypes'

type OverlayAlert = {
	eventId: string
	type: AlertType
	name: string
	title: string
	message: string
}

export default OverlayAlert
