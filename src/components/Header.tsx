import {h, VNode} from 'preact'
import getFormattedDate from 'src/functions/getFormattedDate'

export default function Header(): VNode {
	return (
		<header class="header">
			<div class="header--socials">
				Twitter @AlexandreDemode - GitHub @Alex-D - SoundCloud @AlexandreDemode
			</div>
			<div class="header--date">
				{getFormattedDate()}
			</div>
		</header>
	)
}
