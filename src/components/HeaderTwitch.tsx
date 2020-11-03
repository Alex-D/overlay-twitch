import {h, VNode} from 'preact'
import {useEffect, useState} from 'preact/hooks'

import useInterval from '~src/hooks/useInterval'

const twitchClient = import.meta.env.VITE_TWITCH_CLIENT as string
const twitchSecret = import.meta.env.VITE_TWITCH_SECRET as string

export default function HeaderTwitch(): VNode {
	const [token, setToken] = useState<string | null>(null)
	const [viewers, setViewers] = useState(1)

	useEffect(() => {
		fetch(`https://id.twitch.tv/oauth2/token?client_id=${twitchClient}&client_secret=${twitchSecret}&grant_type=client_credentials&scope=channel:read:subscriptions`, {
			method: 'POST',
		}).then((response) => {
			response.json().then((body) => {
				setToken(body.access_token)
			})
		})
	}, [])

	useInterval(() => {
		if (token === null) {
			return false
		}

		const headers = new Headers()
		headers.append('client-id', twitchClient)
		headers.append('Authorization', `Bearer ${token}`)

		fetch('https://api.twitch.tv/helix/streams?user_login=alexandredemode', {
			headers,
		}).then((response) => {
			response.json().then((body) => {
				setViewers(body.data[0].viewer_count)
			})
		})
	}, 10000, true, [token])

	return (
		<div class="header--socials">
			<div class="header--socials-item">
				<div class="header--socials-name">Viewers</div>
				{viewers}
			</div>
		</div>
	)
}
