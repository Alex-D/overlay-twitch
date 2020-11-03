import {h, VNode} from 'preact'

import {ProjectType} from '~src/constants/starProjects'
import {useStars} from '~src/hooks/useStars'

type ProjectStarsProps = {
	project: ProjectType
	stars: number
}

const ProjectStars = ({project, stars}: ProjectStarsProps) => {
	const projectName = project.split('/')[1]
	const formattedStars = new Intl.NumberFormat('fr-FR').format(stars)

	return (
		<div class="header--stars-project">
			<div class="header--stars-name">{projectName}</div>
			{formattedStars} ★
		</div>
	)
}

export default function HeaderStars(): VNode {
	const starCounts = useStars()

	return (
		<div class="header--stars">
			{
				Object.keys(starCounts).map((project) =>  (
					<ProjectStars project={project} stars={starCounts[project]}/>
				))
			}
		</div>
	)
}
