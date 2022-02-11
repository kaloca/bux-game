import React from 'react'
import { Button } from 'shards-react'
import './questions.css'

export default function Question(props) {
	return (
		<div class='questionsContainer'>
			<header class='header'>{props.question}</header>
			<div class='questionContainer'>
				<div class='buttonContainer'>
					<Button style={{ height: '5vh' }} onClick={props.option1.consequence}>
						{props.option1.text}
					</Button>
					<Button style={{ height: '5vh' }} onClick={props.option2.consequence}>
						{props.option2.text}
					</Button>
					{props.option3 ? (
						<Button
							style={{ height: '5vh' }}
							onClick={props.option3.consequence}
						>
							{props.option3.text}
						</Button>
					) : null}
					{props.fourthQuestion ? (
						<Button
							style={{ height: '5vh' }}
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
