import {h, VNode} from 'preact'
import {useState} from 'preact/hooks'

import {TWITCH_CHANNEL_ID} from '~src/constants/overlayParameters'
import fetchTwitchHelix from '~src/functions/fetchTwitchHelix'
import fetchTwitchKraken from '~src/functions/fetchTwitchKraken'
import fetchTwitchToken from '~src/functions/fetchTwitchToken'
import useInterval from '~src/hooks/useInterval'

export default function HeaderTwitch(): VNode {
	const [viewers, setViewers] = useState(1)
	const [subs, setSubs] = useState(1)

	useInterval(async () => {
		const token = await fetchTwitchToken()

		fetchTwitchHelix('/streams?user_login=alexandredemode', token)
			.then((body) => {
				setViewers(body.data[0].viewer_count)
			})

		fetchTwitchKraken(`/channels/${TWITCH_CHANNEL_ID}/subscriptions`, token)
			.then((body) => {
				setSubs(body._total)
			})
	}, 10000, true, [])

	return (
		<div class="header--socials">
			<div class="header--socials-item">
				<div class="header--socials-name">Viewers</div>
				{viewers}
			</div>
			<div class="header--socials-item">
				<div class="header--socials-name">Subgoal : émotes</div>
				{subs}/15
			</div>
		</div>
	)
}
