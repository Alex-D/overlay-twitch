import {useState} from 'preact/hooks'

import getFormattedDate from '~src/functions/getFormattedDate'
import getFormattedHour from '~src/functions/getFormattedHour'
import useInterval from '~src/hooks/useInterval'

export function useDate() {
	const [date, setDate] = useState<string>('')
	const [hour, setHour] = useState<string>('')

	useInterval(() => {
		setDate(getFormattedDate())
		setHour(getFormattedHour())
	}, 1000, true, [])

	return {
		date,
		hour,
	}
}
