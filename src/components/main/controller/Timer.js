import React, { useEffect } from 'react'
import styled from 'styled-components'
import Theme from '../../other/theme'

const Container = styled.div`
	width: 200px;
	height: 200px;
	padding: 1rem;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Circle = styled.div`
	width: 160px;
	height: 160px;
	border-radius: 50%;
	background-color: transparent;
	border: 1px solid ${Theme.colorText3};
	position: absolute;
`

const Time = styled.p`
	font-size: 1.9rem;
	color: ${Theme.colorText1};
	font-family: 'Michroma', sans-serif;
`

const Meal = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${(props) =>
		props.passed ? Theme.colorText4 : Theme.colorText2};
	position: absolute;
	left: ${(props) => props.left}px;
	top: ${(props) => props.top}px;
	transform: translate(-50%, -50%);
`

const Timer = (props) => {
	// useEffect(() => {
	// 	console.log(props.dayData.meals)
	// }, [props.dayData])

	const formatTime = () => {
		const hour = props.dayData.meals[props.nextMealId].time.hours
		const minutes = props.dayData.meals[props.nextMealId].time.minutes

		return `${hour}:${minutes < 10 ? '0' + minutes : minutes}`
	}

	return (
		<Container>
			<Circle>
				{props.dayData.meals.map((meal) => {
					let passed = false
					const [hours, minutes] = [meal.time.hours, meal.time.minutes]
					const time = new Date()
					const currentTime = time.getHours() * 60 + time.getMinutes()
					if (currentTime > hours * 60 + minutes) {
						passed = true
					}
					const angle = (hours + minutes / 60) * (360 / 12)
					const radians = (angle - 90) * (Math.PI / 180)
					const radius = 160 / 2 // The radius of the circle (it's half the size of the wrapper)
					const left = radius + radius * Math.cos(radians)
					const top = radius + radius * Math.sin(radians)

					return <Meal key={meal.id} left={left} top={top} passed={passed} />
				})}
			</Circle>
			<Time>{formatTime()}</Time>
		</Container>
	)
}

export default Timer
