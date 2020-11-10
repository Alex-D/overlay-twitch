import getUrlSearchParam from 'src/functions/getUrlSearchParam'

const getParameter = (key: string) => {
	const sessionStorageValue = sessionStorage.getItem(key)
	if (sessionStorageValue !== null) {
		return sessionStorageValue
	}

	const value = getUrlSearchParam(key)
	sessionStorage.setItem(key, value)

	return value
}

export const STREAMLABS_SOCKET_API_TOKEN = import.meta.env.MODE === 'production' ? getParameter('streamlabsToken') : import.meta.env.VITE_STREAMLABS_SOCKET_API_TOKEN
export const TWITCH_CLIENT = import.meta.env.MODE === 'production' ? getParameter('twitchClient') : import.meta.env.VITE_TWITCH_CLIENT
export const TWITCH_SECRET = import.meta.env.MODE === 'production' ? getParameter('twitchSecret') : import.meta.env.VITE_TWITCH_SECRET
export const TWITCH_CHANNEL_ID = import.meta.env.MODE === 'production' ? getParameter('twitchChannelId') : import.meta.env.VITE_TWITCH_CHANNEL_ID
