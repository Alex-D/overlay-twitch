import {TWITCH_CLIENT, TWITCH_SECRET} from '~src/constants/overlayParameters'
import getUrlSearchParam from '~src/functions/getUrlSearchParam'

const TWITCH_ACCESS_TOKEN_STORAGE_KEY = 'twitch_access_token'
const TWITCH_REFRESH_TOKEN_STORAGE_KEY = 'twitch_refresh_token'
const TWITCH_ACCESS_TOKEN_EXPIRES_STORAGE_KEY = 'twitch_access_token_expires'

const redirectUri = window.location.origin

const handleAccessToken = (response: Response): Promise<string> => {
	return response.json().then((body) => {
		const now = new Date().getTime()
		const {
			access_token: accessToken,
			refresh_token: refreshToken,
			expires_in: accessTokenExpiresIn,
		} = body

		const accessTokenExpires = now + ((accessTokenExpiresIn - 10) * 1000)

		sessionStorage.setItem(TWITCH_ACCESS_TOKEN_STORAGE_KEY, accessToken)
		sessionStorage.setItem(TWITCH_ACCESS_TOKEN_EXPIRES_STORAGE_KEY, accessTokenExpires.toString())
		sessionStorage.setItem(TWITCH_REFRESH_TOKEN_STORAGE_KEY, refreshToken)

		return accessToken
	})
}

export default function fetchTwitchToken(): Promise<string> {
	const scopes = [
		'channel_subscriptions',
	].join('+')
	const now = new Date().getTime()

	// Check if access token is expired
	const sessionStorageTwitchAccessTokenExpires = sessionStorage.getItem(TWITCH_ACCESS_TOKEN_EXPIRES_STORAGE_KEY)
	const sessionStorageTwitchRefreshToken = sessionStorage.getItem(TWITCH_REFRESH_TOKEN_STORAGE_KEY)
	if (sessionStorageTwitchAccessTokenExpires !== null && sessionStorageTwitchRefreshToken !== null) {
		const isAccessTokenExpired = parseInt(sessionStorageTwitchAccessTokenExpires) < now

		if (isAccessTokenExpired) {
			return fetch(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT}&client_secret=${TWITCH_SECRET}&refresh_token=${sessionStorageTwitchRefreshToken}&grant_type=refresh_token`, {
				method: 'POST',
			}).then(handleAccessToken)
		}

		const sessionStorageTwitchAccessToken = sessionStorage.getItem(TWITCH_ACCESS_TOKEN_STORAGE_KEY)
		if (sessionStorageTwitchAccessToken !== null) {
			return Promise.resolve(sessionStorageTwitchAccessToken)
		}
	}

	const twitchCode = getUrlSearchParam('code')
	if (twitchCode === '') {
		window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT}&response_type=code&scope=${scopes}&redirect_uri=${redirectUri}`
		return Promise.reject()
	}

	return fetch(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT}&client_secret=${TWITCH_SECRET}&code=${twitchCode}&grant_type=authorization_code&scope=${scopes}&redirect_uri=${redirectUri}`, {
		method: 'POST',
	}).then(handleAccessToken)
}
