import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Theme from '../../other/theme'
import { fadeIn } from '../../other/animations'
import { IconClose, IconOven, IconSearch } from '../../other/vectors'
import Draggable from './Draggable'

const Container = styled.div`
	max-width: 500px;
	max-height: 500px;
	width: 500px;
	height: 500px;
	border-radius: 15px;
	padding: 22px;
	background: ${Theme.colorBackground};
	box-shadow: 5px 5px 10px #e3e3e3, -5px -5px 10px #ffffff;
	animation: ${fadeIn} 3s ease-in-out forwards;
	padding: 2rem;
	overflow: hidden;
	z-index: 100;
`

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`
const SearchBarWrapper = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
`
const SearchBar = styled.input`
	width: 300px;
	height: 30px;
	border: none;
	outline: none;
	background: none;
	font-family: 'Lato', sans-serif;
	font-weight: 400;
	font-size: 1.6rem;
	color: ${Theme.colorText1};
	margin-left: 2rem;
	flex: 1;
	&::placeholder {
		color: ${Theme.colorText2};
		font-weight: 200;
	}
`

const Button = styled.button`
	border: none;
	outline: none;
	background: none;
	cursor: pointer;
	top: 1.5rem;
	right: 1.5rem;
`
const ResultsWrapper = styled.div`
	width: 100%;
	height: 120px;
	box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
	display: flex;
	padding: 2rem;
	flex-wrap: wrap;
`
const ComposerWrapper = styled.div`
	width: 100%;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Placeholder = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	pointer-events: none;
`
const PlaceholderText = styled.p`
	font-family: 'Lato', sans-serif;
	font-size: 1.3rem;
	color: ${Theme.colorText2};
	margin-top: 0.5rem;
	user-select: none;
	pointer-events: none;
`
const Result = styled.div`
	height: 30px;
	border-radius: 20px;
	background-color: ${Theme.colorText2};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	cursor: pointer;

	&:not(:last-child) {
		margin-right: 1rem;
	}
`
const ResultText = styled.p`
	font-family: 'Lato', sans-serif;
	font-size: 1.4rem;
	color: ${Theme.colorReflection};
`

const Composer = (props) => {
	const products = ['Chicken', 'Beef', 'Fish', 'Rice', 'Beans']
	const mostPopular = [
		'Chicken Curry',
		'Beef Stew',
		'Grilled Fish',
		'Vegetable Stir Fry',
	]

	const [searchValue, setSearchValue] = useState('')
	const [mealIngredients, setMealIngredients] = useState([])

	const [draggingItem, setDraggingItem] = useState(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	const composerWrapperRef = useRef()

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value)
	}

	const handleMouseMove = (event) => {
		setMousePosition({ x: event.clientX, y: event.clientY })
	}

	const handleDragStart = (event, product) => {
		event.preventDefault()
		console.log('drag')
		setMousePosition({ x: event.clientX, y: event.clientY })
		setDraggingItem(product)
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleDragEnd)
	}

	const handleDragEnd = (event) => {
		setDraggingItem(null)
		window.removeEventListener('mousemove', handleMouseMove)
		window.removeEventListener('mouseup', handleDragEnd)

		if (
			composerWrapperRef.current &&
			composerWrapperRef.current.contains(event.target)
		) {
			if (!mealIngredients.includes(draggingItem)) {
				setMealIngredients([...mealIngredients, draggingItem])
			}
		}
	}

	const searchResults = searchValue
		? products.filter((product) =>
				product.toLowerCase().startsWith(searchValue.toLowerCase())
		  )
		: mostPopular

	return (
		<Container>
			{draggingItem && (
				<Draggable
					x={mousePosition.x}
					y={mousePosition.y}
					name={draggingItem}
					onMouseUp={handleDragEnd}
				/>
			)}
			<Wrapper>
				<Header>
					<SearchBarWrapper>
						<IconSearch fill={Theme.colorText1} width="25" height="25" />
						<SearchBar
							placeholder="Search..."
							value={searchValue}
							onChange={handleSearchChange}
						/>
					</SearchBarWrapper>
					<Button onClick={props.closeComposer}>
						<IconClose fill={Theme.colorText1} width="22" height="22" />
					</Button>
				</Header>
				<ResultsWrapper>
					{searchResults.map((product) => (
						<Result
							key={product}
							draggable
							onDragStart={(event) => handleDragStart(event, product)}
						>
							<ResultText>{product}</ResultText>
						</Result>
					))}
				</ResultsWrapper>
				<ComposerWrapper
					ref={composerWrapperRef}
					onDragOver={(event) => event.preventDefault()}
				>
					{mealIngredients.length > 0 ? (
						<PlaceholderText>
							This feature is not yet available &#58;&#40;
						</PlaceholderText>
					) : (
						<Placeholder>
							<IconOven fill={Theme.colorText3} width="23" height="23" />
							<PlaceholderText>Drop food here</PlaceholderText>
							<PlaceholderText>
								Double click to make something new
							</PlaceholderText>
						</Placeholder>
					)}
				</ComposerWrapper>
			</Wrapper>
		</Container>
	)
}

export default Composer
