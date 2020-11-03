import {useState} from 'preact/hooks'

import getFormattedDate from '~src/functions/getFormattedDate'
import useInterval from '~src/hooks/useInterval'

export function useDate() {
	const [date, setDate] = useState<string>('')

	useInterval(() => {
		setDate(getFormattedDate())
	}, 1000, true)

	return date
}
