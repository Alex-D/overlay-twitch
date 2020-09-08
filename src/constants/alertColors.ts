import AlertType from '@/src/types/alertTypes'

const ALERT_COLORS: Record<AlertType, string[]> = {
	'bits': ['#c766ff', '#640ce9', '#7a0ce9', '#980ce9'],
	'donation': ['#c766ff', '#640ce9', '#7a0ce9', '#980ce9'],
	'follow': ['#f2055c', '#f2055c', '#f2b705', '#f28705'],
	'gift_sub': ['#76BD61', '#48995B', '#A8D26D', '#A8D26D'],
	'cgift_sub': ['#76BD61', '#48995B', '#A8D26D', '#A8D26D'],
	'host': ['#00C9A7', '#008f79', '#0c6a5a', '#00C9A7'],
	'raid': ['#00C9A7', '#008f79', '#0c6a5a', '#00C9A7'],
	'resub': ['#76BD61', '#48995B', '#A8D26D', '#A8D26D'],
	'subscription': ['#76BD61', '#48995B', '#A8D26D', '#A8D26D'],
}

export default ALERT_COLORS
