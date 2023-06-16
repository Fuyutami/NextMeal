import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Theme from '../../other/theme'

const Container = styled.div`
	position: relative;
	width: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2rem;

	transform: rotate(270deg);

	@media (max-width: 800px) {
		transform: rotate(0deg);
	}
`
const ValueLabel = styled.p`
	font-family: 'League Spartan', sans-serif;
	text-transform: uppercase;
	color: ${Theme.colorText1};
	font-size: 1.2rem;
	transform: rotate(-270deg);

	@media (max-width: 800px) {
		transform: rotate(0deg);
	}
`

const ValueWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 155px;

	@media (max-width: 800px) {
		width: auto;
		height: 150px;
		margin-left: 1rem;
	}
`

const AllSlidersWrapper = styled.div`
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;
`

const SliderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const Bar = styled.div`
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 5px;
	background-color: ${Theme.colorText4};
	border-radius: 5px;
	display: flex;
	align-items: center;
`

const Fill = styled.div`
	position: relative;
	height: 100%;
	width: ${(props) => props.macro}%;
	border-radius: 5px;
	background-color: ${(props) =>
		props.content === 'protein'
			? Theme.colorProtein
			: props.content === 'fat'
			? Theme.colorFat
			: Theme.colorCarbs};
	transition: background-color 1s ease-in-out;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: ${(props) => ((props.macro - props.setValue) * 160) / 100}%;
		background-color: ${Theme.colorWarning};
	}
`

const Label = styled.p`
	font-family: 'League Spartan', sans-serif;
	font-size: 1.2rem;
	text-transform: uppercase;
	color: ${Theme.colorText1};
	transform: rotate(-270deg);
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 800px) {
		transform: rotate(0deg);
	}
`
const LabelsWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 155px;

	@media (max-width: 800px) {
		width: auto;
		height: 150px;
		margin-right: 1rem;
	}
`

const Slider = styled.input`
	appearance: none;
	background: transparent;
	position: relative;
	outline: none;
	width: 100px;
	z-index: 2;
	pointer-events: none;

	&::-webkit-slider-thumb {
		appearance: none;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: ${Theme.colorBackground};
		box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.35);
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
		box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.35);
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

const MacroSliders = (props) => {
	const [freeSliders, setFreeSliders] = useState(['protein', 'fat', 'carbs'])
	const { nutritionSettings } = props.dayData
	const [protein, setProtein] = useState(nutritionSettings.protein)
	const [fat, setFat] = useState(nutritionSettings.fat)
	const [carbs, setCarbs] = useState(nutritionSettings.carbs)
	const [lastChanged, setLastChanged] = useState(null)

	// useEffect(() => {
	// 	console.log('Last Changed:', lastChanged)
	// }, [lastChanged])

	const handleSliderChange = (macroName, newValue) => {
		if (macroName === 'protein') {
			setProtein(newValue)
		} else if (macroName === 'fat') {
			setFat(newValue)
		} else {
			setCarbs(newValue)
		}
		let newFreeSliders = ['protein', 'fat', 'carbs'].filter(
			(x) => x !== macroName && x !== lastChanged
		)
		setFreeSliders(newFreeSliders)
	}

	const handleMouseUp = (macroName) => {
		const lastChangedValue = getLastChangedValue() || 0

		if (macroName === 'protein') {
			if (freeSliders.length === 1) {
				let remainder = 100 - protein - lastChangedValue

				if (remainder >= 0 && remainder <= 100) {
					updateMacro(freeSliders[0], remainder)
					setLastChanged(macroName)
					return
				}
			}
			// console.log('value last:' + lastChangedValue)
			let remainder = 100 - protein - lastChangedValue
			if (remainder) remainder = 100 - protein
			let splitValue = Math.floor(remainder / 2 / 5) * 5
			updateMacro('fat', splitValue)
			updateMacro('carbs', remainder - splitValue)
		} else if (macroName === 'fat') {
			if (freeSliders.length === 1) {
				let remainder = 100 - fat - lastChangedValue
				if (remainder >= 0 && remainder <= 100) {
					updateMacro(freeSliders[0], remainder)
					setLastChanged(macroName)
					return
				}
			}
			let remainder = 100 - fat - lastChangedValue
			if (remainder) remainder = 100 - fat
			let splitValue = Math.floor(remainder / 2 / 5) * 5
			updateMacro('protein', splitValue)
			updateMacro('carbs', remainder - splitValue)
		} else if (macroName === 'carbs') {
			if (freeSliders.length === 1) {
				let remainder = 100 - carbs - lastChangedValue
				if (remainder >= 0 && remainder <= 100) {
					updateMacro(freeSliders[0], remainder)
					setLastChanged(macroName)
					return
				}
			}
			let remainder = 100 - carbs - lastChangedValue
			if (remainder) remainder = 100 - carbs
			let splitValue = Math.floor(remainder / 2 / 5) * 5
			updateMacro('protein', splitValue)
			updateMacro('fat', remainder - splitValue)
		}
		setLastChanged(macroName)
	}

	const getLastChangedValue = () => {
		if (!lastChanged) return 0
		if (lastChanged === 'protein') {
			return protein
		} else if (lastChanged === 'fat') {
			return fat
		} else {
			return carbs
		}
	}

	const updateMacro = (macroName, value) => {
		if (macroName === 'protein') {
			setProtein(value)
		} else if (macroName === 'fat') {
			setFat(value)
		} else if (macroName === 'carbs') {
			setCarbs(value)
		}
	}

	return (
		<Container>
			<LabelsWrapper>
				<Label>P</Label>
				<Label>F</Label>
				<Label>C</Label>
			</LabelsWrapper>

			<AllSlidersWrapper>
				<SliderWrapper>
					<Bar>
						<Fill
							macro={props.dayData.totalNutrition.protein}
							setValue={protein}
							content="protein"
						/>
					</Bar>

					<Slider
						type="range"
						min="0"
						max="100"
						step="5"
						value={protein}
						onChange={(e) => {
							handleSliderChange('protein', e.target.value)
						}}
						onMouseUp={() => {
							handleMouseUp('protein')
						}}
					/>
				</SliderWrapper>

				<SliderWrapper>
					<Bar>
						<Fill
							macro={props.dayData.totalNutrition.fat}
							setValue={fat}
							content="fat"
						/>
					</Bar>

					<Slider
						type="range"
						min="0"
						max="100"
						step="5"
						value={fat}
						onChange={(e) => {
							handleSliderChange('fat', e.target.value)
						}}
						onMouseUp={() => {
							handleMouseUp('fat')
						}}
					/>
				</SliderWrapper>

				<SliderWrapper>
					<Bar>
						<Fill
							macro={props.dayData.totalNutrition.carbs}
							setValue={carbs}
							content="carbs"
						/>
					</Bar>

					<Slider
						type="range"
						min="0"
						max="100"
						step="5"
						value={carbs}
						onChange={(e) => {
							handleSliderChange('carbs', e.target.value)
						}}
						onMouseUp={() => {
							handleMouseUp('carbs')
						}}
					/>
				</SliderWrapper>
			</AllSlidersWrapper>

			<ValueWrapper>
				<ValueLabel>{`${protein}%`}</ValueLabel>
				<ValueLabel>{`${fat}%`}</ValueLabel>
				<ValueLabel>{`${carbs}%`}</ValueLabel>
			</ValueWrapper>
		</Container>
	)
}

export default MacroSliders
