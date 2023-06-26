import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import Theme from '../../other/theme'
import { IconDelete, IconEdit, MealIcon } from '../../other/vectors'
import { fadeIn, fadeOut } from '../../other/animations'

const Container = styled.li`
	width: 100%;
	height: ${(props) =>
		props.totalMeals > 2
			? `${100 / 3}%`
			: props.totalMeals === 2
			? '50%'
			: '100%'};
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	cursor: pointer;
	transition: all 0.5s ease-in-out;

	:hover {
		background: ${Theme.colorText4};
	}

	:not(:last-child)::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 1px;
		background: ${Theme.colorText4};
	}
`

const MealWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const ActiveMealContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${Theme.colorAccent};

	&.fade-enter {
		opacity: 0;
	}

	&.fade-enter-active {
		opacity: 1;
		animation: ${fadeIn} 1s;
	}

	&.fade-exit {
		opacity: 1;
	}

	&.fade-exit-active {
		opacity: 0;
		animation: ${fadeOut} 1s;
	}
`

const ActiveMealWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`

const Name = styled.p`
	font-size: 1.7rem;
	line-height: 2rem;
	font-family: 'League Spartan', sans-serif;
	color: ${(props) =>
		props.active ? Theme.colorReflection : Theme.colorText1};
	margin-left: 1.5rem;
`
const CalorieLabel = styled.p`
	font-size: 1.3rem;
	font-weight: 400;
	font-family: 'Lato', sans-serif;
	color: ${Theme.colorReflection};
	text-transform: uppercase;
`
const MacrosContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin: 1rem 0;
`

const MacroWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const MacroName = styled.p`
	width: 10px;
	font-size: 1.2rem;
	font-weight: 400;
	font-family: 'Lato', sans-serif;
	color: ${Theme.colorReflection};
	text-transform: uppercase;
	margin-right: 0.5rem;
`
const MacroBar = styled.div`
	position: relative;
	height: 5px;
	width: 100px;
	background: transparent;

	::after {
		content: '';
		position: absolute;
		height: 100%;
		width: ${(props) => props.value}%;
		background: ${Theme.colorReflection};
	}
`
const MacroValue = styled.p`
	width: 20px;
	display: flex;
	justify-content: flex-end;
	font-size: 1.2rem;
	font-weight: 400;
	font-family: 'Lato', sans-serif;
	color: ${Theme.colorReflection};
	margin-left: 0.5rem;
`
const Controls = styled.div`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 45px;
	cursor: pointer;
`

const Meal = (props) => {
	// const [macros, setMacros] = useState({ protein: 0, fat: 0, carbs: 0 })
	const [totalMeals, setTotalMeals] = useState(0)

	// const calculateMacros = () => {
	// 	const nutrition = props.mealData.nutrition
	// 	const total = nutrition.protein + nutrition.fat + nutrition.carbs
	// 	const protein = (nutrition.protein / total) * 100
	// 	const fat = (nutrition.fat / total) * 100
	// 	const carbs = (nutrition.carbs / total) * 100
	// 	setMacros({ protein: protein, fat: fat, carbs: carbs })
	// }

	useEffect(() => {
		setTotalMeals(props.dayData.meals.length)
	}, [props.dayData.meals])

	return (
		<Container totalMeals={totalMeals}>
			<MealWrapper>
				{' '}
				<MealIcon category={props.mealData.category} fill={Theme.colorText3} />
				<Name active={false}>{props.mealData.name}</Name>
			</MealWrapper>
		</Container>
		// <Container
		// 	id={props.id}
		// 	onMouseEnter={() => {
		// 		props.setActiveMeal(props.id)
		// 	}}
		// 	onMouseLeave={() => {
		// 		props.deactivateMeal()
		// 	}}
		// >
		// 	<CSSTransition
		// 		in={props.active}
		// 		timeout={1000}
		// 		classNames="fade"
		// 		unmountOnExit
		// 	>
		// 		<ActiveMealContainer>
		// 			<Controls>
		// 				<IconEdit fill={Theme.colorReflection} width="20px" height="20px" />
		// 				<IconDelete
		// 					fill={Theme.colorReflection}
		// 					width="22px"
		// 					height="22px"
		// 				/>
		// 			</Controls>
		// 			<ActiveMealWrapper>
		// 				<MealWrapper>
		// 					<MealIcon
		// 						category={props.mealData.category}
		// 						fill={Theme.colorReflection}
		// 					/>
		// 					<Name active={true}>{props.mealData.name}</Name>
		// 				</MealWrapper>
		// 				<MacrosContainer>
		// 					<MacroWrapper>
		// 						<MacroName>P</MacroName>
		// 						<MacroBar value={macros.protein} />

		// 						<MacroValue>
		// 							{Math.round(props.mealData.nutrition.protein)}g
		// 						</MacroValue>
		// 					</MacroWrapper>
		// 					<MacroWrapper>
		// 						<MacroName>F</MacroName>
		// 						<MacroBar value={macros.fat} />

		// 						<MacroValue>
		// 							{Math.round(props.mealData.nutrition.fat)}g
		// 						</MacroValue>
		// 					</MacroWrapper>
		// 					<MacroWrapper>
		// 						<MacroName>C</MacroName>
		// 						<MacroBar value={macros.carbs} />

		// 						<MacroValue>
		// 							{Math.round(props.mealData.nutrition.carbs)}g
		// 						</MacroValue>
		// 					</MacroWrapper>
		// 				</MacrosContainer>
		// 				<CalorieLabel>{props.mealData.nutrition.calories} CAL</CalorieLabel>
		// 			</ActiveMealWrapper>
		// 		</ActiveMealContainer>
		// 	</CSSTransition>
		// 	<CSSTransition
		// 		in={!props.active}
		// 		timeout={1000}
		// 		classNames="fade"
		// 		unmountOnExit
		// 	>
		// 		<MealWrapper>
		// 			<MealIcon
		// 				category={props.mealData.category}
		// 				fill={Theme.colorText3}
		// 			/>
		// 			<Name active={false}>{props.mealData.name}</Name>
		// 		</MealWrapper>
		// 	</CSSTransition>
		// </Container>
	)
}

export default Meal
