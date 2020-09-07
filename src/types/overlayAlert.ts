import {VNode} from 'snabbdom/src/package/vnode'

import AlertType from '@/src/types/alertTypes'

type OverlayAlert = {
	type: AlertType
	timeout: number
	messageVNode: VNode
}

export default OverlayAlert
