import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import Theme from '../../other/theme'
import { IconArrowDown, IconArrowUp } from '../../other/vectors'

const scale = keyframes`
    0% {
        transform: scale(1);
    }   
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
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
	width: 30px;
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
	width: 30px;
	height: 25px;
	border-radius: 5px;
	background-color: ${Theme.colorBackground};
`

const ArrowWrapper = styled.div`
	height: 10px;
	width: 20px;
`
const Value = styled.p`
	font-family: 'Lato', sans-serif;
	font-size: 1.4rem;
	color: ${Theme.colorText2};
`

const ArrowUp = styled(IconArrowUp)`
	/* animation: ${scale} 1s ease-in-out infinite; */
`
const ArrowDown = styled(IconArrowDown)`
	/* animation: ${scale} 1s ease-in-out infinite; */
`

const Draggable = (props) => {
	return (
		<Container x={props.x} y={props.y} style={{ left: props.x, top: props.y }}>
			<Label>{props.name}</Label>
			<ValueContainer>
				<ArrowWrapper>
					<ArrowUp heigth={8} width={19} fill={Theme.colorText2} />
				</ArrowWrapper>

				<ValueWrapper>
					<Value>100</Value>
				</ValueWrapper>
				<ArrowWrapper>
					<ArrowDown heigth={8} width={19} fill={Theme.colorText2} />
				</ArrowWrapper>
			</ValueContainer>
			<Label>g</Label>
		</Container>
	)
}

export default Draggable
