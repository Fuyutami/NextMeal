import React, { useState } from 'react'
import styled from 'styled-components'

import Theme from '../../other/theme'
import { fadeIn } from '../../other/animations'
import { IconClose, IconOven, IconSearch } from '../../other/vectors'

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
	const products = [
		'Chicken',
		'Beef',
		'Fish',
		'Rice',
		'Beans',
		'Cheese',
		'Eggs',
		'Bread',
		'Spinach',
		'Tomatoes',
		'Onions',
		'Garlic',
		'Mushrooms',
		'Peppers',
		'Cucumbers',
		'Apples',
		'Bananas',
		'Strawberries',
		'Blueberries',
		'Raspberries',
		'Almonds',
		'Walnuts',
		'Oats',
		'Milk',
		'Butter',
		'Olive Oil',
		'Sugar',
		'Flour',
		'Salt',
		'Pepper',
		'Basil',
		'Oregano',
		'Thyme',
		'Rosemary',
		'Mint',
		'Ginger',
		'Cinnamon',
		'Nutmeg',
		'Vanilla',
		'Honey',
	]
	const mostPopular = [
		'Chicken Curry',
		'Beef Stew',
		'Grilled Fish',
		'Vegetable Stir Fry',
	]

	const [searchValue, setSearchValue] = useState('')
	const [mealIngredients, setMealIngredients] = useState([])

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value)
	}

	const handleDragStart = (event, product) => {
		event.dataTransfer.setData('product', product)

		const dragImage = document.createElement('img')
		dragImage.src =
			'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

		const customDragImage = document.createElement('div')
		customDragImage.className = 'custom-drag-image'
		customDragImage.innerText = product
		customDragImage.style.position = 'fixed'
		customDragImage.style.pointerEvents = 'none'
		customDragImage.style.top = `${event.clientY}px`
		customDragImage.style.left = `${event.clientX}px`
		customDragImage.style.borderRadius = '20px'
		customDragImage.style.height = '30px'
		customDragImage.style.backgroundColor = Theme.colorText2
		customDragImage.style.padding = '1rem'
		customDragImage.style.color = Theme.colorReflection

		document.body.appendChild(customDragImage)

		const moveCustomDragImage = (moveEvent) => {
			customDragImage.style.top = `${
				moveEvent.clientY - customDragImage.offsetHeight / 2
			}px`
			customDragImage.style.left = `${
				moveEvent.clientX - customDragImage.offsetWidth / 2
			}px`
		}

		const removeCustomDragImage = () => {
			document.body.removeChild(customDragImage)
			document.removeEventListener('dragover', moveCustomDragImage)
			document.removeEventListener('dragend', removeCustomDragImage)
		}

		document.addEventListener('dragover', moveCustomDragImage)
		document.addEventListener('dragend', removeCustomDragImage)
	}

	const handleDrop = (event) => {
		const product = event.dataTransfer.getData('product')

		if (!mealIngredients.includes(product)) {
			setMealIngredients([...mealIngredients, product])
		}
	}

	const searchResults = searchValue
		? products.filter((product) =>
				product.toLowerCase().startsWith(searchValue.toLowerCase())
		  )
		: mostPopular

	return (
		<Container>
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
					onDrop={handleDrop}
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
