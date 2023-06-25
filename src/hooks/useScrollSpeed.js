import { useRef, useEffect, useState } from 'react'

export default function useScrollSpeed() {
	const [state, setState] = useState({
		level: 1,
		direction: 0,
		value: 0,
		timestamp: 0,
	})
	const scrollCountRef = useRef(0)
	const scrollDirectionRef = useRef(0)
	const timerRef = useRef(null)

	useEffect(() => {
		const handleScroll = (e) => {
			scrollCountRef.current++
			scrollDirectionRef.current = Math.sign(-e.deltaY)
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current)
			}
			timerRef.current = setTimeout(() => {
				let value = 1 // Default value
				if (scrollCountRef.current > 5) value = 100
				else if (scrollCountRef.current > 2) value = 10
				const direction = scrollDirectionRef.current
				const timestamp = new Date().getTime()
				const level = Math.log10(value)

				// Always update the state with a new timestamp
				setState({ level, direction, value, timestamp })

				scrollCountRef.current = 0
			}, 300)
		}

		window.addEventListener('wheel', handleScroll)

		return () => {
			window.removeEventListener('wheel', handleScroll)
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current)
			}
		}
	}, [])

	return state
}
