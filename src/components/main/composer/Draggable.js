import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import Theme from '../../other/theme'
import { IconArrowDown, IconArrowUp } from '../../other/vectors'
import useScrollSpeed from '../../../hooks/useScrollSpeed'

const blink = keyframes`
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`

const Container = styled.div`
	height: 30px;
	border-radius: 20px;
	background-color: ${Theme.colorText2};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	pointer-events: none;

	position: absolute;
	transform: translate(-50%, -90%);
	z-index: 100;
`

const Label = styled.p`
	font-family: 'Lato', sans-serif;
	font-size: 1.4rem;
	color: ${Theme.colorReflection};
`

const ValueContainer = styled.div`
	height: 60px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin: 0 0.5rem;
`
const ValueWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 40px;
	height: 25px;
	border-radius: 5px;
	background-color: ${Theme.colorBackground};
	padding: 0.5rem;
`

const ArrowWrapper = styled.div``
const ArrowUp = styled(IconArrowUp)``
const ArrowDown = styled(IconArrowDown)``
const Value = styled.input`
	border: none;
	outline: none;
	background: none;
	width: 30px;
	font-family: 'Lato', sans-serif;
	font-size: 1.4rem;
	color: ${Theme.colorText2};
	cursor: text;
`

const Draggable = (props) => {
	const { level, direction, value, timestamp } = useScrollSpeed()
	const [amount, setAmount] = useState(0)
	const inputRef = useRef(null) // Create a ref for the input

	useEffect(() => {
		if (direction === 1) {
			setAmount((prev) => prev + value)
		} else if (direction === -1) {
			setAmount((prev) => {
				if (prev - value < 0) return 0
				else return prev - value
			})
		}
	}, [level, direction, value, timestamp])

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus() // Focus the input element when the component mounts
		}
	}, []) // Pass an empty dependency array to only run this effect once, when the component mounts

	const handleInputChange = (e) => {
		const inputValue = parseInt(e.target.value, 10)
		if (isNaN(inputValue)) {
			setAmount(0)
		} else {
			setAmount(inputValue)
		}
	}

	return (
		<Container x={props.x} y={props.y} style={{ left: props.x, top: props.y }}>
			<Label>{props.name}</Label>
			<ValueContainer>
				<ArrowWrapper>
					<ArrowUp fill={Theme.colorText2} />
				</ArrowWrapper>

				<ValueWrapper>
					<Value
						ref={inputRef} // Attach the ref to the input
						type="text"
						value={amount}
						onChange={handleInputChange}
					/>
				</ValueWrapper>

				<ArrowWrapper>
					<ArrowDown fill={Theme.colorText2} />
				</ArrowWrapper>
			</ValueContainer>

			<Label>g</Label>
		</Container>
	)
}

export default Draggable
