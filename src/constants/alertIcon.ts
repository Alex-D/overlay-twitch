import AlertType from '@/src/types/alertTypes'
import IconId from '@/src/types/iconId'

const ALERT_ICONS: Record<AlertType, IconId> = {
	'bits': 'bits',
	'donation': 'euro',
	'follow': 'heart',
	'host': 'tv',
	'prime_sub_gift': 'star',
	'raid': 'parachute',
	'subscription': 'star',
}

export default ALERT_ICONS
