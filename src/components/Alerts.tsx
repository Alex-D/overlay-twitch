import {Fragment, h, VNode} from 'preact'

import Alert from '~src/components/Alert'
import {useAlerts} from '~src/hooks/useAlerts'

export default function Alerts(): VNode {
	const alerts = useAlerts()

	return (
		<div>
			<ul className="alerts">
				{
					alerts.map((alert) => {
						return (
							<Fragment>
								<Alert alert={alert}/>
							</Fragment>
						)
					})
				}
			</ul>
		</div>
	)
}
