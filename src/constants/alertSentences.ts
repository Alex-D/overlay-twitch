import {h} from 'snabbdom/src/package/h'
import {VNode} from 'snabbdom/src/package/vnode'

import AlertType from '@/src/types/alertTypes'

function formatMessage(message: string): VNode | undefined {
	if (!message) {
		return
	}

	const formattedMessage = h('blockquote.alert--message', [
		message,
	])

	return formattedMessage
}

const ALERT_SENTENCES: Record<AlertType, Array<(name: string, message: string) => VNode>> = {
	'bits': [
		(name: string, message: string): VNode => h('span', [
			h('strong.alert--name', name),
			` a offert un bout de sa paye !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			`, tu es désormais bien plus beau.`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour ta contribution à mes prochains VSTs :)`,
			formatMessage(message),
		]),
	],
	'donation': [
		(name: string, message: string): VNode => h('span', [
			h('strong.alert--name', name),
			` a offert un bout de sa paye !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			`, tu as fait ta bonne action de la semaine !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour ta contribution à mes prochains VSTs :)`,
			formatMessage(message),
		]),
	],
	'follow': [
		(name: string, message: string): VNode => h('span', [
			h('strong.alert--name', name),
			` suit désormais cette chaîne !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Bonsoir à `,
			h('strong.alert--name', name),
			` qui nous a rejoint !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Serait-ce là `,
			h('strong.alert--name', name),
			` qui souscrit l'abonnement ?`,
			formatMessage(message),
		]),
	],
	'gift_sub': [
		(name: string, message: string): VNode => h('span', [
			`Un sub a été offert à `,
			h('strong.alert--name', name),
			formatMessage(message),
		]),
	],
	'cgift_sub': [
		(name: string, message: string): VNode => h('span', [
			`Il pleut des subs !`,
			formatMessage(message),
		]),
	],
	'host': [
		(name: string, message: string): VNode => h('span', [
			h('strong.alert--name', name),
			` host désormais ce live !`,
			formatMessage(message),
		]),
	],
	'raid': [
		(name: string, message: string): VNode => h('span', [
			h('strong.alert--name', name),
			` a lancé un raid !`,
			formatMessage(message),
		]),
	],
	'resub': [
		(name: string, message: string): VNode => h('span', [
			h('strong.alert--name', name),
			` encore et toujours au présent ! Merci pour le soutien !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Rien n'arrête plus `,
			h('strong.alert--name', name),
			` ! Merci à toi :)`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Merci et rendez-vous le mois prochain `,
			h('strong.alert--name', name),
			` !`,
			formatMessage(message),
		]),
	],
	'subscription': [
		(name: string, message: string): VNode => h('span', [
			h('strong.alert--name', name),
			` est généreux et se paye un sub !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Merci `,
			h('strong.alert--name', name),
			` pour le sub !`,
			formatMessage(message),
		]),
		(name: string, message: string): VNode => h('span', [
			`Et c'est `,
			h('strong.alert--name', name),
			` qui lâche un sub. Tu es moins riche, mais moi plus ! Merci :)`,
			formatMessage(message),
		]),
	],
}

export default ALERT_SENTENCES
