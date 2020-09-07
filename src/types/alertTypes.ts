import ALERT_TYPES from '@/src/constants/alertTypes'

type AlertTypeTuple = typeof ALERT_TYPES
type AlertType = AlertTypeTuple[number]

export default AlertType
