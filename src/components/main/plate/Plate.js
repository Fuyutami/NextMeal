import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Theme from '../../other/theme'
import { fadeIn } from '../../other/animations'
import AddNewBtn from './AddNewBtn'
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
	position: relative;
`
// unordered list
const MealsWrapper = styled.ul`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0;
	overflow-y: scroll;
	overflow-x: hidden;
	list-style: none;

	::-webkit-scrollbar {
		width: 0px;
		background: transparent;
	}
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
				<AddNewBtn
					activeMeal={activeMeal}
					activateComposer={props.activateComposer}
				/>
				<MealsWrapper>
					{props.dayData.meals.map((meal, index) => {
						return (
							<Meal
								key={index}
								id={index}
								mealData={meal}
								index={index}
								dayData={props.dayData}
							/>
						)
					})}
				</MealsWrapper>
			</Container>
		</>
	)
}

export default Plate
