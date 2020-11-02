import {format} from 'date-fns'
import {fr} from 'date-fns/locale'

function getFormattedDate(): string {
	// https://date-fns.org/v2.16.1/docs/format
	return format(new Date(), 'iiii d LLLL yyyy - HH:mm', {
		locale: fr,
	})
}

export default getFormattedDate
