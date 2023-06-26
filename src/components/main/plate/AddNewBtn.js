import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Theme from '../../other/theme'
import { IconAdd } from '../../other/vectors'

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

const Button = styled.button`
	position: absolute;
	z-index: 1000;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%) translateZ(0);
	width: 70px;
	height: 50px;
	border-radius: 20px 20px 0 0;
	background-color: ${Theme.colorAccent};
	border: none;
	outline: none;
	cursor: pointer;
	padding-top: 10px;

	transition: all 0.2s ease-in-out;
	backface-visibility: hidden;
	will-change: transform;

	:hover {
		transform: translateX(-50%) translateZ(0) scale(1.05);
	}

	:active {
		transform: translateX(-50%) translateZ(0) scale(0.95);
	}
`

const AddNewBtn = (props) => {
	useEffect(() => {
		console.log('act' + props.activeMeal)
	}, [props.activeMeal])
	return (
		<Button onClick={props.activateComposer}>
			<IconAdd fill={Theme.colorReflection} width="22" height="22" />
		</Button>
	)
}

export default AddNewBtn
