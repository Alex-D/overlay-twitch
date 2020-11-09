export default function getUrlSearchParam(key: string): string {
	const urlSearchParams = new URLSearchParams(window.location.search)

	return urlSearchParams.get(key) || ''
}
