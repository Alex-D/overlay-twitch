import AlertType from '~src/types/alertTypes'
import IconId from '~src/types/iconId'

const ALERT_ICONS: Record<AlertType, IconId> = {
	'bits': 'bits',
	'donation': 'euro',
	'follow': 'heart',
	'gift_sub': 'star',
	'cgift_sub': 'star',
	'host': 'tv',
	'raid': 'parachute',
	'resub': 'star',
	'subscription': 'star',
}

export default ALERT_ICONS
