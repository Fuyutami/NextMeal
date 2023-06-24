import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'

import Theme from '../other/theme.js'
import { fadeOut, fadeIn } from '../other/animations.js'
import {
	IconFacebook,
	IconGoogle,
	IconTwitter,
	Logo,
} from '../other/vectors.js'

const RegistrationContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	animation: ${(props) =>
		props.out
			? css`
					${fadeOut} 0.5s
			  `
			: css`
					${fadeIn} 0.5s
			  `};
`

const LogInWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 200px;
	cursor: pointer;
`
const SocialBtn = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25px;
	height: 25px;
	border: none;
	background: none;
	cursor: pointer;

	svg {
		transition: all 0.1s ease-in-out;
	}

	&:hover svg {
		transform: scale(1.2);
	}
`

const Switch = styled.label`
	position: relative;
	display: flex;
	justify-content: space-between;
`
const Button = styled.button`
	font-size: 1.6rem;
	font-family: 'League Spartan', sans-serif;
	font-weight: 500;
	user-select: none;
	border: none;
	background: none;
	cursor: pointer;
	color: ${(props) =>
		props.className === props.state ? Theme.colorText1 : Theme.colorText3};
`

const Registration = (props) => {
	const [state, setState] = useState('LogIn')

	const handleStateChange = (newState) => {
		if (newState !== state) {
			setState(newState)
		}
	}

	const handleRegistration = (e) => {
		const target = e.target.closest('button').id
		console.log(`${state} with ${target}`)
		props.logIn()
	}

	return (
		<>
			<RegistrationContainer out={props.out}>
				<Logo fill="#AEAEAE" width="200" height="50" />
				<LogInWrapper>
					<Switch>
						<Button
							className="LogIn"
							state={state}
							onClick={() => {
								handleStateChange('LogIn')
							}}
						>
							Log In
						</Button>
						<span className="separator">&nbsp;/&nbsp;</span>
						<Button
							className="SignIn"
							state={state}
							onClick={() => {
								handleStateChange('SignIn')
							}}
						>
							Sign In
						</Button>
					</Switch>
					<SocialBtn id="google" onClick={handleRegistration}>
						<IconGoogle fill={Theme.colorGoogle} width="20" height="20" />
					</SocialBtn>
					<SocialBtn id="facebook" onClick={handleRegistration}>
						<IconFacebook fill={Theme.colorFacebook} width="20" height="20" />
					</SocialBtn>
					<SocialBtn id="twitter" onClick={handleRegistration}>
						<IconTwitter fill={Theme.colorTwitter} width="20" height="20" />
					</SocialBtn>
				</LogInWrapper>
			</RegistrationContainer>
		</>
	)
}

export default Registration
