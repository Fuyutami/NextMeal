import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Theme from '../../other/theme'
import { IconAdd, IconDelete, IconEdit } from '../../other/vectors'

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
	width: 100%;
	height: 100%;
	padding: 4rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	// position on a grid should be in row 1 and span two columns
	grid-row: 1;
	grid-column: 1 / span 2;
`

const Button = styled.button`
	border: none;
	outline: none;
	background: none;
	cursor: pointer;

	/* &:hover {
		animation: ${scale} 0.3s ease-in-out 2;
	} */
`

const Controls = (props) => {
	useEffect(() => {
		console.log('act' + props.activeMeal)
	}, [props.activeMeal])
	return (
		<Container>
			<Button onClick={props.activateComposer}>
				<IconAdd fill={Theme.colorText1} width="22" height="22" />
			</Button>
			{/* {props.activeMeal !== undefined ? (
				<>
					<Button onClick={props.activateComposer}>
						<IconEdit fill={Theme.colorText1} width="22" height="22" />{' '}
					</Button>
					<Button>
						<IconDelete fill={Theme.colorText1} width="22" height="22" />{' '}
					</Button>
				</>
			) : null} */}
		</Container>
	)
}

export default Controls
