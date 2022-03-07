import React, { useState } from 'react'
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
			(condition == 'bigger' && next > number) ||
			(condition == 'smaller' && next < number)
		) {
			setNumber(next)
			setMoves(moves + 1)
		} else setFail(true)
	}

	return (
		<div class='highlowContainer'>
			<header class='highlowHeader'>
				Adivinhe 5 vezes entre maior ou menor para aumentar seu salário. Os
				números variam de 1 a 11.
			</header>
			<span class={fail ? 'highlownumberfail' : 'highlowNumber'}>{number}</span>
			{!fail ? (
				<div class='highlowbuttoncontainer'>
					<Button onClick={() => nextMove('bigger')}>Maior</Button>
					<Button onClick={() => nextMove('smaller')}>Menor</Button>
				</div>
			) : (
				<Button
					onClick={() => {
						setNumber(Math.floor(Math.random() * 11 + 1))
						setFail(false)
					}}
				>
					Continuar
				</Button>
			)}
			{/* <Button style={{ height: '5vh' }} onClick={props.moveAhead}>
				SKIP
			</Button> */}
		</div>
	)
}
