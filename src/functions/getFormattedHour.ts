import {format} from 'date-fns'
import {fr} from 'date-fns/locale'

function getFormattedHour(): string {
	// https://date-fns.org/v2.16.1/docs/format
	return format(new Date(), 'HH:mm', {
		locale: fr,
	})
}

export default getFormattedHour
