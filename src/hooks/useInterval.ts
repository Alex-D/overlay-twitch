import {Inputs, useEffect} from 'preact/hooks'

export default function useInterval(callback: CallableFunction, delay: number, leading = false, inputs: Inputs = []) {
	useEffect(() => {
		if (leading) {
			callback()
		}

		const interval = setInterval(callback, delay)

		return () => {
			clearInterval(interval)
		}
	}, inputs)
}
