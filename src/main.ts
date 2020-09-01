import * as io from 'socket.io-client'
import confetti from 'canvas-confetti'
import {init} from 'snabbdom/src/package/init'
import {h} from 'snabbdom/src/package/h'
import {attributesModule} from 'snabbdom/src/package/modules/attributes'
import {classModule} from 'snabbdom/src/package/modules/class'
import {VNode} from 'snabbdom/src/package/vnode'

const KEEP_ALERTS = false

type IconId = 'money-bag'

type AlertType = 'donation' | 'follow' | 'subscription'

type StreamLabsEvent = {
	for?: 'twitch_account'
	event_id: number
	type: AlertType
	message: {
		name: string
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

const SENTENCES = {
	['donation' as AlertType]: [
		(name: string) => h('span', [
			h('strong', name),
			` a offert un bout de sa paye !`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong', name),
			`, tu es désormais bien plus beau.`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong', name),
			` pour ta contribution à mes prochains VSTs :)`,
		]),
	],
	['follow' as AlertType]: [
		(name: string) => h('span', [
			h('strong', name),
			` suit désormais cette chaîne !`,
		]),
		(name: string) => h('span', [
			`Bonsoir à `,
			h('strong', name),
			` qui nous a rejoint !`,
		]),
		(name: string) => h('span', [
			`Serait-ce là `,
			h('strong', name),
			` qui souscrit l'abonnement ?`,
		]),
	],
	['subscription' as AlertType]: [
		(name: string) => h('span', [
			h('strong', name),
			` est généreux et se paye un sub !`,
		]),
		(name: string) => h('span', [
			`Merci `,
			h('strong', name),
			` pour le sub, tu sens désormais bien meilleur.`,
		]),
		(name: string) => h('span', [
			`Et c'est `,
			h('strong', name),
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
	const sentencesForType = SENTENCES[type]

	const sentence = sentencesForType[Math.floor(Math.random() * sentencesForType.length)]

	return sentence(name)
}

function showConfetti(): void {
	confetti({
		particleCount: 200,
		angle: 60,
		spread: 55,
		origin: { x: 0 },
		colors: CONFETTI_COLORS,
	});
}

function addAlert(event: StreamLabsEvent): void {
	const type = event.type
	const name = event.message[0].name
	const messageVNode = h('div.alert', {
		key: event.event_id,
	}, [
		icon('money-bag'),
		getSentence(type, name),
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

const SUPPORTED_EVENT_TYPES = [
	'donation',
	'follow',
	'subscription',
]

streamlabs.on('event', (event: StreamLabsEvent) => {
	if (!SUPPORTED_EVENT_TYPES.includes(event.type)) {
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
