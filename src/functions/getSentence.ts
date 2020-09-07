import {VNode} from 'snabbdom/src/package/vnode'

import ALERT_SENTENCES from '@/src/constants/alertSentences'
import AlertType from '@/src/types/alertTypes'

function getSentence(type: AlertType, name: string, message: string): VNode {
	const sentencesForType = ALERT_SENTENCES[type]

	const sentence = sentencesForType[Math.floor(Math.random() * sentencesForType.length)]

	return sentence(name, message)
}

export default getSentence
