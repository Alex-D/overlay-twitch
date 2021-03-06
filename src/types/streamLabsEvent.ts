import AlertType from '~src/types/alertTypes'

type StreamLabsEvent = {
	for?: 'twitch_account'
	event_id: number
	type: AlertType
	message: {
		message: string
		name?: string
		from_display_name?: string
		gifter_display_name?: string
		months?: number
		amount?: string
		formatted_amount?: string
		raiders?: string
		viewers?: string
	}[]
}

export default StreamLabsEvent
