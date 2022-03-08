import React, { useEffect, useState } from 'react'
import { Button } from 'shards-react'
import './questions.css'

export default function Question(props) {
	const [width, setWidth] = useState(window.innerWidth)
	const handleResize = () => {
		setWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const buttonStyle = {
		height: 'max-content',
		marginBottom: '1vh',
		fontSize: width < 500 ? '3.8vw' : null,
	}

	return (
		<div class='questionsContainer'>
			<header class='questionheader'>{props.question}</header>
			<div class='questionContainer'>
				<div class='buttonContainer'>
					<Button pill style={buttonStyle} onClick={props.option1.consequence}>
						{props.option1.text}
					</Button>
					<Button pill style={buttonStyle} onClick={props.option2.consequence}>
						{props.option2.text}
					</Button>
					{props.option3 ? (
						<Button
							pill
							style={{ ...buttonStyle, marginBottom: 0 }}
							onClick={props.option3.consequence}
						>
							{props.option3.text}
						</Button>
					) : null}
					{props.fourthQuestion ? (
						<Button
							pill
							style={{ ...buttonStyle, marginBottom: '0px', marginTop: '1vh' }}
							onClick={props.option4.consequence}
						>
							{props.option4.text}
						</Button>
					) : null}
				</div>
			</div>
		</div>
	)
}
