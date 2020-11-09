import './assets/styles/style.scss'

import {h, render} from 'preact'

import App from '~src/components/App.tsx'

const app: HTMLElement = document.getElementById('app') as HTMLElement

render(h(App, null), app)
