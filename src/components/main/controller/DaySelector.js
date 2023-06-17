import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Theme from '../../other/theme'

const Container = styled.div`
	width: 220px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	@media (max-width: 800px) {
		height: 100px;
	}
`

const DayLabel = styled.p`
	color: ${Theme.colorText1};
	font-size: 1.8rem;
	font-family: 'League Spartan', sans-serif;
	font-weight: 500;
`
const Selector = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	border: 1px solid ${Theme.colorText3};
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`

const Day = styled.div`
	font-size: 1.2rem;
	color: ${(props) =>
		props.id === props.activeDay ? Theme.colorText5 : Theme.colorText3};
	background-color: ${(props) =>
		props.id === props.activeDay ? Theme.colorAccent : Theme.colorReflection};
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;

	&:hover {
		background-color: ${(props) =>
			props.id === props.activeDay ? Theme.colorAccent : Theme.colorBackground};
	}
`

const DaySelector = (props) => {
	const [selectDay, setSelectDay] = useState(false)

	const toggleSelectDay = () => {
		setSelectDay(!selectDay)
	}

	return (
		<>
			<Container onMouseEnter={toggleSelectDay} onMouseLeave={toggleSelectDay}>
				{selectDay ? (
					<Selector>
						<Day
							id={0}
							activeDay={props.dayData.id}
							onClick={() => {
								props.changeDay(0)
							}}
						>
							Sun
						</Day>
						<Day
							id={1}
							activeDay={props.dayData.id}
							onClick={() => {
								props.changeDay(1)
							}}
						>
							Mon
						</Day>
						<Day
							id={2}
							activeDay={props.dayData.id}
							onClick={() => {
								props.changeDay(2)
							}}
						>
							Tue
						</Day>
						<Day
							id={3}
							activeDay={props.dayData.id}
							onClick={() => {
								props.changeDay(3)
							}}
						>
							Wed
						</Day>
						<Day
							id={4}
							activeDay={props.dayData.id}
							onClick={() => {
								props.changeDay(4)
							}}
						>
							Thu
						</Day>
						<Day
							id={5}
							activeDay={props.dayData.id}
							onClick={() => {
								props.changeDay(5)
							}}
						>
							Fri
						</Day>
						<Day
							id={6}
							activeDay={props.dayData.id}
							onClick={() => {
								props.changeDay(6)
							}}
						>
							Sat
						</Day>
					</Selector>
				) : (
					<DayLabel>{props.dayData.name}</DayLabel>
				)}
			</Container>{' '}
		</>
	)
}

export default DaySelector
