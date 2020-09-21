import AlertType from '@/src/types/alertTypes'
import SoundId from '@/src/types/soundId'

const ALERT_SOUNDS: Record<AlertType, SoundId> = {
	'bits': 'sub',
	'donation': 'sub',
	'follow': 'follow',
	'gift_sub': 'sub',
	'cgift_sub': 'sub',
	'host': 'raid',
	'raid': 'raid',
	'resub': 'sub',
	'subscription': 'sub',
}

export default ALERT_SOUNDS
