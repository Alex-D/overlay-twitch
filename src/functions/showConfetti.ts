import confetti from 'canvas-confetti'

import ALERT_COLORS from '@/src/constants/alertColors'
import AlertType from '@/src/types/alertTypes'

function showConfetti(type: AlertType): void {
	confetti({
		particleCount: 200,
		angle: 140,
		spread: 150,
		origin: { x: 1.07 },
		colors: ALERT_COLORS[type],
		zIndex: -1,
		ticks: 100,
	})
}

export default showConfetti
