import React, { useState, useEffect } from 'react'
import ScriptTag from 'react-script-tag'
import { Button, Progress } from 'shards-react'
import './clickgame.css'

export default function ClickGame(props) {
	const [title, setTitle] = useState(true)
	const [clicks, setClicks] = useState(0)
	const [progress, setProgress] = useState(100)

	const decreaseBar = () => {
		setProgress(progress - 5)
	}

	const intervalID = window.setInterval(decreaseBar, 500)

	return (
		<>
			{title ? (
				<div class='clickgameContainer'>
					<header class='clickgameHeader'>
						Chegou a hora de se inscrever para eletivas, clique o mais rápido
						possível para não perder nenhuma vaga!
					</header>
					<Button style={{ height: '5vh' }} onClick={() => setTitle(false)}>
						Começar
					</Button>
				</div>
			) : (
				<ScriptTag type='text/javascript' src='clickGameP5.js' />
			)}
		</>
	)
}
