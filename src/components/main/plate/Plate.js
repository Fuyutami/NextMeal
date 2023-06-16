import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Theme from '../../other/theme'
import { fadeIn } from '../../other/animations'
import Controls from './Controls'
import Meal from './Meal'

const Container = styled.div`
	max-width: 500px;
	max-height: 500px;
	width: 500px;
	height: 500px;
	border-radius: 15px;
	padding: 22px;
	background: ${Theme.colorBackground};
	box-shadow: 5px 5px 10px #e3e3e3, -5px -5px 10px #ffffff;
	animation: ${fadeIn} 3s ease-in-out forwards;
	padding: 0;
	overflow: hidden;
`

const PlateWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: 45% 55%;
	grid-template-columns: repeat(7, 1fr);
`

const Plate = (props) => {
	const [activeMeal, setActiveMeal] = useState(undefined)

	const activateMeal = (index) => {
		setActiveMeal(index)
	}

	const deactivateMeal = () => {
		setActiveMeal(undefined)
	}

	useEffect(() => {
		console.log(activeMeal)
	}, [activeMeal])

	return (
		<>
			<Container>
				<PlateWrapper>
					<Controls
						activeMeal={activeMeal}
						activateComposer={props.activateComposer}
					/>
					{props.dayData.meals.map((meal, index) => {
						return (
							<Meal
								key={index}
								id={index}
								active={activeMeal === index}
								mealData={meal}
								index={index}
								dayData={props.dayData}
								setActiveMeal={(index) => {
									activateMeal(index)
								}}
								deactivateMeal={deactivateMeal}
							/>
						)
					})}
				</PlateWrapper>
			</Container>
		</>
	)
}

export default Plate
