import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Theme from '../../other/theme'

const SpaceContainer = styled.div`
	position: relative;
	width: 180px;
	height: 40px;

	@media (max-width: 800px) {
		width: 40px;
		height: 160px;
		margin-left: 2rem;
		margin-right: 3rem;
	}
`

const Container = styled.div`
	position: absolute;
	width: 180px;
	height: 40px;
	background-color: ${Theme.colorBackground};
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 0.5rem;

	@media (max-width: 800px) {
		width: 160px;
		transform: rotate(270deg) translateX(-35%) translateY(-155%);
	}
`

const Bar = styled.div`
	position: absolute;
	width: 100%;
	height: 5px;
	background-color: ${Theme.colorText4};
	border-radius: 5px;
	display: flex;
	align-items: center;

	&::before {
		content: '';
		height: 100%;
		width: ${(props) => (props.calories / 3000) * 100}%;
		border-radius: 5px;
		background-color: ${(props) =>
			props.calories >= Math.min(props.from, props.to) &&
			props.calories <= Math.max(props.from, props.to)
				? Theme.colorAccent
				: Theme.colorWarning};
		transition: background-color 1s ease-in-out;
	}
`

const Label = styled.p`
	font-family: 'League Spartan', sans-serif;
	text-transform: uppercase;
	color: ${Theme.colorText1};
	position: absolute;
	top: 0;
	left: 0;
	font-size: 1.2rem;

	@media (max-width: 800px) {
		transform: rotate(90deg) translateX(-50%);
	}
`

const Number = styled.p`
	font-family: 'League Spartan', sans-serif;
	text-transform: uppercase;
	color: ${Theme.colorText1};
	position: absolute;
	font-size: 1.2rem;

	@media (max-width: 800px) {
		transform: rotate(90deg);
	}
`

const Slider = styled.input`
	appearance: none;
	background: transparent;
	outline: none;
	width: 100%;
	position: absolute;
	z-index: 1;
	pointer-events: none;

	&::-webkit-slider-thumb {
		appearance: none;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: ${Theme.colorBackground};
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.35);
		pointer-events: all;
		cursor: pointer;
		transition: transform 0.3s ease-in-out;

		&:hover {
			transform: scale(1.1);
		}

		&:active {
			transform: scale(1.2);
		}
	}
	&::-moz-range-thumb {
		appearance: none;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: ${Theme.colorBackground};
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.35);
		pointer-events: all;
		cursor: pointer;
		transition: transform 0.3s ease-in-out;

		&:hover {
			transform: scale(1.1);
		}

		&:active {
			transform: scale(1.2);
		}
	}
`

const CalorieSlider = (props) => {
	const [value1, setValue1] = useState(
		props.dayData.nutritionSettings.calories.from || 0
	)
	const [value2, setValue2] = useState(
		props.dayData.nutritionSettings.calories.to || 0
	)
	const slider1Ref = useRef(null)
	const slider2Ref = useRef(null)
	const label1Ref = useRef(null)
	const label2Ref = useRef(null)

	useEffect(() => {
		const sliderWidth = slider1Ref.current.offsetWidth
		const thumbWidth = 11

		const newValue1 =
			(value1 / 3000) * (sliderWidth - thumbWidth) + thumbWidth / 2
		label1Ref.current.style.left = `${newValue1}px`

		const newValue2 =
			(value2 / 3000) * (sliderWidth - thumbWidth) + thumbWidth / 2
		label2Ref.current.style.left = `${newValue2}px`
	}, [value1, value2])

	const handleChange1 = (event) => {
		setValue1(event.target.value)
	}

	const handleChange2 = (event) => {
		setValue2(event.target.value)
	}

	return (
		<SpaceContainer>
			<Container>
				<Label>CAL</Label>
				<Bar
					calories={props.dayData.totalNutrition.calories}
					from={value1}
					to={value2}
				/>
				<Slider
					type="range"
					min="0"
					max="3000"
					step="100"
					value={value1}
					onChange={handleChange1}
					ref={slider1Ref}
				/>
				<Number ref={label1Ref} style={{ bottom: '-5px' }}>
					{value1}
				</Number>
				<Slider
					type="range"
					min="0"
					max="3000"
					step="100"
					value={value2}
					onChange={handleChange2}
					ref={slider2Ref}
				/>
				<Number ref={label2Ref} style={{ top: '-5px' }}>
					{value2}
				</Number>
			</Container>
		</SpaceContainer>
	)
}

export default CalorieSlider
