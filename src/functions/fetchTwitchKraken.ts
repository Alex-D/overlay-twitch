const clientId = import.meta.env.VITE_TWITCH_CLIENT as string
const TWITCH_KRAKEN_API_BASE_URL = 'https://api.twitch.tv/kraken'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function fetchTwitchHelix(url: string, token: string): Promise<any> {
	const headers = new Headers()
	headers.append('Client-ID', clientId)
	headers.append('Authorization', `OAuth ${token}`)
	headers.append('Accept', 'application/vnd.twitchtv.v5+json')

	return fetch(`${TWITCH_KRAKEN_API_BASE_URL}${url}`, {
		headers,
	}).then((response) => {
		return response.json()
	})
}
