import {h, VNode} from 'preact'

import IconId from '~src/types/iconId'

export default function Icon(props: {iconId: IconId}): VNode {
	return (
		<svg class="icon">
			<use xlinkHref={`#icon-${props.iconId}`}/>
		</svg>
	)
}
