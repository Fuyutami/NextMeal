import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import './App.css'
import Registration from './components/registration/Registration'
import Main from './components/main/Main'

function App() {
	const [showRegPage, setShowRegPage] = useState(true)
	const [showMainPage, setShowMainPage] = useState(false)

	const logIn = () => {
		setShowRegPage(false)
	}

	return (
		<>
			<CSSTransition
				in={showRegPage}
				timeout={400}
				unmountOnExit
				onExited={() => setShowMainPage(true)}
			>
				<Registration out={!showRegPage} logIn={logIn} />
			</CSSTransition>

			<CSSTransition in={showMainPage} timeout={500} unmountOnExit>
				<Main />
			</CSSTransition>
		</>
	)
}

export default App
