import {useState} from 'preact/hooks'

import STAR_PROJECTS, {ProjectType} from '~src/constants/starProjects'
import useInterval from '~src/hooks/useInterval'

const LOCALSTORAGE_STARS_KEY = 'overlay-stars-count'

export function useStars() {
	const [starCounts, setStarCounts] = useState<Record<ProjectType, number>>({})

	function refreshStarsCount() {
		const oldStarsCount = JSON.parse(localStorage.getItem(LOCALSTORAGE_STARS_KEY) || '{}')

		Promise.all(STAR_PROJECTS.map((project) => {
			return fetch(`https://api.github.com/repos/${project}`).then((response) => {
				if (response.status !== 200) {
					return {
						project,
						stars: oldStarsCount[project],
					}
				}

				return response.json().then((body) => {
					const stars = body.stargazers_count
					return {
						project,
						stars,
					}
				})
			})
		})).then((starCounts) => {
			const updatedStarsCount = starCounts.reduce((acc, {project, stars}) => {
				return {
					...acc,
					[project]: stars,
				}
			}, {} as Record<ProjectType, number>)
			localStorage.setItem(LOCALSTORAGE_STARS_KEY, JSON.stringify(updatedStarsCount))
			setStarCounts(updatedStarsCount)
		})
	}

	useInterval(refreshStarsCount, 3_600_000, true)

	return starCounts
}
