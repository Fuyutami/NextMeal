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
	cursor: pointer;

	input {
		opacity: 0;
		width: 0;
		height: 0;
	}
	.LogIn,
	.SignIn,
	.separator {
		font-size: 1.6rem;
		user-select: none;
	}

	input:checked ~ .SignIn {
		color: ${Theme.colorText1};
	}
	input:checked ~ .LogIn {
		color: ${Theme.colorText2};
	}
	input:not(:checked) ~ .SignIn {
		color: ${Theme.colorText2};
	}
	input:not(:checked) ~ .LogIn {
		color: ${Theme.colorText1};
	}
`

const Registration = (props) => {
	const [state, setState] = useState('Log In')

	const handleStateChange = () => {
		if (state === 'Log In') {
			setState('Sign In')
		} else {
			setState('Log In')
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
						<input type="checkbox" onChange={handleStateChange} />
						<span className="LogIn">Log In</span>
						<span className="separator">&nbsp;/&nbsp;</span>
						<span className="SignIn">Sign In</span>
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
