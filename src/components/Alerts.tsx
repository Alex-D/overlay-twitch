import {h, VNode} from 'preact'
import {useStreamlabsAlerts} from 'src/hooks'

import Alert from '~src/components/Alert'

export default function Alerts(): VNode {
	const alerts = useStreamlabsAlerts()

	return (
		<div>
			<ul className="alerts">
				{
					alerts.map((alert) => {
						return (
							<Alert alert={alert}/>
						)
					})
				}
			</ul>
		</div>
	)
}
