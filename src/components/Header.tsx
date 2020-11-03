import {h, VNode} from 'preact'

import HeaderSocials from '~src/components/HeaderSocials'
import HeaderStars from '~src/components/HeaderStars'
import HeaderTwitch from '~src/components/HeaderTwitch'
import {useDate} from '~src/hooks/useDate'

export default function Header(): VNode {
	const date = useDate()

	return (
		<header class="header">
			<HeaderSocials/>
			<HeaderStars/>
			<HeaderTwitch/>
			<div class="header--date">
				{date}
			</div>
		</header>
	)
}
