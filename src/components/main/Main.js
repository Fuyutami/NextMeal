import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Plate from './plate/Plate'
import Controller from './controller/Controller'
import { weeklyMenuData } from '../other/data'
import Composer from './composer/Composer'

import Theme from '../other/theme'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 800px) {
		flex-direction: column-reverse;
	}
`

const Message = styled.p`
	font-family: 'League Spartan', sans-serif;
	font-size: 1.6rem;
	color: ${Theme.colorText1};
	margin: 2rem;
`

const Main = () => {
	const [data, setData] = useState({})
	const [activeDay, setActiveDay] = useState(0)
	const [nextMealId, setNextMealId] = useState(0)
	const [isFirstRender, setIsFirstRender] = useState(true)
	const [todayData, setTodayData] = useState({})
	const [composerActive, setComposerActive] = useState(false)
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 550)

	// handle window resize
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 550)

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// load data
	useEffect(() => {
		const today = new Date().getDay()
		setActiveDay(today)
		// load data from server
		const data = weeklyMenuData
		setData(data)
		setTodayData(data[today])
	}, [])

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false)
			return
		} else {
			// calculate Daily Nutrition
			calculateDailyNutrition()
		}
		// console.log('active day: ' + activeDay)
		// calculate next meal
		const now = new Date()
		const currentTime = now.getHours() * 60 + now.getMinutes()
		let nextMealId = undefined
		let distanceToNextMeal = Infinity

		data[activeDay].meals.forEach((meal, index) => {
			const mealTime = meal.time.hours * 60 + meal.time.minutes
			let distance = mealTime - currentTime
			// If meal time is in the past, add 24 hours to compare with next day meal
			if (distance < 0) {
				distance += 24 * 60
			}
			// If this meal is closer than the current closest meal, update closest meal
			if (distance < distanceToNextMeal) {
				distanceToNextMeal = distance
				nextMealId = index
			}
		})
		if (nextMealId === undefined) {
			nextMealId = 0 // If all meals are in the past, set the first meal as the next meal
		}
		setNextMealId(nextMealId)
	}, [activeDay])

	const handleDayChange = (day) => {
		setActiveDay(day)
		setTodayData(data[day])
	}

	const calculateDailyNutrition = () => {
		// console.log('calculating daily nutrition')
		let data = { ...todayData }

		let totalNutrition = {
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
		}
		data.meals.forEach((meal) => {
			totalNutrition.calories += meal.nutrition.calories
			totalNutrition.protein += meal.nutrition.protein
			totalNutrition.carbs += meal.nutrition.carbs
			totalNutrition.fat += meal.nutrition.fat
		})
		// round calories
		totalNutrition.calories = totalNutrition.calories.toFixed(0)
		let totalMacros =
			totalNutrition.protein + totalNutrition.carbs + totalNutrition.fat
		// Convert macros to percentage
		totalNutrition.protein = (
			(totalNutrition.protein / totalMacros) *
			100
		).toFixed(0)
		totalNutrition.carbs = ((totalNutrition.carbs / totalMacros) * 100).toFixed(
			0
		)
		totalNutrition.fat = ((totalNutrition.fat / totalMacros) * 100).toFixed(0)
		data.totalNutrition = totalNutrition
		setTodayData(data)
	}

	return (
		<Container>
			{isMobile ? (
				<Message>We do not currently support mobile devices &#58;&#40;</Message>
			) : (
				!isFirstRender && (
					<>
						{composerActive ? (
							<Composer
								dayData={todayData}
								closeComposer={() => {
									console.log('close composer')
									setComposerActive(false)
								}}
							/>
						) : (
							<Plate
								dayData={todayData}
								activateComposer={() => {
									setComposerActive(true)
								}}
							/>
						)}
						<Controller
							nextMealId={nextMealId}
							dayData={todayData}
							changeDay={handleDayChange}
						/>
					</>
				)
			)}
		</Container>
	)
}

export default Main
