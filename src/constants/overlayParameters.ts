import getUrlSearchParam from 'src/functions/getUrlSearchParam'

export const STREAMLABS_SOCKET_API_TOKEN = import.meta.env.MODE === 'production' ? getUrlSearchParam('streamlabsToken') : import.meta.env.VITE_STREAMLABS_SOCKET_API_TOKEN
export const TWITCH_CLIENT = import.meta.env.MODE === 'production' ? getUrlSearchParam('twitchClient') : import.meta.env.VITE_TWITCH_CLIENT
export const TWITCH_SECRET = import.meta.env.MODE === 'production' ? getUrlSearchParam('twitchSecret') : import.meta.env.VITE_TWITCH_SECRET
export const TWITCH_CHANNEL_ID = import.meta.env.MODE === 'production' ? getUrlSearchParam('twitchChannelId') : import.meta.env.VITE_TWITCH_CHANNEL_ID
