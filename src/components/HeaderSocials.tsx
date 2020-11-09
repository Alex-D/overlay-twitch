import {h, VNode} from 'preact'
import {useRef, useState} from 'preact/hooks'

import Icon from '~src/components/Icon'
import useInterval from '~src/hooks/useInterval'

export default function HeaderSocials(): VNode {
	const [currentItemIndex, setCurrentItemIndex] = useState(0)
	const [itemCount, setItemCount] = useState(1)
	const socialsItemsDomElement = useRef<HTMLDivElement>(null)

	useInterval(() => {
		setItemCount(socialsItemsDomElement.current.childNodes.length)
		setCurrentItemIndex((currentItemIndex < itemCount - 1) ? currentItemIndex + 1 : 0)
	}, 10000, false, [currentItemIndex, itemCount, socialsItemsDomElement])

	const styles = {
		'--header-socials-item-count': itemCount,
		'--header-socials-current-item-index': currentItemIndex,
	}

	return (
		<div class="header--socials">
			<div class="header--socials-items" style={styles} ref={socialsItemsDomElement}>
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
		</div>
	)
}
