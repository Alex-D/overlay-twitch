import {Fragment, h, VNode} from 'preact'

import AlertType from '~src/types/alertTypes'

const ALERT_SENTENCES: Record<AlertType, Array<(name: string) => VNode>> = {
	'bits': [
		(name: string): VNode => (
			<Fragment>
				<strong class="alert--name">{name}</strong> a offert un bout de sa paye !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Merci <strong class="alert--name">{name}</strong>, tu es désormais bien plus beau.
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Merci <strong class="alert--name">{name}</strong> pour ta contribution à mes prochains VSTs :),
			</Fragment>
		),
	],
	'donation': [
		(name: string): VNode => (
			<Fragment>
				<strong class="alert--name">{name}</strong> a offert un bout de sa paye !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Merci <strong class="alert--name">{name}</strong>, tu as fait ta bonne action de la semaine !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Merci <strong class="alert--name">{name}</strong> pour ta contribution à mes prochains VSTs :)
			</Fragment>
		),
	],
	'follow': [
		(name: string): VNode => (
			<Fragment>
				<strong class="alert--name">{name}</strong> suit désormais cette chaîne !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Bonsoir à <strong class="alert--name">{name}</strong> qui nous a rejoint !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Serait-ce là <strong class="alert--name">{name}</strong> qui souscrit l'abonnement ?
			</Fragment>
		),
	],
	'gift_sub': [
		(name: string): VNode => (
			<Fragment>
				Un sub a été offert à <strong class="alert--name">{name}</strong>
			</Fragment>
		),
	],
	'cgift_sub': [
		(name: string): VNode => (
			<Fragment>
				Il pleut des subs !
			</Fragment>
		),
	],
	'host': [
		(name: string): VNode => (
			<Fragment>
				<strong class="alert--name">{name}</strong> host désormais ce live !
			</Fragment>
		),
	],
	'raid': [
		(name: string): VNode => (
			<Fragment>
				<strong class="alert--name">{name}</strong> a lancé un raid !
			</Fragment>
		),
	],
	'resub': [
		(name: string): VNode => (
			<Fragment>
				Merci <strong class="alert--name">{name}</strong> qui est encore et toujours au présent !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Rien n'arrête plus <strong class="alert--name">{name}</strong> ! Merci à toi :),
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Merci et rendez-vous le mois prochain <strong class="alert--name">{name}</strong> !
			</Fragment>
		),
	],
	'subscription': [
		(name: string): VNode => (
			<Fragment>
				<strong class="alert--name">{name}</strong> est généreux et se paye un sub !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				Merci <strong class="alert--name">{name}</strong> pour le sub !
			</Fragment>
		),
		(name: string): VNode => (
			<Fragment>
				<strong class="alert--name">{name}</strong> est moins riche, mais moi plus ! Merci :)
			</Fragment>
		),
	],
}

type AlertSentenceProps = {
	type: AlertType
	name: string
}

export default function AlertSentence(props: AlertSentenceProps): VNode {
	const sentencesForType = ALERT_SENTENCES[props.type]

	const sentence = sentencesForType[Math.floor(Math.random() * sentencesForType.length)]

	return sentence(props.name)
}
