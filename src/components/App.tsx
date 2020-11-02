import {h, VNode} from 'preact'

import Alerts from '~src/components/Alerts'
import Header from '~src/components/Header'

export default function App (): VNode {
	return (
		<div>
			<Header/>
			<Alerts/>
		</div>
	)
}
