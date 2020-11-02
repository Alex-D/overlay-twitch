import clsx from 'clsx'
import {h, VNode} from 'preact'
import {useEffect, useState} from 'preact/hooks'

import AlertMessage from '~src/components/AlertMessage'
import AlertSentence from '~src/components/AlertSentence'
import Icon from '~src/components/Icon'
import ALERT_COLORS from '~src/constants/alertColors'
import ALERT_ICONS from '~src/constants/alertIcon'
import ALERT_SOUNDS from '~src/constants/alertSound'
import EVENT_SHOW_DELAY from '~src/constants/eventShowDelay'
import KEEP_ALERTS from '~src/constants/keepAlerts'
import OverlayAlert from '~src/types/overlayAlert'

export default function Alert(props: {alert: OverlayAlert}): VNode {
	const [isSlidingOut, setIsSlidingOut] = useState<boolean>(false)
	useEffect(() => {
		if (KEEP_ALERTS) {
			return
		}

		setTimeout(() => {
			setIsSlidingOut(true)
		}, EVENT_SHOW_DELAY - 500)
	})

	const style = {
		'--alert-text-color': ALERT_COLORS[props.alert.type][0],
		'--alert-background-start': ALERT_COLORS[props.alert.type][1],
		'--alert-background-end': ALERT_COLORS[props.alert.type][3],
	}
	return (
		<li class={clsx({'slide-out': isSlidingOut})}>
			<div class="alert" style={style}>
				<Icon iconId={ALERT_ICONS[props.alert.type]} />
				<span class="alert--title">{props.alert.title}</span>
				<div class="alert--body">
					<AlertSentence type={props.alert.type} name={props.alert.name}/>
					<AlertMessage message={props.alert.message}/>
				</div>
				<audio src={`${import.meta.env.BASE_URL}sounds/${ALERT_SOUNDS[props.alert.type]}.mp3`} autoPlay/>
			</div>
		</li>
	)
}
