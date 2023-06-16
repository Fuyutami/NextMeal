import React from 'react'
import styled from 'styled-components'

import Theme from '../../other/theme'

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 1rem;
`
const IndicatorContainer = styled.div`
	display: flex;
	:not(:last-child) {
		margin-right: 1rem;
	}
`

const IndicatorLabel = styled.p`
	font-family: 'League Spartan', sans-serif;
	color: ${Theme.colorText1};
	font-size: 1.2rem;
`
const Indicator = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: ${Theme.colorAccent};
	margin-right: 6px;
`

const Indicators = () => {
	return (
		<Container>
			<IndicatorContainer>
				<Indicator id="sugar" />
				<IndicatorLabel>Sugar</IndicatorLabel>
			</IndicatorContainer>
			<IndicatorContainer>
				<Indicator id="salt" />
				<IndicatorLabel>Salt</IndicatorLabel>
			</IndicatorContainer>
		</Container>
	)
}

export default Indicators
