import React, { useState, useEffect } from 'react'
import { Button } from 'shards-react'
import './highlow.css'

export default function HighLow(props) {
	const [number, setNumber] = useState(Math.floor(Math.random() * 11 + 1))
	const [moves, setMoves] = useState(0)
	const [fail, setFail] = useState(false)

	const findNextNumber = () => {
		const nextNumber = Math.floor(Math.random() * 11 + 1)
		if (nextNumber !== number) return nextNumber
		else findNextNumber()
	}

	const nextMove = (condition) => {
		const next = findNextNumber()
		if (
			(condition === 'bigger' && next > number) ||
			(condition === 'smaller' && next < number)
		) {
			setNumber(next)
			setMoves(moves + 1)
		} else {
			setNumber(next)
			setFail(true)
		}
	}

	useEffect(() => {
		if (moves === 5) props.winNegotiation()
	}, [moves, props])

	return (
		<div class='highlowContainer'>
			<header class='highlowHeader'>
				Adivinhe 5 vezes se o próximo número vai ser maior ou menor do que esse
				para aumentar seu salário. Os números variam de 1 a 11.
			</header>
			<span class={fail ? 'highlownumberfail' : 'highlowNumber'}>{number}</span>
			{!fail ? (
				<div class='highlowbuttoncontainer'>
					<Button onClick={() => nextMove('bigger')}>Maior</Button>
					<Button onClick={() => nextMove('smaller')}>Menor</Button>
				</div>
			) : (
				<div class='highlowbuttoncontainer2'>
					<Button
						onClick={() => {
							setNumber(Math.floor(Math.random() * 11 + 1))
							setMoves(0)
							setFail(false)
							props.playHighLowAgain()
						}}
						style={{
							width: 'fit-content',
							marginBottom: '2vh',
							maxWidth: '120px',
						}}
					>
						Tentar novamente
					</Button>
					<Button onClick={props.moveAhead} style={{ width: 'fit-content' }}>
						Desistir
					</Button>
				</div>
			)}
			{/* <Button style={{ height: '5vh' }} onClick={props.moveAhead}>
				SKIP
			</Button> */}
		</div>
	)
}
