import {h, VNode} from 'preact'

export default function AlertMessage(props: { message: string }): VNode | null {
	if (!props.message) {
		return null
	}

	return (
		<blockquote class="alert--message">
			{props.message}
		</blockquote>
	)
}
