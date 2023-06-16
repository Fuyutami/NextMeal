import React, { useEffect } from 'react'
import styled from 'styled-components'

import Theme from '../../other/theme'
import { fadeIn } from '../../other/animations'
import DaySelector from './DaySelector'
import Timer from './Timer'
import CalorieSlider from './CalorieSlider'
import MacroSliders from './MacroSliders'

const Container = styled.div`
	width: 232px;
	height: 500px;
	border-radius: 15px;
	padding: 22px;
	background: ${Theme.colorBackground};
	box-shadow: 5px 5px 10px #e3e3e3, -5px -5px 10px #ffffff;
	margin-left: 28px;
	display: flex;
	flex-direction: column;
	align-items: center;

	box-shadow: 5px 5px 10px #e3e3e3, -5px -5px 10px #ffffff;

	animation: ${fadeIn} 3s ease-in-out forwards;

	@media (max-width: 800px) {
		width: 500px;
		height: 280px;
		margin-left: 0;
		margin-bottom: 28px;
	}
`

const ControlsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 800px) {
		flex-direction: row;
	}
`

const Controller = (props) => {
	// useEffect(() => {
	// 	console.log(props.dayData)
	// }, [props.dayData])
	return (
		<>
			<Container>
				<DaySelector dayData={props.dayData} changeDay={props.changeDay} />
				<ControlsWrapper>
					<Timer dayData={props.dayData} nextMealId={props.nextMealId} />
					<CalorieSlider dayData={props.dayData} />
					<MacroSliders dayData={props.dayData} />
				</ControlsWrapper>
				{/* <Indicators dayData={props.dayData} /> */}
			</Container>
		</>
	)
}

export default Controller
