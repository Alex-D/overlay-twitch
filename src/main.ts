import * as io from 'socket.io-client'
import confetti from 'canvas-confetti'
import {init} from 'snabbdom/src/package/init'
import {h} from 'snabbdom/src/package/h'
import {attributesModule} from 'snabbdom/src/package/modules/attributes'
import {classModule} from 'snabbdom/src/package/modules/class'
import {VNode} from 'snabbdom/src/package/vnode'

const KEEP_ALERTS = false

type IconId = 'bits' | 'star' | 'heart' | 'euro' | 'parachute' | 'tv'

const ALERT_TYPES = [
	'bits',
	'donation',
	'follow',
	'host',
	'prime_sub_gift',
	'raid',
	'subscription',
] as const
type AlertTypeTuple = typeof ALERT_TYPES
type AlertType = AlertTypeTuple[number]

type StreamLabsEvent = {
	for?: 'twitch_account'
	event_id: number
	type: AlertType
	message: {
		message: string
		name?: string
		from?: string
		to?: string
		amount?: string
		formatted_amount?: string
		raiders?: string
		viewers?: string
	}[]
}

type OverlayAlert = {
	type: AlertType
	timeout: number
	messageVNode: VNode
}

type State = {
	alerts: OverlayAlert[]
}

const EVENT_SHOW_DELAY = 5000

const ALERT_ICONS: Record<AlertType, IconId> = {
	'bits': 'bits',
	'donation': 'euro',
	'follow': 'heart',
	'host': 'tv',
	'prime_sub_gift': 'star',
	'raid': 'parachute',
	'subscription': 'star',
}

const ALERT_COLORS: Record<AlertType, string[]> = {
	'bits': ['#c766ff', '#640ce9', '#7a0ce9', '#980ce9'],
	'donation': ['#c766ff', '#640ce9', '#7a0ce9', '#980ce9'],
	'follow': ['#f2055c', '#f2055c', '#f2b705', '#f28705'],
	'host': ['#00C9A7', '#008f79', '#0c6a5a', '#00C9A7'],
	'raid': ['#00C9A7', '#008f79', '#0c6a5a', '#00C9A7'],
	'subscription': ['#76BD61', '#48995B', '#A8D26D', '#A8D26D'],
	'prime_sub_gift': ['#76BD61', '#48995B', '#A8D26D', '#A8D26D'],
}

const ALERT_SENTENCES: Record<AlertType, Array<(name: string, message: string) => VNode>> = {
	'bits': [
		(name, message) => h('span', [
			h('strong.alert--name', name),
			` a offert un bout de sa paye !`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			`, tu es désormais bien plus beau.`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour ta contribution à mes prochains VSTs :)`,
			formatMessage(message),
		]),
	],
	'donation': [
		(name, message) => h('span', [
			h('strong.alert--name', name),
			` a offert un bout de sa paye !`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			`, tu es désormais bien plus beau.`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour ta contribution à mes prochains VSTs :)`,
			formatMessage(message),
		]),
	],
	'follow': [
		(name, message) => h('span', [
			h('strong.alert--name', name),
			` suit désormais cette chaîne !`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Bonsoir à `,
			h('strong.alert--name', name),
			` qui nous a rejoint !`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Serait-ce là `,
			h('strong.alert--name', name),
			` qui souscrit l'abonnement ?`,
			formatMessage(message),
		]),
	],
	'host': [
		(name, message) => h('span', [
			h('strong.alert--name', name),
			` host désormais ce live !`,
			formatMessage(message),
		]),
	],
	'prime_sub_gift': [
		(name, message) => h('span', [
			`Un sub a été offer à `,
			h('strong.alert--name', name),
			formatMessage(message),
		]),
	],
	'raid': [
		(name, message) => h('span', [
			h('strong.alert--name', name),
			` a lancé un raid !`,
			formatMessage(message),
		]),
	],
	'subscription': [
		(name, message) => h('span', [
			h('strong.alert--name', name),
			` est généreux et se paye un sub !`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour le sub, tu sens désormais bien meilleur.`,
			formatMessage(message),
		]),
		(name, message) => h('span', [
			`Et c'est `,
			h('strong.alert--name', name),
			` qui lâche un sub. Tu es moins riche, mais moi plus ! Merci :)`,
			formatMessage(message),
		]),
	],
}

const state: State = {
	alerts: [],
}

const app: HTMLElement = document.getElementById('app') as HTMLElement

const patch = init([
	attributesModule,
	classModule,
])

const streamlabs = io(`https://sockets.streamlabs.com?token=${STREAMLABS_SOCKET_API_TOKEN}`, {transports: ['websocket']})

function icon(iconId: IconId): VNode {
	return h('svg.icon', [
		h('use', {
			attrs: {
				'xlink:href': `#icon-${iconId}`,
			},
		}),
	])
}

function getSentence(type: AlertType, name: string, message: string): VNode {
	const sentencesForType = ALERT_SENTENCES[type]

	const sentence = sentencesForType[Math.floor(Math.random() * sentencesForType.length)]

	return sentence(name, message)
}

function formatMessage(message: string): VNode | undefined {
	if (!message) {
		return
	}

	const formattedMessage = h('blockquote.alert--message', [
		message,
	])

	return formattedMessage
}

function showConfetti(type: AlertType): void {
	confetti({
		particleCount: 200,
		angle: 140,
		spread: 150,
		origin: { x: 1.07 },
		colors: ALERT_COLORS[type],
		zIndex: -1,
		ticks: 100,
	});
}

function addAlert(e: StreamLabsEvent): void {
	const eventId = e.event_id
	const type = e.type
	const eventMessage = e.message[0]
	const name = (eventMessage.name || eventMessage.to) as string

	let title = type as string
	switch (type) {
		case 'bits':
			title = `${eventMessage.amount} bits`
			break;
		case 'donation':
			title = `Donation — ${eventMessage.formatted_amount}`
			break;
		case 'host':
			title = `Host — ${eventMessage.viewers} viewers`
			break;
		case 'prime_sub_gift':
			`Cadeau de la part de ${eventMessage.from}`
			break;
		case 'raid':
			title = `Raid — ${eventMessage.raiders} raiders`
			break;
	}

	const messageVNode = h(`div.alert`, {
		key: eventId,
		attrs: {
			style: [
				`--alert-text-color: ${ALERT_COLORS[type][0]}`,
				`--alert-background-start: ${ALERT_COLORS[type][1]}`,
				`--alert-background-end: ${ALERT_COLORS[type][3]}`,
			].join(';'),
		},
	}, [
		icon(ALERT_ICONS[type]),
		h('span.alert--title', title),
		h('div.alert--body', [
			getSentence(type, name, eventMessage.message),
		]),
	])

	const alert: OverlayAlert = {
		type,
		timeout: +new Date() + EVENT_SHOW_DELAY,
		messageVNode,
	}

	state.alerts.push(alert)
	render(state)

	showConfetti(type)
}

streamlabs.on('event', (event: StreamLabsEvent) => {
	if (!ALERT_TYPES.includes(event.type)) {
		return
	}

	addAlert(event)
})

function view(state: State): VNode {
	return h(
		'ul.alerts',
		state.alerts.map((alert) => {
			return h('li', {
				class: {
					'slide-out': KEEP_ALERTS ? false : (alert.timeout - 500) < +new Date(),
				},
			}, alert.messageVNode)
		}),
	)
}

let oldVNode: VNode

function render(state: State): void {
	const newVNode = view(state)
	patch(oldVNode || app, newVNode)
	oldVNode = newVNode
}

render(state)

setInterval(() => {
	if (KEEP_ALERTS) {
		return
	}

	state.alerts = state.alerts.filter((event) => {
		return event.timeout > +new Date()
	})
	render(state)
}, 100)
