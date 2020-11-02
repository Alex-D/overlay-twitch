import {useEffect, useState} from 'preact/hooks'
import io from 'socket.io-client'

import ALERT_TYPES from '~src/constants/alertTypes'
import EVENT_SHOW_DELAY from '~src/constants/eventShowDelay'
import getOverlayAlert from '~src/functions/getOverlayAlert'
import showConfetti from '~src/functions/showConfetti'
import OverlayAlert from '~src/types/overlayAlert'
import StreamLabsEvent from '~src/types/streamLabsEvent'

const urlSearchParams = new URLSearchParams(window.location.search)
const getUrlSearchParam = (key: string): string => {
	return urlSearchParams.get(key) || ''
}

const streamlabsSocketApiToken = import.meta.env.MODE === 'production' ? getUrlSearchParam('streamlabsToken') : import.meta.env.VITE_STREAMLABS_SOCKET_API_TOKEN
const streamlabs = io(`https://sockets.streamlabs.com?token=${streamlabsSocketApiToken}`, {transports: ['websocket']})

streamlabs.on('connect_error', () => {
	document.body.classList.add('socket-error')
})

export function useStreamlabsAlerts(): OverlayAlert[] {
	const [alerts, setAlerts] = useState<OverlayAlert[]>([])

	useEffect(() => {
		const onStreamlabsEvent = (event: StreamLabsEvent) => {
			if (!ALERT_TYPES.includes(event.type)) {
				return
			}

			const alert: OverlayAlert = getOverlayAlert(event)
			setAlerts((alerts) => [...alerts, alert])

			setTimeout(() => {
				setAlerts((alerts) => alerts.filter((a) => a !== alert))
			}, EVENT_SHOW_DELAY)

			showConfetti(event.type)
		}
		streamlabs.on('event', onStreamlabsEvent)

		return () => {
			streamlabs.off('event', onStreamlabsEvent)
		}
	}, [])

	return alerts
}
