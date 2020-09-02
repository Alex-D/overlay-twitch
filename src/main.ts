import * as io from 'socket.io-client'
import confetti from 'canvas-confetti'
import {init} from 'snabbdom/src/package/init'
import {h} from 'snabbdom/src/package/h'
import {attributesModule} from 'snabbdom/src/package/modules/attributes'
import {classModule} from 'snabbdom/src/package/modules/class'
import {VNode} from 'snabbdom/src/package/vnode'

const KEEP_ALERTS = true

type IconId = 'bits' | 'star' | 'heart' | 'euro' | 'parachute' | 'tv'

const ALERT_TYPES = [
	'bits',
	'donation',
	'follow',
	'host',
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
		name: string
		amount?: string
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

const CONFETTI_COLORS = ['#f2055c', '#f2e205', '#f2b705', '#f28705']
const EVENT_SHOW_DELAY = 5000

const ALERT_ICONS: {[key in AlertType]: IconId} = {
	'bits': 'bits',
	'donation': 'euro',
	'follow': 'heart',
	'host': 'tv',
	'raid': 'parachute',
	'subscription': 'star',
}

const ALERT_SENTENCES = {
	['bits' as AlertType]: [
		(name: string) => h('span', [
			h('strong.alert--name', name),
			` a offert un bout de sa paye !`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			`, tu es désormais bien plus beau.`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour ta contribution à mes prochains VSTs :)`,
		]),
	],
	['donation' as AlertType]: [
		(name: string) => h('span', [
			h('strong.alert--name', name),
			` a offert un bout de sa paye !`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			`, tu es désormais bien plus beau.`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour ta contribution à mes prochains VSTs :)`,
		]),
	],
	['follow' as AlertType]: [
		(name: string) => h('span', [
			h('strong.alert--name', name),
			` suit désormais cette chaîne !`,
		]),
		(name: string) => h('span', [
			`Bonsoir à `,
			h('strong.alert--name', name),
			` qui nous a rejoint !`,
		]),
		(name: string) => h('span', [
			`Serait-ce là `,
			h('strong.alert--name', name),
			` qui souscrit l'abonnement ?`,
		]),
	],
	['host' as AlertType]: [
		(name: string) => h('span', [
			h('strong.alert--name', name),
			` host désormais ce live !`,
		]),
	],
	['raid' as AlertType]: [
		(name: string) => h('span', [
			h('strong.alert--name', name),
			` a lancé un raid !`,
		]),
	],
	['subscription' as AlertType]: [
		(name: string) => h('span', [
			h('strong.alert--name', name),
			` est généreux et se paye un sub !`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour le sub, tu sens désormais bien meilleur.`,
		]),
		(name: string) => h('span', [
			`Et c'est `,
			h('strong.alert--name', name),
			` qui lâche un sub. Tu es moins riche, mais moi plus ! Merci :)`,
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

function getSentence(type: AlertType, name: string): VNode {
	const sentencesForType = ALERT_SENTENCES[type]

	const sentence = sentencesForType[Math.floor(Math.random() * sentencesForType.length)]

	return sentence(name)
}

function showConfetti(): void {
	confetti({
		particleCount: 200,
		angle: 40,
		spread: 150,
		origin: { x: -0.07 },
		colors: CONFETTI_COLORS,
		zIndex: -1,
		ticks: 100,
	});
}

function addAlert(event: StreamLabsEvent): void {
	const type = event.type
	const message = event.message[0]
	const name = message.name

	let title = type as string
	switch (type) {
		case 'bits':
			title = `${message.amount} bits`
			break;
		case 'host':
			title = `Host — ${message.viewers} viewers`
			break;
		case 'raid':
			title = `Raid — ${message.raiders} raiders`
			break;
	}

	const messageVNode = h('div.alert', {
		key: event.event_id,
	}, [
		icon(ALERT_ICONS[type]),
		h('span.alert--title', title),
		h('div.alert--message', [
			getSentence(type, name),
		]),
	])

	const alert: OverlayAlert = {
		type,
		timeout: +new Date() + EVENT_SHOW_DELAY,
		messageVNode,
	}

	state.alerts.push(alert)
	render(state)

	showConfetti()
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
