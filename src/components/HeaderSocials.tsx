import {h, VNode} from 'preact'

import Icon from '~src/components/Icon'

export default function HeaderSocials(): VNode {
	return (
		<div class="header--socials">
			<div class="header--socials-item">
				<div class="header--socials-icon">
					<Icon iconId="twitter"/>
				</div>
				<div class="header--socials-name">
					Twitter
				</div>
				@AlexandreDemode
			</div>
			<div class="header--socials-item">
				<div class="header--socials-icon">
					<Icon iconId="github"/>
				</div>
				<div class="header--socials-name">
					GitHub
				</div>
				@Alex-D
			</div>
			<div class="header--socials-item">
				<div class="header--socials-icon">
					<Icon iconId="soundcloud"/>
				</div>
				<div class="header--socials-name">
					SoundCloud
				</div>
				@AlexandreDemode
			</div>
		</div>
	)
}
