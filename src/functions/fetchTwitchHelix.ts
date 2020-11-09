const clientId = import.meta.env.VITE_TWITCH_CLIENT as string
const TWITCH_HELIX_API_BASE_URL = 'https://api.twitch.tv/helix'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function fetchTwitchHelix(url: string, token: string): Promise<any> {
	const headers = new Headers()
	headers.append('client-id', clientId)
	headers.append('Authorization', `Bearer ${token}`)

	return fetch(`${TWITCH_HELIX_API_BASE_URL}${url}`, {
		headers,
	}).then((response) => {
		return response.json()
	})
}
